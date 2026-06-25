// ============================================================
//  src/data/pageContent.js
//  ── Page headers and copy for collection/utility pages ──
//  Edit this file to change page titles, subtitles, and
//  empty-state messages without touching any component.
// ============================================================

export const SHOP_PAGE = {
  eyebrow: 'The Full Collection',
  title: 'Shop All Pieces',
  subtitle: (count) => `${count} handcrafted pieces, each one slightly unique`,
  filtersButtonLabel: 'Filters',
  resultsLabel: (count) => `${count} results`,
  sortAriaLabel: 'Sort products',
  emptyMessage: 'No pieces match your filters — try adjusting them',
};

export const CATEGORIES_PAGE = {
  eyebrow: 'Browse',
  title: 'Categories',
  subtitle: 'Find pieces by craft and silhouette',
  allLabel: (count) => `All (${count})`,
  emptyMessage: 'No pieces in this category yet',
};

export const NEW_ARRIVALS_PAGE = {
  eyebrow: 'Just Landed',
  title: 'New Arrivals',
  subtitle: 'The latest pieces from our hook, fresh off the needle',
  emptyMessage: 'No new arrivals at the moment — check back soon',
};

export const BEST_SELLERS_PAGE = {
  eyebrow: 'Customer Favorites',
  title: 'Best Sellers',
  subtitle: 'The pieces our community returns to again and again',
  emptyMessage: 'No best sellers yet',
};

export const OFFERS_PAGE = {
  eyebrow: 'Limited Time',
  title: 'Current Offers',
  subtitle: 'Thoughtfully discounted pieces, while stocks last',
  emptyMessage: 'No active offers right now — check back soon',
};

export const FAVORITES_PAGE = {
  eyebrow: 'Saved For Later',
  title: 'Your Favorites',
  subtitleWithCount: (count) => `${count} piece${count !== 1 ? 's' : ''} you've saved`,
  subtitleEmpty: 'Pieces you love, all in one place',
  emptyMessage: "You haven't saved any pieces yet",
  browseLink: 'Browse the collection →',
};

export const CART_PAGE = {
  eyebrow: 'Your Selection',
  title: 'Shopping Cart',
  subtitleWithCount: (count) => `${count} item${count !== 1 ? 's' : ''} ready to order`,
  subtitleEmpty: 'Your cart is currently empty',
  emptyMessage: 'Your cart is empty',
  startShoppingLink: 'Start shopping →',
  summaryTitle: 'Order Summary',
  subtotalLabel: (count) => `Subtotal (${count} items)`,
  shippingLabel: 'Shipping',
  shippingCalculated: 'Calculated via WhatsApp',
  totalLabel: 'Total',
  checkoutButton: 'Complete Order via WhatsApp',
  checkoutNote: "No payment is taken here — you'll confirm final details directly with our studio on WhatsApp.",
  clearCartButton: 'Clear Cart',
  freeShippingThreshold: null, // set a number to enable a free-shipping label again; null disables it
  decreaseQuantityAria: 'Decrease quantity',
  increaseQuantityAria: 'Increase quantity',
  removeItemAria: 'Remove item',
};

export const SEARCH_RESULTS_PAGE = {
  eyebrow: 'Search Results',
  resultsCount: (count) => `${count} piece${count !== 1 ? 's' : ''} found`,
  emptyMessage: (query) => `No pieces found for "${query}" — try a different search term`,
};

export const NOT_FOUND_PAGE = {
  title: '404',
  text: 'This piece seems to have unraveled.',
  subtext: "The page you're looking for doesn't exist, or may have been moved.",
  buttonLabel: 'Return Home',
};
