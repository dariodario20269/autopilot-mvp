#!/usr/bin/env python3
"""
Send AutoPilot Outreach Emails via Gmail OAuth (Simplified)
This version generates an authorization URL for manual browser opening
"""

import os
import json
import base64
from email.mime.text import MIMEText
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

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

def get_authorization_url():
    """Generate authorization URL"""
    if not os.path.exists(CREDENTIALS_FILE):
        print("ERROR: credentials.json not found!")
        exit(1)
    
    flow = InstalledAppFlow.from_client_secrets_file(
        CREDENTIALS_FILE, SCOPES)
    
    # Generate authorization URL
    auth_url, _ = flow.authorization_url(prompt='consent')
    return auth_url, flow

def get_gmail_service(flow, auth_code):
    """Exchange auth code for credentials and return Gmail service"""
    try:
        creds = flow.fetch_token(code=auth_code)
        
        # Save token for future use
        with open(TOKEN_FILE, 'w') as token:
            token.write(json.dumps(creds))
        
        return build('gmail', 'v1', credentials=flow.credentials)
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return None

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
    print("AUTOPILOT OUTREACH - GMAIL OAUTH AUTHORIZATION")
    print("=" * 80)
    print()
    
    # Check if token already exists
    if os.path.exists(TOKEN_FILE):
        print("✅ Found existing authorization token!")
        print("Using saved credentials to send emails...\n")
        
        try:
            creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)
            service = build('gmail', 'v1', credentials=creds)
            send_emails_with_service(service)
            return
        except Exception as e:
            print(f"Token expired or invalid: {str(e)}")
            print("Need to re-authorize...\n")
    
    # Generate authorization URL
    print("🔐 Generating authorization URL...")
    auth_url, flow = get_authorization_url()
    
    print()
    print("=" * 80)
    print("STEP 1: Open this link in your browser:")
    print("=" * 80)
    print()
    print(auth_url)
    print()
    print("=" * 80)
    print("STEP 2: After authorizing, copy the authorization code")
    print("=" * 80)
    print()
    
    auth_code = input("Paste the authorization code here: ").strip()
    
    if not auth_code:
        print("ERROR: No authorization code provided")
        exit(1)
    
    print()
    print("🔐 Exchanging code for credentials...")
    service = get_gmail_service(flow, auth_code)
    
    if not service:
        print("ERROR: Failed to get Gmail service")
        exit(1)
    
    print("✅ Authorization successful!")
    print()
    
    send_emails_with_service(service)

def send_emails_with_service(service):
    """Send emails using the provided service"""
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
