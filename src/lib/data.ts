import type { Product, Carpenter, BlogPost } from './types';

export const categories = [
  { slug: 'sofa', name: 'Sofa' },
  { slug: 'beds', name: 'Beds' },
  { slug: 'dining', name: 'Dining' },
  { slug: 'tables', name: 'Tables' },
  { slug: 'chairs', name: 'Chairs' },
  { slug: 'wardrobes', name: 'Wardrobes' },
  { slug: 'storage', name: 'Storage' },
  { slug: 'office', name: 'Office' },
  { slug: 'premium', name: 'Premium' },
  { slug: 'budget', name: 'Budget' },
];

const productBases = [
    { name: 'Sofa', category: 'Sofa', price: 45000, desc: 'A comfortable and stylish centerpiece for your living room.' },
    { name: 'Bed', category: 'Beds', price: 38000, desc: 'Ensures a restful night\'s sleep with its sturdy frame and elegant design.' },
    { name: 'Dining Table', category: 'Dining', price: 55000, desc: 'Gather your family around this beautiful and durable dining table.' },
    { name: 'Coffee Table', category: 'Tables', price: 15000, desc: 'The perfect companion for your sofa, combining form and function.' },
    { name: 'Armchair', category: 'Chairs', price: 18000, desc: 'A cozy spot to read a book or enjoy a cup of tea.' },
    { name: 'Wardrobe', category: 'Wardrobes', price: 65000, desc: 'Spacious and elegant storage for your clothing and accessories.' },
    { name: 'Bookshelf', category: 'Storage', price: 22000, desc: 'Showcase your literary collection with this stylish bookshelf.' },
    { name: 'Office Chair', category: 'Office', price: 12000, desc: 'Ergonomic support for a productive workday.' },
    { name: 'Sideboard', category: 'Storage', price: 28000, desc: 'Elegant storage for your dining room or hallway.' },
    { name: 'Study Desk', category: 'Office', price: 19000, desc: 'A dedicated space for focus and creativity.' },
    { name: 'Lounge Chair', category: 'Chairs', price: 25000, desc: 'Relax in style with this modern and comfortable lounge chair.' },
    { name: 'King Bed', category: 'Beds', price: 48000, desc: 'Experience ultimate comfort and space with our king-sized bed.' },
    { name: 'Sectional Sofa', category: 'Sofa', price: 85000, desc: 'Flexible and spacious seating for the whole family.' },
    { name: 'Dresser', category: 'Storage', price: 32000, desc: 'A beautiful and practical addition to your bedroom.' },
    { name: 'Dining Chair', category: 'Dining', price: 7000, desc: 'Comfortable and elegant seating for your dining table.' },
];

const woodTypes = [
    { name: 'Sheesham', priceMod: 1.2, prefix: 'Sheesham' },
    { name: 'Teak', priceMod: 1.5, prefix: 'Teak Wood' },
    { name: 'Mango Wood', priceMod: 1.0, prefix: 'Mango Wood' },
    { name: 'Sal Wood', priceMod: 1.3, prefix: 'Sal Wood' },
    { name: 'Oak', priceMod: 1.1, prefix: 'Royal Oak' },
    { name: 'Acacia', priceMod: 1.0, prefix: 'Acacia' },
    { name: 'Engineered Wood', priceMod: 0.8, prefix: 'Modern' },
];

const finishes = [
    { name: 'Natural', prefix: 'Natural Finish' },
    { name: 'Walnut Finish', prefix: 'Walnut' },
    { name: 'Honey Finish', prefix: 'Honey' },
    { name: 'Matte Black', prefix: 'Noir' },
    { name: 'Distressed White', prefix: 'Vintage' },
];

let productCounter = 1;
export const products: Product[] = productBases.flatMap(base =>
    woodTypes.flatMap(wood =>
        finishes.map(finish => {
            const productName = `${wood.prefix} ${finish.prefix} ${base.name}`;
            const productId = `${productCounter++}`;
            return {
                id: productId,
                name: productName,
                slug: productName.toLowerCase().replace(/\s+/g, '-'),
                category: base.category,
                price: Math.floor(base.price * wood.priceMod / 100) * 100,
                description: base.desc,
                image: `prod-${( ( (productCounter-2) % 15) + 1)}`, // Cycle through 15 placeholder images
                dimensions: '180cm x 200cm x 90cm', // Placeholder dimensions
            };
        })
    )
).slice(0, 155); // Limit to 155 products for now


export const carpenters: Carpenter[] = [
  {
    id: '1',
    name: 'Ramesh Kumar',
    experience: 15,
    rating: 4.8,
    hourlyRate: 500,
    specialty: ['Custom Furniture', 'Repairs', 'Polishing'],
    image: 'carpenter-1',
  },
  {
    id: '2',
    name: 'Suresh Singh',
    experience: 20,
    rating: 4.9,
    hourlyRate: 650,
    specialty: ['Antique Restoration', 'Intricate Carving'],
    image: 'carpenter-2',
  },
  {
    id: '3',
    name: 'Vikram Sharma',
    experience: 8,
    rating: 4.5,
    hourlyRate: 400,
    specialty: ['Modern Designs', 'Wardrobe Assembly'],
    image: 'carpenter-3',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Ultimate Guide to Choosing the Right Wood',
    slug: 'guide-to-choosing-wood',
    excerpt: 'From oak to teak, we break down the pros and cons of different woods for your furniture.',
    author: 'Vishwakarma Experts',
    date: '2024-05-15',
    image: 'blog-1',
  },
  {
    id: '2',
    title: '5 Interior Design Trends to Watch in 2024',
    slug: 'interior-design-trends-2024',
    excerpt: 'Stay ahead of the curve with these stunning interior design trends that are making waves this year.',
    author: 'Design Weekly',
    date: '2024-05-10',
    image: 'blog-2',
  },
  {
    id: '3',
    title: 'How to Care for Your Luxury Furniture',
    slug: 'caring-for-luxury-furniture',
    excerpt: 'Keep your premium furniture looking its best with our essential maintenance tips.',
    author: 'The Craftsman',
    date: '2024-05-01',
    image: 'blog-3',
  },
];
