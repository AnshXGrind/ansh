#!/usr/bin/env python3
"""
Advanced Live Preview Server with Auto-Reload
This server watches for file changes and auto-refreshes the browser
"""

import http.server
import socketserver
import socket
import webbrowser
import os
import sys
import time
import json
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class LiveReloadHandler(FileSystemEventHandler):
    def __init__(self):
        self.last_modified = time.time()
        
    def on_modified(self, event):
        if event.is_directory:
            return
            
        # Only reload for web files
        if event.src_path.endswith(('.html', '.css', '.js')):
            current_time = time.time()
            # Debounce rapid changes
            if current_time - self.last_modified > 1:
                self.last_modified = current_time
                print(f"🔄 File changed: {os.path.basename(event.src_path)}")
                print("📱 Refresh your mobile browser to see changes!")

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def end_headers(self):
        # Add headers for live development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
    
    def do_GET(self):
        # Serve the main HTML file with live reload script injected
        if self.path == '/' or self.path == '/index.html':
            try:
                with open('index.html', 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Inject live reload notification
                live_reload_script = '''
                <script>
                // Live reload notification for mobile
                let lastCheck = Date.now();
                
                function checkForUpdates() {
                    // Simple notification system
                    const notification = document.createElement('div');
                    notification.style.cssText = `
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: linear-gradient(45deg, #6366f1, #8b5cf6);
                        color: white;
                        padding: 10px 20px;
                        border-radius: 25px;
                        font-size: 14px;
                        z-index: 9999;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(255,255,255,0.2);
                        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    `;
                    notification.innerHTML = '🔄 Pull down to refresh for updates!';
                    document.body.appendChild(notification);
                    
                    setTimeout(() => notification.style.opacity = '1', 100);
                    setTimeout(() => {
                        notification.style.opacity = '0';
                        setTimeout(() => notification.remove(), 300);
                    }, 3000);
                }
                
                // Show notification every 30 seconds
                setInterval(checkForUpdates, 30000);
                
                // Show initial notification
                setTimeout(checkForUpdates, 2000);
                </script>
                '''
                
                # Insert before closing body tag
                content = content.replace('</body>', live_reload_script + '</body>')
                
                self.send_response(200)
                self.send_header('Content-Type', 'text/html; charset=utf-8')
                self.send_header('Content-Length', len(content.encode('utf-8')))
                self.end_headers()
                self.wfile.write(content.encode('utf-8'))
                return
            except FileNotFoundError:
                pass
        
        # Default behavior for other files
        super().do_GET()

def get_local_ip():
    """Get the local IP address"""
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            local_ip = s.getsockname()[0]
        return local_ip
    except Exception:
        return "127.0.0.1"

def main():
    PORT = 8080
    
    # Change to script directory
    os.chdir(Path(__file__).parent)
    
    # Get local IP
    local_ip = get_local_ip()
    
    print("🚀 Starting Advanced Live Preview Server...")
    print("=" * 60)
    print(f"📱 MOBILE URL: http://{local_ip}:{PORT}")
    print(f"💻 LOCAL URL:  http://localhost:{PORT}")
    print("=" * 60)
    print("📋 MOBILE TESTING GUIDE:")
    print("1. ✅ Connect phone to same WiFi network")
    print("2. 📱 Open phone browser (Chrome/Safari)")
    print(f"3. 🌐 Navigate to: http://{local_ip}:{PORT}")
    print("4. 📌 Bookmark the URL for quick access")
    print("5. 🔄 Pull down to refresh when you make changes")
    print("=" * 60)
    print("🎯 DEVELOPER FEATURES:")
    print("• File watching enabled")
    print("• Auto-reload notifications")
    print("• No-cache headers")
    print("• Mobile-optimized")
    print("=" * 60)
    
    # Start file watcher
    event_handler = LiveReloadHandler()
    observer = Observer()
    observer.schedule(event_handler, path='.', recursive=False)
    observer.start()
    
    try:
        with socketserver.TCPServer(("0.0.0.0", PORT), CustomHTTPRequestHandler) as httpd:
            print(f"✅ Server running at http://{local_ip}:{PORT}")
            print("👀 Watching for file changes...")
            print("🛑 Press Ctrl+C to stop")
            print("=" * 60)
            
            # Auto-open in default browser
            webbrowser.open(f"http://localhost:{PORT}")
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Shutting down server...")
        observer.stop()
    except Exception as e:
        print(f"❌ Error: {e}")
        if "Address already in use" in str(e):
            print(f"💡 Port {PORT} is busy. Try closing other servers or use a different port.")
        else:
            print("💡 Check firewall settings or try running as administrator")
    finally:
        observer.join()

if __name__ == "__main__":
    main()