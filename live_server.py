#!/usr/bin/env python3
"""
Live Preview Server for Mobile Testing
Run this script to serve your website on your local network
Access from phone: http://10.1.32.40:8080
"""

import http.server
import socketserver
import socket
import webbrowser
import os
import sys
from pathlib import Path

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def end_headers(self):
        # Add headers to prevent caching during development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def get_local_ip():
    """Get the local IP address"""
    try:
        # Connect to a remote server to get local IP
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            local_ip = s.getsockname()[0]
        return local_ip
    except Exception:
        return "127.0.0.1"

def main():
    PORT = 8080
    
    # Change to the script directory
    os.chdir(Path(__file__).parent)
    
    # Get local IP
    local_ip = get_local_ip()
    
    print("🚀 Starting Live Preview Server...")
    print("=" * 50)
    print(f"📱 Mobile URL: http://{local_ip}:{PORT}")
    print(f"💻 Local URL:  http://localhost:{PORT}")
    print("=" * 50)
    print("📋 Instructions:")
    print("1. Make sure your phone and computer are on the same WiFi network")
    print("2. Open your phone's browser")
    print(f"3. Go to: http://{local_ip}:{PORT}")
    print("4. Bookmark this URL for quick access!")
    print("=" * 50)
    print("🔄 Auto-refresh: Just reload the page to see changes")
    print("🛑 Stop server: Press Ctrl+C")
    print("=" * 50)
    
    try:
        with socketserver.TCPServer(("0.0.0.0", PORT), CustomHTTPRequestHandler) as httpd:
            print(f"✅ Server running at http://{local_ip}:{PORT}")
            print("🎯 Ready for mobile testing!")
            
            # Auto-open in default browser
            webbrowser.open(f"http://localhost:{PORT}")
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Error: {e}")
        print("💡 Try using a different port or check your firewall settings")

if __name__ == "__main__":
    main()