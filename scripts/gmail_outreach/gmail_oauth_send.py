#!/usr/bin/env python3
"""
Send AutoPilot Outreach Emails via Gmail OAuth
"""

import os
import json
import base64
from email.mime.text import MIMEText
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google.api_core.gapic_v1 import client_info as grpc_client_info
import google.auth.exceptions

try:
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build
except ImportError:
    print("ERROR: Required Google libraries not installed.")
    print("Install with: pip install google-auth-oauthlib google-auth-httplib2 google-api-python-client")
    exit(1)

SCOPES = ['https://www.googleapis.com/auth/gmail.send']
TOKEN_FILE = '/home/ubuntu/token.json'
CREDENTIALS_FILE = '/home/ubuntu/credentials.json'

# Email data
EMAILS = [
    {
        "to": "info@beautystudiobyraina.com",
        "subject": "Beauty Studio By Raina - Zvogëloni mungesën në terma me 40% + kurseni 5 orë/javë",
        "body": """Përshëndetje Raina,

Pashë Beauty Studio By Raina në rrjetet sociale dhe vura re se po menaxhoni termatet dhe komunikimin me klientët në mënyrë manuale.

Ndërtova **AutoPilot** posaçërisht për biznese si i juaji:

**Sfidat Tuaja Aktuale:**
- Klientët pyesin "Cili është orari i disponueshëm?" përmes DM-ve
- Mungesat në terma po ju kushtojnë €100-500/javë
- Kujtesesa manuale për termatet nuk funksionon
- Komunikimi i shpërndarë nëpër më shumë kanale

**Si Funksionon AutoPilot:**
1. **Faqja e Rezervimit me Markën Tuaj** - Klientët shohin disponueshmërinë, rezervojnë drejtpërdrejt
2. **Kujtesesa Inteligjente** - WhatsApp/Email 24 orë përpara (zvogëlon mungesën me 40%)
3. **IA Përgjigjet Pyetjeve** - "Ofrojnë Makeup, Manikyr, Microblading, Stilim Nuse?" përgjigjet automatikisht
4. **Baza e Njohurive** - Ruani shërbimet, çmimet, politikat tuaja një herë

**Rezultatet e Përdoruesve të Betës:**
- Zvogëlim i mungesave: 40%
- Koha e kursyer: 5-8 orë/javë
- Rritje e termave: 15-20%

**Oferta Speciale për Bizneset në Fier:**
Kërkojmë 10 biznese lokale për programin beta:
- ✅ **Provim falas 90 ditë** (normalisht 30 ditë)
- ✅ **Mbështetje direkte** nga ekipi ynë
- ✅ **Zbritje përjetesore 40%** në planet e paguara
- ✅ **Formësoni produktin** me feedback-un tuaj

A do të ishte i hapur për një bisedë të shpejtë 15-minutëshe?

https://autopilot-qwsnrudn.manus.space/

Me përshëndetje,

Dario Lloshi
Founder, CEO & CTO of Gaming Repository
AutoPilot - Automatizim Biznesi me IA

P.S. - Jemi me bazë në Shqipëri dhe kuptojmë tregun lokal. Ky është ndërtuar posaçërisht për bizneset shqiptare si i juaji."""
    },
    {
        "to": "rigels.koco@gmail.com",
        "subject": "Palestra Beauty & The Beast - Zvogëloni mungesën në terma me 40% + kurseni 5 orë/javë",
        "body": """Përshëndetje Rigels Koco,

Pashë Palestra Beauty & The Beast në rrjetet sociale dhe vura re se po menaxhoni termatet dhe komunikimin me klientët në mënyrë manuale.

Ndërtova **AutoPilot** posaçërisht për biznese si i juaji:

**Sfidat Tuaja Aktuale:**
- Klientët pyesin "Cili është orari i disponueshëm?" përmes DM-ve
- Mungesat në terma po ju kushtojnë €100-500/javë
- Kujtesesa manuale për termatet nuk funksionon
- Komunikimi i shpërndarë nëpër më shumë kanale

**Si Funksionon AutoPilot:**
1. **Faqja e Rezervimit me Markën Tuaj** - Klientët shohin disponueshmërinë, rezervojnë drejtpërdrejt
2. **Kujtesesa Inteligjente** - WhatsApp/Email 24 orë përpara (zvogëlon mungesën me 40%)
3. **IA Përgjigjet Pyetjeve** - "Ofrojnë Stërvitje, Personal Training?" përgjigjet automatikisht
4. **Baza e Njohurive** - Ruani shërbimet, çmimet, politikat tuaja një herë

**Rezultatet e Përdoruesve të Betës:**
- Zvogëlim i mungesave: 40%
- Koha e kursyer: 5-8 orë/javë
- Rritje e termave: 15-20%

**Oferta Speciale për Bizneset në Fier:**
Kërkojmë 10 biznese lokale për programin beta:
- ✅ **Provim falas 90 ditë** (normalisht 30 ditë)
- ✅ **Mbështetje direkte** nga ekipi ynë
- ✅ **Zbritje përjetesore 40%** në planet e paguara
- ✅ **Formësoni produktin** me feedback-un tuaj

A do të ishte i hapur për një bisedë të shpejtë 15-minutëshe?

https://autopilot-qwsnrudn.manus.space/

Me përshëndetje,

Dario Lloshi
Founder, CEO & CTO of Gaming Repository
AutoPilot - Automatizim Biznesi me IA

P.S. - Jemi me bazë në Shqipëri dhe kuptojmë tregun lokal. Ky është ndërtuar posaçërisht për bizneset shqiptare si i juaji."""
    }
]

