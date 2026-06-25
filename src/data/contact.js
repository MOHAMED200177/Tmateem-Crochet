// ============================================================
//  src/data/contact.js
//  ── Contact details: address, email, hours ──
//  WhatsApp number lives in data/products.js (single source of
//  truth) and is imported wherever needed — not duplicated here.
//  Edit this file once and it updates the Footer and Contact page.
// ============================================================

export const CONTACT_INFO = {
  email: 'hello@tmateemcrochet.com',
  address: 'Damanhur, Beheira, Egypt',
  hours: 'Monday – Saturday, 10:00 – 18:00',
  hoursShort: 'Mon – Sat · 10:00 – 18:00',
};

// Pre-filled WhatsApp message templates used by CTA banners/buttons
export const WHATSAPP_MESSAGES = {
  generalQuestion: 'Hello, I have a question about your handmade pieces.',
};
