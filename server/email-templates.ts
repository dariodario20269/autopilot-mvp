/**
 * AutoPilot Email Template System
 * 
 * This file contains reusable email templates for outreach, 
 * onboarding, and customer notifications.
 */

export const EMAIL_TEMPLATES = {
  // 1. Outreach Templates (Albanian)
  outreach: {
    beauty_salon: {
      subject: "Përmirësoni menaxhimin e takimeve në {businessName}!",
      body: `Përshëndetje {contactPerson},
      
Kam parë punën tuaj të mrekullueshme në Fier. Menaxhimi i shumë kërkesave në email dhe telefon mund të jetë sfidues.

Unë jam pjesë e ekipit të AutoPilot, një platformë e re e automatizimit me AI, e krijuar posaçërisht për bizneset në Fier.

Ju kemi përzgjedhur si një nga 10 bizneset e para për programin tonë Early Adopter:
- 90 ditë përdorim plotësisht FALAS.
- 40% ulje të përjetshme.

Regjistrohuni këtu: https://autopilot-qwsnrudn.manus.space/

Me respekt,
Ekipi i AutoPilot`
    },
    fitness_center: {
      subject: "Automatizoni anëtarësimet në {businessName}!",
      body: `Përshëndetje {contactPerson},
      
Shohim që {businessName} është një qendër shumë aktive në Fier. Menaxhimi i anëtarësimeve dhe orareve mund të marrë shumë kohë.

AutoPilot është krijuar për të automatizuar pikërisht këtë:
- Rezervime online për seancat e stërvitjes.
- Përgjigje automatike me AI për pyetjet e klientëve.

Ju ftojmë të jeni pjesë e 10 partnerëve tanë të parë me 90 ditë provë falas dhe 40% ulje të përjetshme.

Me respekt,
AutoPilot Team`
    },
    dental_clinic: {
      subject: "Reduktoni mungesat e pacientëve në {businessName}!",
      body: `Përshëndetje {contactPerson},
      
Në klinikat dentare, çdo minutë e humbur nga një pacient që nuk vjen është kosto. AutoPilot ndihmon {businessName} të:
- Konfirmojë takimet automatikisht.
- Dërgojë kujtesa në WhatsApp/Email.

Përfitoni nga oferta jonë: 90 ditë përdorim FALAS dhe 40% ulje të përjetshme.

Me respekt,
AutoPilot`
    }
  },

  // 2. Onboarding Templates (Albanian)
  onboarding: {
    welcome: {
      subject: "Mirë se vini në AutoPilot! Hapat e parë.",
      body: `Përshëndetje {businessName},
      
Jemi shumë të lumtur që keni vendosur të jeni një nga 10 partnerët tanë të parë (Early Adopters) në Fier!

Hapat e parë:
1. Identifikohuni: https://autopilot-qwsnrudn.manus.space/
2. Plotësoni Profilin (Logo dhe Ngjyrat).
3. Trajnoni AI-n tuaj (Knowledge Base).
4. Lidhni Kanalet (Email/WhatsApp).

Me respekt,
Ekipi i AutoPilot`
    }
  },

  // 3. Notification Templates
  notifications: {
    booking_confirmation: {
      subject: "Konfirmimi i Takimit: {bookingTitle}",
      body: `Përshëndetje {customerName},
      
Takimi juaj për {bookingTitle} është konfirmuar për {startTime}.
Ju faleminderit që zgjodhët {businessName}!

Me respekt,
{businessName}`
    },
    booking_reminder: {
      subject: "Kujtesë për Takimin Tuaj nesër",
      body: `Përshëndetje {customerName},
      
Kjo është një kujtesë miqësore për takimin tuaj nesër në orën {startTime} në {businessName}.
Ju lutemi na njoftoni nëse keni ndonjë ndryshim.

Me respekt,
{businessName}`
    }
  }
};
