"""Serves the exported site for local verification.

Static export means `out/` IS the product, so this is the only faithful way to
check the reader outside production. Mirrors the host's trailing-slash routing:
/a/b/ resolves to out/a/b/index.html.
"""
import http.server, os, socketserver

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "out"))

class H(http.server.SimpleHTTPRequestHandler):
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
    def log_message(self, *a):
        pass

import os
PORT = int(os.environ.get("PORT", "4173"))
with socketserver.TCPServer(("", PORT), H) as httpd:
    print(f"serving out/ on {PORT}", flush=True)
    httpd.serve_forever()
