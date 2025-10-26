#!/usr/bin/env python3
"""
QR Code Generator for Mobile Live Preview
Generates a QR code that you can scan with your phone
"""

import qrcode
import socket
from io import BytesIO
import base64

def get_local_ip():
    """Get the local IP address"""
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            local_ip = s.getsockname()[0]
        return local_ip
    except Exception:
        return "127.0.0.1"

def generate_qr_code():
    PORT = 8080
    local_ip = get_local_ip()
    url = f"http://{local_ip}:{PORT}"
    
    # Generate QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)
    
    # Create QR code image
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Save QR code
    img.save("mobile_qr_code.png")
    
    print("📱 QR CODE GENERATED!")
    print("=" * 40)
    print(f"🌐 URL: {url}")
    print("📄 QR Code saved as: mobile_qr_code.png")
    print("=" * 40)
    print("📱 INSTRUCTIONS:")
    print("1. Open your phone's camera app")
    print("2. Point it at the QR code image")
    print("3. Tap the notification to open the website")
    print("4. Bookmark for future use!")
    print("=" * 40)
    
    return url

if __name__ == "__main__":
    try:
        generate_qr_code()
    except ImportError:
        print("❌ QR code library not installed")
        print("💡 Install with: pip install qrcode[pil]")
        print(f"🌐 Or manually go to: http://{get_local_ip()}:8080")