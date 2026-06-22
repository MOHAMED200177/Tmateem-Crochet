# Tmateem Crochet

A premium, front-end-only e-commerce showcase for handmade crochet pieces — built with React, Vite, and a warm Desert Terracotta visual identity. No backend, no database, no payment gateway. Orders are placed directly through WhatsApp.

## Getting Started

```bash
npm install
npm run dev
```

Open the URL shown in your terminal (usually http://localhost:5173).

To build for production:

```bash
npm run build
```

The output will be in the `dist/` folder — upload that folder to any static host (Netlify, Vercel, GitHub Pages, your own server, etc.).

---

## The Most Important File: src/data/products.js

This is the only file you need to edit to manage your store. Every product on the entire website is loaded from this single file. Add, remove, or edit a product here and the whole site — home page, shop, categories, search, filters — updates automatically.

### Editing your WhatsApp number

At the top of src/data/products.js:

```js
export const WHATSAPP_NUMBER = '201000000000'; // Replace with your number
```

Use the full international format with no +, no spaces, no dashes.

The same number is also hardcoded in:
- src/components/layout/Footer.jsx
- src/components/home/WhatsAppBanner.jsx
- src/pages/Contact.jsx

Update those three files too if you change your number.

### Adding a new product

Copy this template and add it to the PRODUCTS array:

```js
{
  id: 'p017',
  name: 'Your Product Name',
  shortDesc: 'A one-line teaser shown on product cards',
  description: 'Full description.\n\nUse double newline for paragraph breaks.',
  category: 'outerwear',          // dresses | tops | outerwear | bottoms | sets | accessories | stationery
  price: 250,
  oldPrice: null,                 // set a number here if discounted
  images: [
    'https://your-image-url.com/main.jpg',
    'https://your-image-url.com/hover.jpg',
  ],
  colors: [
    { name: 'Custom (Any Color)', hex: '#C4622D' },
  ],
  sizes: ['Custom — Any Size'],   // or a fixed list like ['S', 'M', 'L']
  tags: ['crochet', 'handmade'],  // used by the search system
  availability: 'in_stock',
  stock: 99,
  badges: ['handmade'],           // any of: new, sale, bestseller, exclusive, handmade
  featured: false,
  bestSeller: false,
  newArrival: true,
  rating: 5.0,
  reviewCount: 0,
},
```

### Adding/editing categories

Edit the CATEGORIES object in the same file. Currently includes: dresses, tops, outerwear, bottoms, sets, accessories, stationery.

### A note on testimonials

`src/components/home/Testimonials.jsx` currently holds placeholder review copy ("Customer Name" / "Replace with a real review"). Swap these out for real customer feedback once you have it — don't publish invented quotes as genuine reviews.

---

## Folder Structure

```
src/
  components/
    common/       SearchModal, PageHeader
    home/         Hero, CategoryShowcase, Featured, Philosophy, Process, Testimonials
    layout/       Navbar, Footer, Layout wrapper
    product/      ProductCard, ProductGrid, QuickViewModal
    shop/         FilterPanel (filters + sort)
  context/        CartContext, FavoritesContext, SearchContext, ToastContext
  data/
    products.js   EDIT THIS FILE to manage your store
  hooks/          useScrollReveal, useFilteredProducts
  pages/          One file per route
  styles/
    globals.css   CSS variables, typography, base styles
  utils/
    helpers.js    WhatsApp message builder, price formatter, etc.
```

## Pages

| Route | Page |
|---|---|
| / | Home |
| /shop | Shop All (filters + sort) |
| /product/:id | Product Details |
| /categories | Categories |
| /new-arrivals | New Arrivals |
| /best-sellers | Best Sellers |
| /offers | Current Offers |
| /favorites | Saved Favorites |
| /cart | Shopping Cart, WhatsApp checkout |
| /search?q= | Search Results |
| /about | About Us |
| /contact | Contact form to WhatsApp |
| * | 404 |

## Features

Search with live debounce and history, combinable filters (category, price, color, size, sale, stock, new, bestseller), full sort options, favorites and cart persisted to localStorage, quick view modal, scroll-reveal animations, skeleton loading states, full responsiveness, and accessible semantic markup.

## Tech Stack

React 19, Vite, React Router v6, Context API, plain CSS with custom properties, localStorage persistence.

## Customizing the Look

All colors, fonts, spacing live in src/styles/globals.css as CSS custom properties. Change once, cascades everywhere.

```css
--clr-terracotta: #C4622D;
--clr-espresso: #2A1508;
--font-display: 'DM Serif Display';
--font-serif: 'Cormorant Garamond';
```

Made by hand, made for you.
