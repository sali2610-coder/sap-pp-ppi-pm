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
        if os.path.isdir(p):
            idx = os.path.join(p, "index.html")
            if os.path.exists(idx):
                return idx
        return p
    def log_message(self, *a):
        pass

with socketserver.TCPServer(("", 4173), H) as httpd:
    print("serving out/ on 4173", flush=True)
    httpd.serve_forever()
