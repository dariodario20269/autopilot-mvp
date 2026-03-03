#!/usr/bin/env python3
"""
Gmail OAuth Setup for AutoPilot Outreach Campaign
This script will generate the OAuth authorization link and handle the token exchange.
"""

import os
import json
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

# Gmail API scopes
SCOPES = ['https://www.googleapis.com/auth/gmail.send']

def get_oauth_link():
    """Generate Gmail OAuth authorization link"""
    
    # You need to create OAuth 2.0 credentials in Google Cloud Console
    # Instructions:
    # 1. Go to: https://console.cloud.google.com/
    # 2. Create a new project (or select existing)
    # 3. Enable Gmail API
    # 4. Create OAuth 2.0 Desktop Application credentials
    # 5. Download JSON and save as credentials.json
    
    print("=" * 80)
    print("GMAIL OAUTH SETUP FOR AUTOPILOT")
    print("=" * 80)
    print()
    print("STEP 1: Create Google Cloud OAuth Credentials")
    print("-" * 80)
    print()
    print("1. Go to: https://console.cloud.google.com/")
    print("2. Create a new project or select existing one")
    print("3. Enable Gmail API:")
    print("   - Search for 'Gmail API' in the search bar")
    print("   - Click 'Enable'")
    print()
    print("4. Create OAuth 2.0 Credentials:")
    print("   - Go to 'Credentials' in the left sidebar")
    print("   - Click 'Create Credentials' > 'OAuth 2.0 Client IDs'")
    print("   - Choose 'Desktop application'")
    print("   - Download the JSON file")
    print()
    print("5. Save the JSON file as: /home/ubuntu/credentials.json")
    print()
    print("=" * 80)
    print("STEP 2: Run Authorization")
    print("-" * 80)
    print()
    print("After saving credentials.json, run this command:")
    print("  python3 /home/ubuntu/gmail_oauth_send.py")
    print()
    print("This will open a browser window to authorize Gmail access.")
    print()
    print("=" * 80)

if __name__ == "__main__":
    get_oauth_link()
