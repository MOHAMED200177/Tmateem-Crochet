// ============================================================
//  src/data/site.js
//  ── Site-wide content: brand, navigation, social links ──
//  Edit this file to update branding and navigation everywhere.
// ============================================================

export const BRAND = {
  name: 'Tmateem',
  shortName: 'Tmateem',
  suffix: 'CROCHET',
  tagline: 'Clothing made slowly, with intention and imperfection.',
  logoMark: '🧶',
  copyrightName: 'Tmateem Crochet',
  craftLine: 'Made with intention ✦ Every stitch tells a story',
};

// Main navigation — used in both desktop and mobile menus
export const NAV_LINKS = [
  { to: '/',             label: 'Home'         },
  { to: '/shop',         label: 'Shop'         },
  { to: '/categories',   label: 'Categories'   },
  { to: '/new-arrivals', label: 'New Arrivals' },
  { to: '/best-sellers', label: 'Best Sellers' },
  { to: '/offers',       label: 'Offers'       },
  { to: '/about',        label: 'About'        },
  { to: '/contact',      label: 'Contact'      },
];

// Footer "Navigate" quick links
export const FOOTER_QUICK_LINKS = [
  { to: '/',             label: 'Home'         },
  { to: '/shop',         label: 'Shop All'     },
  { to: '/new-arrivals', label: 'New Arrivals' },
  { to: '/best-sellers', label: 'Best Sellers' },
  { to: '/offers',       label: 'Offers'       },
];

// Social media links — set href to '#' to hide/disable a platform later if needed
export const SOCIAL_LINKS = [
  { name: 'Instagram', href: '#' },
  { name: 'Pinterest', href: '#' },
  { name: 'TikTok',    href: '#' },
];

export const NAVBAR_A11Y = {
  mainNav: 'Main navigation',
  search: 'Search',
  toggleMenu: 'Toggle menu',
};
