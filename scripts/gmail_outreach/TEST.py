import os
import json
import base64
from email.mime.text import MIMEText
from google_auth_oauthlib.flow import InstalledAppFlow
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

SCOPES = ['https://www.googleapis.com/auth/gmail.send']
downloads = os.path.expanduser('~\\Downloads' )
TOKEN_FILE = os.path.join(downloads, 'token.json')
CREDENTIALS_FILE = os.path.join(downloads, 'credentials.json')

print(f"Looking for credentials at: {CREDENTIALS_FILE}")
print(f"File exists: {os.path.exists(CREDENTIALS_FILE)}")

if os.path.exists(CREDENTIALS_FILE):
    print("✅ Found credentials!")
else:
    print("❌ Credentials not found")