def get_gmail_service():
    """Authenticate and return Gmail service"""
    creds = None
    
    # Load existing token if available
    if os.path.exists(TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)
    
    # If no valid credentials, get new ones
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists(CREDENTIALS_FILE):
                print("ERROR: credentials.json not found!")
                print("Follow the setup instructions in gmail_oauth_setup.py")
                exit(1)
            
            flow = InstalledAppFlow.from_client_secrets_file(
                CREDENTIALS_FILE, SCOPES)
            creds = flow.run_local_server(port=0)
        
        # Save token for future use
        with open(TOKEN_FILE, 'w') as token:
            token.write(creds.to_json())
    
    return build('gmail', 'v1', credentials=creds)

def send_email(service, to, subject, body):
    """Send an email via Gmail"""
    try:
        message = MIMEText(body)
        message['to'] = to
        message['subject'] = subject
        
        raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
        send_message = {'raw': raw_message}
        
        result = service.users().messages().send(userId='me', body=send_message).execute()
        return result
    except Exception as e:
        print(f"ERROR sending email to {to}: {str(e)}")
        return None

def main():
    print("=" * 80)
    print("AUTOPILOT OUTREACH - SENDING EMAILS")
    print("=" * 80)
    print()
    
    # Get Gmail service
    print("🔐 Authenticating with Gmail...")
    try:
        service = get_gmail_service()
        print("✅ Gmail authentication successful!")
    except Exception as e:
        print(f"❌ Authentication failed: {str(e)}")
        exit(1)
    
    print()
    print("📧 Sending emails...")
    print("-" * 80)
    
    sent_count = 0
    for email in EMAILS:
        print(f"\n📤 Sending to: {email['to']}")
        print(f"   Subject: {email['subject'][:60]}...")
        
        result = send_email(service, email['to'], email['subject'], email['body'])
        
        if result:
            print(f"   ✅ Sent successfully! (Message ID: {result['id']})")
            sent_count += 1
        else:
            print(f"   ❌ Failed to send")
    
    print()
    print("-" * 80)
    print(f"\n📊 Summary: {sent_count}/{len(EMAILS)} emails sent successfully!")
    print()
    print("=" * 80)

if __name__ == '__main__':
    main()
