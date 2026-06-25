// ============================================================
//  src/data/homeContent.js
//  ── Content for Home page sections ──
//  Philosophy pillars, process steps, hero copy.
//  Edit this file to update Home page text without touching components.
// ============================================================

export const HERO_CONTENT = {
  eyebrow: '✦ Handmade, Stitch by Stitch',
  titleLine1: 'Crochet',
  titleAccent: 'made by hand,',
  titleLine2: 'made for you.',
  subtitle: 'Custom sizes, custom colors — every piece is crocheted one loop at a time, just for you.',
  ctaPrimary: { label: 'Explore the Collection', to: '/shop' },
  ctaSecondary: { label: 'Our Story', to: '/about' },
  stats: [
    { num: '100%', label: 'Handmade' },
    { num: '∞',    label: 'Custom Colors' },
    { num: '✦',    label: 'Made to Order' },
  ],
  badge: { title: 'Hand-Crocheted', subtitle: 'Every single loop' },
  imageAlt: { main: 'Tmateem Crochet handmade piece', float: 'Close-up detail of hand-crocheted stitches' },
  scrollHint: 'Scroll',
};

export const PHILOSOPHY_CONTENT = {
  eyebrow: 'The Tmateem Way',
  titleMain: 'Crafted by hand,',
  titleAccent: 'made for you.',
  pillars: [
    {
      mark: '✦',
      title: 'Handmade, Always',
      text: 'Every loop and stitch is made by hand, one piece at a time. No machines, no shortcuts — just patient, careful craft.',
    },
    {
      mark: '✦',
      title: 'Made For You',
      text: 'Most of our pieces are made to order — your size, your color, your request. What you imagine, we crochet.',
    },
    {
      mark: '✦',
      title: 'Built to Last',
      text: 'We use quality yarns like Himalaya Everyday and sturdy Egyptian macramé thread, so every piece holds up to daily life.',
    },
  ],
};

export const PROCESS_CONTENT = {
  eyebrow: 'Our Craft',
  title: 'From Fiber to Finished Piece',
  steps: [
    { num: '01', title: 'Choose',  text: 'You pick the piece, size, and color — every order starts with your exact request.' },
    { num: '02', title: 'Yarn Up', text: 'We select quality yarn and thread, like Himalaya Everyday or Egyptian macramé, to match your piece.' },
    { num: '03', title: 'Crochet', text: 'Hand-crocheted loop by loop, with no machines involved — just hook, thread, and time.' },
    { num: '04', title: 'Finish',  text: 'Final quality check and careful packaging — ready to be sent your way.' },
  ],
};

export const CATEGORY_SHOWCASE_CONTENT = {
  eyebrow: 'Browse by Craft',
  title: 'Shop the Collection',
};

export const WHATSAPP_BANNER_CONTENT = {
  title: 'Have a question before you order?',
  subtitle: 'Message us directly — we reply personally, usually within the hour.',
  ctaLabel: 'Chat With Us',
};
