"""Serve the static export for local browser checks without per-asset log noise."""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class ExportHandler(SimpleHTTPRequestHandler):
    def log_request(self, code="-", size="-"):
        if isinstance(code, int) and code >= 400:
            super().log_request(code, size)


class ExportServer(ThreadingHTTPServer):
    # Parallel Chromium contexts open more connections than the stdlib default
    # backlog of five. Queue them instead of intermittently stalling JS/CSS.
    request_queue_size = 128


if __name__ == "__main__":
    directory = Path(__file__).resolve().parent.parent / "out"
    handler = partial(ExportHandler, directory=str(directory))
    with ExportServer(("127.0.0.1", 4173), handler) as server:
        print(f"Static preview: http://127.0.0.1:4173 ({directory})", flush=True)
        server.serve_forever()
