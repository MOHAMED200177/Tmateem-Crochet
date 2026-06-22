import { WHATSAPP_NUMBER } from '../data/products';

export function buildWhatsAppURL({ product, size, color, quantity = 1 }) {
  const discount = product.oldPrice
    ? ` (${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% off)`
    : '';

  const message = `Hello,\n\nI want to order this product.\n\n` +
    `Product: ${product.name}\n` +
    `Price: $${product.price}${discount}\n` +
    `Size: ${size}\n` +
    `Color: ${color?.name || color}\n` +
    `Quantity: ${quantity}\n\n` +
    `Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildCartWhatsAppURL(items) {
  const lines = items.map((item, i) =>
    `${i + 1}. ${item.product.name}\n   Size: ${item.size} | Color: ${item.color.name} | Qty: ${item.quantity} | $${item.product.price * item.quantity}`
  ).join('\n\n');

  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  const message = `Hello,\n\nI want to order the following items:\n\n${lines}\n\n─────────────\nTotal: $${total}\n\nThank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);
}

export function getDiscount(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
