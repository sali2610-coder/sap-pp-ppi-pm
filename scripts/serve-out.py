"""Serves the exported site for local verification.

Static export means `out/` IS the product, so this is the only faithful way to
check the reader outside production. Mirrors the host's trailing-slash routing:
/a/b/ resolves to out/a/b/index.html.
"""
import gzip, http.server, json, mimetypes, os, re, socketserver

HERE = os.path.dirname(os.path.abspath(__file__))

# The host's redirects (vercel.json), so a local check sees what a reader gets:
# every pre-NEO address redirects into /neo/ (scripts/gen-legacy-redirects.mjs).
# The subset those rules use: literal segments, :name, :name(regex). Rules with
# "has" (the www host rule) do not apply to localhost.
def _compile(source):
    names = []
    def part(m):
        if m.group(1):
            names.append(m.group(1))
            return "(" + (m.group(3) or "[^/]+") + ")"
        return re.escape(m.group(0))
    rx = re.sub(r":([A-Za-z]+)(\(((?:[^()\\]|\\.)+)\))?|[^:]+", part, source)
    return re.compile("^" + rx + "$"), names

REDIRECTS = []
try:
    with open(os.path.join(HERE, "..", "vercel.json"), encoding="utf-8") as f:
        for r in json.load(f).get("redirects", []):
            if "has" in r:
                continue
            rx, names = _compile(r["source"])
            REDIRECTS.append((rx, names, r["destination"], 308 if r.get("permanent") else 307))
except (OSError, ValueError):
    pass

def redirect_for(raw_path):
    for rx, names, dest, code in REDIRECTS:
        m = rx.match(raw_path)
        if m:
            for i, n in enumerate(names):
                dest = re.sub(":" + n + r"\b", lambda _m, v=m.group(i + 1): v, dest)
            return dest, code
    return None

os.chdir(os.path.join(HERE, "..", "out"))

# COMPRESS=1: gzip text responses for clients that accept it, as the host does
# (Vercel sends brotli or gzip). Without it a phone measurement here downloads
# every page uncompressed: /neo/tables/ is 1,033,229 bytes of HTML whose first
# 535,795 (the part before the content is revealed) gzip to 27,031. Brotli is a
# little smaller again, so this is a conservative stand-in, not the host.
COMPRESS = os.environ.get("COMPRESS") == "1"
ZIPPABLE = (".html", ".css", ".js", ".json", ".svg", ".txt", ".xml", ".webmanifest", ".map")
_gz = {}

class H(http.server.SimpleHTTPRequestHandler):
    def _redirect(self):
        raw, _, query = self.path.partition("?")
        # trailing slash first, as the host does for an exported page
        if not raw.endswith("/") and "." not in raw.rsplit("/", 1)[-1]:
            target, code = raw + "/", 308
        else:
            hit = redirect_for(raw)
            if not hit:
                return False
            target, code = hit
        if query and "?" not in target:
            target += "?" + query
        self.send_response(code)
        self.send_header("Location", target)
        self.send_header("Content-Length", "0")
        self.end_headers()
        return True
    def do_GET(self):
        if self._redirect():
            return
        if COMPRESS and "gzip" in self.headers.get("Accept-Encoding", "") and self._gzip():
            return
        super().do_GET()
    def _gzip(self):
        p = self.translate_path(self.path)
        if not os.path.isfile(p) or not p.endswith(ZIPPABLE):
            return False
        key = (p, os.path.getmtime(p))
        body = _gz.get(key)
        if body is None:
            with open(p, "rb") as f:
                body = gzip.compress(f.read(), 6)
            _gz[key] = body
        ctype = mimetypes.guess_type(p)[0] or "application/octet-stream"
        if ctype.startswith("text/") or ctype in ("application/javascript", "application/json"):
            ctype += "; charset=utf-8"
        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Encoding", "gzip")
        self.send_header("Vary", "Accept-Encoding")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)
        return True
    def do_HEAD(self):
        if not self._redirect():
            super().do_HEAD()
    def translate_path(self, path):
        p = super().translate_path(path)
        if not os.path.exists(p):
            # A transaction code with a slash (/IWFND/CACHE_CLEANUP) is exported
            # as a folder literally named %2FIWFND%2FCACHE_CLEANUP, and the host
            # serves it at that encoded URL. http.server decodes %2F to "/"
            # first, so look the undecoded path up as a literal name too.
            raw = path.split("?", 1)[0].split("#", 1)[0]
            lit = os.path.join(os.getcwd(), *[s for s in raw.split("/") if s not in ("", ".", "..")])
            if os.path.exists(lit):
                p = lit
        if os.path.isdir(p):
            idx = os.path.join(p, "index.html")
            if os.path.exists(idx):
                return idx
        return p
    def send_error(self, code, message=None, explain=None):
        # The host answers an unknown address with the exported 404.html and
        # status 404, so its hydration at any URL can be checked here too.
        if code == 404 and os.path.exists("404.html"):
            body = open("404.html", "rb").read()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            if self.command != "HEAD":
                self.wfile.write(body)
            return
        super().send_error(code, message, explain)
    def log_message(self, *a):
        pass

import os
PORT = int(os.environ.get("PORT", "4173"))
# Rebind at once after a restart (a rebuild replaces out/, so the server has to
# restart with it) instead of failing on the old socket's TIME_WAIT.
socketserver.TCPServer.allow_reuse_address = True
# One thread per connection, as the host serves. Single-threaded, one open
# connection that sends no request (a browser's preconnect) held every other
# request until it closed: curl timed out behind one idle socket, and page loads
# in the measurement series hung for the full 120s timeout.
socketserver.ThreadingTCPServer.daemon_threads = True
with socketserver.ThreadingTCPServer(("", PORT), H) as httpd:
    print(f"serving out/ on {PORT}", flush=True)
    httpd.serve_forever()
