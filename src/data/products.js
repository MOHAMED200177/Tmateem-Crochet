// ============================================================
//  src/data/products.js
//  ── Single source of truth for all products ──
//  Edit this file and the entire website updates automatically.
//
//  Field reference:
//  id          : unique string
//  name        : product name
//  description : full description (supports \n for line breaks)
//  shortDesc   : one-line card teaser
//  category    : matches CATEGORIES keys below
//  price       : current price (number)
//  oldPrice    : original price before discount (number | null)
//  images      : array of image paths (first = main, second = hover)
//                 Place real photos in public/images/products/ and
//                 reference them here as '/images/products/your-file.jpg'
//  colors      : array of { name, hex } objects
//  sizes       : array of size strings
//  tags        : array of strings for search
//  availability: "in_stock" | "low_stock" | "out_of_stock"
//  stock       : number (0 = out of stock)
//  badges      : array from ["new", "sale", "bestseller", "exclusive", "handmade"]
//  featured    : boolean — shown in hero/featured section
//  bestSeller  : boolean
//  newArrival  : boolean
//  rating      : number 1–5
//  reviewCount : number
// ============================================================

export const WHATSAPP_NUMBER = '201014272589'; // ← رقم الواتساب بتاعك

export const CATEGORIES = {
  outerwear:  { label: 'لاكلوك',  icon: '✦', description: 'لاكلوكات كروشيه هاند ميد' },
  tops:       { label: 'شال',     icon: '✦', description: 'شالات كروشيه هاند ميد' },
  stationery: { label: 'مقلمة',   icon: '✦', description: 'مقالم كروشيه للمدرسة' },
};

export const PRODUCTS = [
  {
    id: 'p015',
    name: 'شال حريمي',
    shortDesc: 'هيمالايا ايفري داي، الطول 200سم، العرض 60سم',
    description: 'شال حريمي\nالخيط المستخدم هيمالايا ايفري داي\nالطول ٢٠٠ سم\nالعرض ٦٠ سم\nيختلف السعر حسب الطول والعرض\nتنفيذ اي لون حسب الطلب',
    category: 'tops',
    price: 200,
    oldPrice: null,
    images: [
      '/2/1.jpg',
      '/2/2.jpg',
      '/2/3.jpg',
      '/2/4.jpg',
    ],
    colors: [
      { name: 'حسب الطلب', hex: '#E8A87C' },
    ],
    sizes: ['الطول 200سم × العرض 60سم (يمكن تغييره حسب الطلب)'],
    tags: ['شال', 'كروشيه', 'هيمالايا', 'حريمي'],
    availability: 'in_stock',
    stock: 99,
    badges: ['handmade'],
    featured: true,
    bestSeller: false,
    newArrival: true,
    rating: 5.0,
    reviewCount: 0,
  },
  {
    id: 'p013',
    name: 'لاكلوك حريمي',
    shortDesc: 'لاكلوك حريمي بخيط هيمالايا، تنفيذ حسب الطلب',
    description: 'لكلوك حريمي\nمتاح تنفيذ اي مقاس حسب الطلب ✅\nمتاح تنفيذ اي لون ✅\nالخيط المستخدم هيمالايا ايفري داي\nالسعر 250\nالمقاسات الرجالي ٤٢ فيما فوق السعر 300',
    category: 'outerwear',
    price: 250,
    oldPrice: null,
    images: [
      '/3/1.jpg',
      '/3/2.jpg',
      '/3/3.jpg',
      '/3/4.jpg',
    ],
    colors: [
      { name: 'حسب الطلب', hex: '#C4622D' },
    ],
    sizes: ['أي مقاس حسب الطلب'],
    tags: ['لاكلوك', 'كروشيه', 'هيمالايا', 'حريمي', 'رجالي'],
    availability: 'in_stock',
    stock: 99,
    badges: ['handmade'],
    featured: true,
    bestSeller: false,
    newArrival: true,
    rating: 5.0,
    reviewCount: 0,
  },
  {
    id: 'p014',
    name: 'مقلمة مدرسة على شكل دب 🐻',
    shortDesc: 'خيط مكرمية مصري، بسوستة، مبطنة من الداخل',
    description: 'مقلمة مدرسة ✏️📚 على شكل دب 🐻\nنوع الخيط مكرمية مصري\nبسوستة\nمبطنة من الداخل ✅\nالسعر 350ج',
    category: 'stationery',
    price: 350,
    oldPrice: null,
    images: [
      '/4/1.jpg',
      '/4/2.jpg',
      '/4/3.jpg',
    ],
    colors: [
      { name: 'بني', hex: '#8B5A2B' },
    ],
    sizes: ['مقاس واحد'],
    tags: ['مقلمة', 'كروشيه', 'دب', 'مكرمية', 'مدرسة'],
    availability: 'in_stock',
    stock: 99,
    badges: ['new', 'handmade'],
    featured: true,
    bestSeller: false,
    newArrival: true,
    rating: 5.0,
    reviewCount: 0,
  },
  {
    id: 'p016',
    name: 'مقلمة مدرسة ستيتش 💙🩷',
    shortDesc: 'خيط مكرمية مصري، بسوستة، مبطنة من الداخل',
    description: 'مقلمة مدرسة ✏️📚 على شكل ستيتش 💙🩷\nنوع الخيط مكرمية مصري\nبسوستة\nمبطنة من الداخل ✅\nالسعر 400',
    category: 'stationery',
    price: 400,
    oldPrice: null,
    images: [
      '/1/2.jpg',
      '/1/1.jpg',
    ],
    colors: [
      { name: 'أزرق وبينك', hex: '#5BA3D0' },
    ],
    sizes: ['مقاس واحد'],
    tags: ['مقلمة', 'كروشيه', 'ستيتش', 'مكرمية', 'مدرسة'],
    availability: 'in_stock',
    stock: 99,
    badges: ['new', 'handmade'],
    featured: true,
    bestSeller: false,
    newArrival: true,
    rating: 5.0,
    reviewCount: 0,
  },
];

// Helper utilities
export const getProductById = (id) =>
  PRODUCTS.find((p) => p.id === id) || null;

export const getProductsByCategory = (category) =>
  PRODUCTS.filter((p) => p.category === category);

export const getFeaturedProducts = () =>
  PRODUCTS.filter((p) => p.featured);

export const getBestSellers = () =>
  PRODUCTS.filter((p) => p.bestSeller);

export const getNewArrivals = () =>
  PRODUCTS.filter((p) => p.newArrival);

export const getOnSale = () =>
  PRODUCTS.filter((p) => p.oldPrice && p.oldPrice > p.price);

export const getDiscount = (price, oldPrice) =>
  oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

export const getRelatedProducts = (product, count = 4) =>
  PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, count);

export const getAllTags = () =>
  [...new Set(PRODUCTS.flatMap((p) => p.tags))].sort();

export const getMinMaxPrice = () => {
  const prices = PRODUCTS.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
};
