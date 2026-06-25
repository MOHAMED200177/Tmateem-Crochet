// ============================================================
//  src/data/productCardLabels.js
//  ── UI labels for ProductCard / QuickViewModal / ProductGrid ──
//  Edit this file to change button text and status labels
//  across every product card on the site.
// ============================================================

export const PRODUCT_CARD_LABELS = {
  quickView: 'Quick View',
  soldOut: 'Sold Out',
  onlyXLeft: 'Only {stock} left',
  addToCart: 'Add to Cart',
  outOfStock: 'Out of Stock',
  orderViaWhatsApp: 'Order via WhatsApp',
  addToFavoritesAction: 'Add to favorites',
  removeFromFavoritesAction: 'Remove from favorites',
  addedToFavorites: 'Added to favorites',
  removedFromFavorites: 'Removed from favorites',
  addedToCart: '{name} added to cart',
};

export const PRODUCT_GRID_LABELS = {
  emptyDefault: 'No products found',
};

export const QUICK_VIEW_LABELS = {
  closeQuickView: 'Close quick view',
  quickViewPrefix: 'Quick view',
  colorPrefix: 'Color —',
  sizePrefix: 'Size —',
  quantity: 'Quantity',
  decreaseQuantity: 'Decrease quantity',
  increaseQuantity: 'Increase quantity',
  addToCart: 'Add to Cart',
  orderViaWhatsApp: 'Order via WhatsApp',
  viewFullDetails: 'View full details →',
  reviewsSuffix: 'reviews',
};

export const SEARCH_MODAL_LABELS = {
  ariaLabel: 'Search products',
  inputPlaceholder: 'Search by name, color, or category...',
  clearSearchAria: 'Clear search',
  closeSearchAria: 'Close search',
  closeSearchKeyHint: 'Esc',
  recentSearches: 'Recent Searches',
  clearHistory: 'Clear',
  emptyStateHint: 'Search by name, color, size or category...',
  noResultsPrefix: 'No pieces found for',
  noResultsHint: 'Try searching for a product name or color',
  resultsSuffix: (count) => `${count} Result${count !== 1 ? 's' : ''}`,
  viewAll: 'View all →',
};
