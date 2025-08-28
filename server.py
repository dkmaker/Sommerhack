#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

PORT = 80
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def main():
    try:
        with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
            print(f"✅ TODO MVP App server running on port {PORT}")
            print(f"📂 Serving directory: {DIRECTORY}")
            print(f"🌐 Open http://localhost or http://127.0.0.1 in your browser")
            print(f"🛑 Press Ctrl+C to stop the server")
            print("")
            httpd.serve_forever()
    except PermissionError:
        print(f"❌ Error: Permission denied to bind to port {PORT}")
        print("💡 Try running with sudo: sudo python3 server.py")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\n👋 Server stopped")
        sys.exit(0)
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()