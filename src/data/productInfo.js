// ============================================================
//  src/data/productInfo.js
//  ── Shared product-page content: care instructions, shipping ──
//  Edit this file to update the "Care" and "Shipping" tabs on
//  every product page at once.
// ============================================================

export const CARE_INSTRUCTIONS = [
  'Hand wash cold in gentle detergent, do not wring',
  'Lay flat to dry — do not hang or tumble dry',
  'Iron on low heat if needed, inside out',
  'Store folded, away from direct sunlight',
];

export const SHIPPING_INFO = [
  'Processing time: 2–4 business days (handmade to order)',
  'Local delivery: 3–5 business days',
  'Orders are confirmed and arranged via WhatsApp',
];

export const PRODUCT_TABS = [
  { key: 'description', label: 'Description' },
  { key: 'care',        label: 'Care Instructions' },
  { key: 'shipping',    label: 'Shipping' },
];
