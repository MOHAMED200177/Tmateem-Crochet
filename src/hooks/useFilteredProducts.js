import { useMemo } from 'react';

export function useFilteredProducts(products, filters, sort) {
  return useMemo(() => {
    let result = [...products];

    if (filters.categories?.length) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.colors?.length) {
      result = result.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)));
    }
    if (filters.sizes?.length) {
      result = result.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
    }
    if (filters.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filters.maxPrice);
    }
    if (filters.onSale) {
      result = result.filter((p) => p.oldPrice && p.oldPrice > p.price);
    }
    if (filters.inStock) {
      result = result.filter((p) => p.availability !== 'out_of_stock');
    }
    if (filters.newArrival) {
      result = result.filter((p) => p.newArrival);
    }
    if (filters.bestSeller) {
      result = result.filter((p) => p.bestSeller);
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'bestseller':
        result.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0) || b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => {
          const da = a.oldPrice ? (a.oldPrice - a.price) / a.oldPrice : 0;
          const db = b.oldPrice ? (b.oldPrice - b.price) / b.oldPrice : 0;
          return db - da;
        });
        break;
      case 'az':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'za':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'popular':
        result.sort((a, b) => b.reviewCount * b.rating - a.reviewCount * a.rating);
        break;
      case 'newest':
      default:
        result.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
        break;
    }

    return result;
  }, [products, filters, sort]);
}
