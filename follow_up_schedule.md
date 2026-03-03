# Follow-up Schedule & Execution Plan

To maximize conversion, we will follow a **3-touch minimum** protocol for all 10 prospects.

## Schedule Overview

| Touchpoint | Timing | Channel | Goal |
| :--- | :--- | :--- | :--- |
| **Touch 1: Initial Outreach** | Day 1 | Email & WhatsApp | Introduce the platform and the 90-day free offer. |
| **Touch 2: Follow-up** | Day 3 | WhatsApp | Answer any initial questions and offer a quick demo. |
| **Touch 3: Final Call** | Day 7 | Phone Call | Direct invitation to join the "Early Adopter" program before slots fill up. |

---

## Execution Instructions

### 1. Gmail OAuth Setup (gaming.repository.2019@gmail.com)
- **Step 1**: Go to [Google Cloud Console](https://console.cloud.google.com/).
- **Step 2**: Create a new project named "AutoPilot Outreach".
- **Step 3**: Enable "Gmail API".
- **Step 4**: Configure OAuth Consent Screen (Internal or External).
- **Step 5**: Create Credentials -> OAuth Client ID (Web Application).
- **Step 6**: Add Authorized Redirect URIs (if using a script) or use "Desktop App" for manual token generation.
- **Step 7**: Download `credentials.json` and place it in the root directory.
- **Step 8**: Run the authentication script (to be provided) to generate `token.json`.

### 2. WhatsApp Sending Guide (+355682384239)
- **Tool**: Twilio or Meta WhatsApp Business API.
- **Protocol**: 
  - Send the personalized WhatsApp message within 2 hours of the initial email.
  - Mention the email sent to create a cohesive brand experience.
  - Use a friendly, local tone (Albanian).

### 3. Follow-up Protocol for Non-Responders
- If no response after **Touch 1**: Send a brief WhatsApp message on Day 3 asking if they had a chance to see the email.
- If no response after **Touch 2**: Call the business on Day 7 during their off-peak hours (e.g., 10 AM or 3 PM).
- **Early Adopter Scarcity**: Remind them that there are only **10 slots available** and they are currently being filled.

### 4. Conversion Tracking
- **Success Metric**: A prospect is considered "Converted" when they sign up at https://autopilot-qwsnrudn.manus.space/ and complete their profile.
- **Tracking**: Update `prospect_tracking.csv` with "Signed Up" status and the date.
- **Onboarding**: Once signed up, send the "Welcome Email" and "Quick-Start Guide" immediately.
