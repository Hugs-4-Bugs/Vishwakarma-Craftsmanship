
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
];

export const customBuilderOptions = {
  types: [
    { name: 'Sofa', basePrice: 25000, image: 'sofa-1' },
    { name: 'Bed', basePrice: 20000, image: 'beds-1' },
    { name: 'Dining Table', basePrice: 30000, image: 'dining-1' },
    { name: 'Chair', basePrice: 5000, image: 'chairs-1' },
    { name: 'Wardrobe', basePrice: 35000, image: 'wardrobes-1' },
    { name: 'Table', basePrice: 10000, image: 'tables-1' },
  ],
  woods: [
    { name: 'Sheesham', priceMultiplier: 1.2 },
    { name: 'Teak', priceMultiplier: 1.8 },
    { name: 'Mango Wood', priceMultiplier: 1.0 },
    { name: 'Sal Wood', priceMultiplier: 1.4 },
    { name: 'Plyboard', priceMultiplier: 0.7 },
    { name: 'Other', priceMultiplier: 2.0 },
  ],
  finishes: [
    { name: 'Natural', priceMultiplier: 1.0 },
    { name: 'Walnut', priceMultiplier: 1.1 },
    { name: 'Honey', priceMultiplier: 1.05 },
    { name: 'Matte', priceMultiplier: 1.15 },
    { name: 'Glossy', priceMultiplier: 1.2 },
  ],
};


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

export const materials = ['Wood', 'Metal', 'Fabric', 'Glass'];
export const colors = [
    { name: 'Natural', hex: '#D2B48C' },
    { name: 'Walnut', hex: '#7B3F00' },
    { name: 'Black', hex: '#333333' },
    { name: 'White', hex: '#F5F5DC' },
    { name: 'Grey', hex: '#808080' },
    { name: 'Green', hex: '#556B2F' },
];

const categoryImages: Record<string, string[]> = {
    'Sofa': ['sofa-1', 'sofa-2', 'sofa-3', 'sofa-4', 'sofa-5'],
    'Beds': ['beds-1', 'beds-2', 'beds-3', 'beds-4', 'beds-5'],
    'Dining': ['dining-1', 'dining-2', 'dining-3'],
    'Tables': ['tables-1', 'tables-2', 'tables-3'],
    'Chairs': ['chairs-1', 'chairs-2', 'chairs-3', 'chairs-4', 'chairs-5'],
    'Wardrobes': ['wardrobes-1', 'wardrobes-2', 'wardrobes-3'],
    'Storage': ['storage-1', 'storage-2', 'storage-3'],
    'Office': ['office-1', 'office-2'],
};

// Helper to get a deterministic image for a category
const getImageForCategory = (category: string, index: number) => {
    const images = categoryImages[category] || ['sofa-1'];
    return images[index % images.length];
};

let productCounter = 1;
export const products: Product[] = [];

// Generate a deterministic list of products
for (let i = 0; i < 155; i++) {
    const base = productBases[i % productBases.length];
    const wood = woodTypes[i % woodTypes.length];
    const finish = finishes[i % finishes.length];
    const material = materials[i % materials.length];
    const color = colors[i % colors.length];

    const productName = `${wood.prefix} ${finish.prefix} ${base.name}`;
    const productId = `${productCounter++}`;

    products.push({
        id: productId,
        name: productName,
        slug: `${productName.toLowerCase().replace(/\s+/g, '-')}-${productId}`,
        category: base.category,
        price: Math.floor((base.price * wood.priceMod) / 100) * 100,
        description: base.desc,
        image: getImageForCategory(base.category, i),
        dimensions: '180cm x 200cm x 90cm', // Placeholder dimensions
        material: material,
        color: color,
    });
}


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
  {
    id: '4',
    name: 'Anil Verma',
    experience: 12,
    rating: 4.7,
    hourlyRate: 480,
    specialty: ['Kitchen Cabinets', 'Custom Furniture'],
    image: 'carpenter-1',
  },
  {
    id: '5',
    name: 'Sunil Gupta',
    experience: 18,
    rating: 4.6,
    hourlyRate: 600,
    specialty: ['Door Installation', 'Repairs'],
    image: 'carpenter-2',
  },
  {
    id: '6',
    name: 'Manoj Patel',
    experience: 10,
    rating: 4.4,
    hourlyRate: 420,
    specialty: ['General Carpentry', 'Polishing'],
    image: 'carpenter-3',
  },
  {
    id: '7',
    name: 'Rajesh Mishra',
    experience: 25,
    rating: 5.0,
    hourlyRate: 700,
    specialty: ['Heritage Restoration', 'Fine Woodworking'],
    image: 'carpenter-1',
  },
  {
    id: '8',
    name: 'Deepak Yadav',
    experience: 7,
    rating: 4.3,
    hourlyRate: 380,
    specialty: ['Furniture Assembly', 'Repairs'],
    image: 'carpenter-2',
  },
  {
    id: '9',
    name: 'Prakash Jha',
    experience: 14,
    rating: 4.8,
    hourlyRate: 520,
    specialty: ['Custom Shelving', 'Wardrobe Design'],
    image: 'carpenter-3',
  },
  {
    id: '10',
    name: 'Hari Prasad',
    experience: 30,
    rating: 4.9,
    hourlyRate: 750,
    specialty: ['Master Craftsman', 'Intricate Carving'],
    image: 'carpenter-1',
  },
  {
    id: '11',
    name: 'Krishna Murthy',
    experience: 9,
    rating: 4.6,
    hourlyRate: 450,
    specialty: ['Modern Designs', 'Office Furniture'],
    image: 'carpenter-2',
  },
  {
    id: '12',
    name: 'Gopal Krishna',
    experience: 11,
    rating: 4.5,
    hourlyRate: 470,
    specialty: ['Custom Furniture', 'Polishing'],
    image: 'carpenter-3',
  },
  {
    id: '13',
    name: 'Arjun Reddy',
    experience: 6,
    rating: 4.2,
    hourlyRate: 350,
    specialty: ['General Repairs', 'Assembly'],
    image: 'carpenter-1',
  },
  {
    id: '14',
    name: 'Shiva Kumar',
    experience: 16,
    rating: 4.7,
    hourlyRate: 550,
    specialty: ['Staircases', 'Custom Woodwork'],
    image: 'carpenter-2',
  },
  {
    id: '15',
    name: 'Babu Lal',
    experience: 22,
    rating: 4.8,
    hourlyRate: 680,
    specialty: ['Traditional Furniture', 'Restoration'],
    image: 'carpenter-3',
  },
  {
    id: '16',
    name: 'Ravi Shankar',
    experience: 13,
    rating: 4.6,
    hourlyRate: 500,
    specialty: ['Outdoor Decking', 'Pergolas'],
    image: 'carpenter-1',
  },
  {
    id: '17',
    name: 'Vinod Khanna',
    experience: 19,
    rating: 4.9,
    hourlyRate: 640,
    specialty: ['Window Frames', 'Door Installation'],
    image: 'carpenter-2',
  },
  {
    id: '18',
    name: 'Amit Singh',
    experience: 5,
    rating: 4.1,
    hourlyRate: 320,
    specialty: ['Furniture Assembly', 'Minor Repairs'],
    image: 'carpenter-3',
  },
  {
    id: '19',
    name: 'Naveen Kumar',
    experience: 17,
    rating: 4.7,
    hourlyRate: 580,
    specialty: ['Custom Cabinets', 'Kitchen Woodwork'],
    image: 'carpenter-1',
  },
  {
    id: '20',
    name: 'Sanjay Dutt',
    experience: 28,
    rating: 4.9,
    hourlyRate: 720,
    specialty: ['Architectural Woodwork', 'Fine Detailing'],
    image: 'carpenter-2',
  },
  {
    id: '21',
    name: 'Imran Khan',
    experience: 10,
    rating: 4.5,
    hourlyRate: 430,
    specialty: ['Modern Furniture', 'Minimalist Design'],
    image: 'carpenter-3',
  },
  {
    id: '22',
    name: 'Farhan Akhtar',
    experience: 15,
    rating: 4.8,
    hourlyRate: 530,
    specialty: ['Custom Tables', 'Chair Design'],
    image: 'carpenter-1',
  },
  {
    id: '23',
    name: 'John Abraham',
    experience: 12,
    rating: 4.6,
    hourlyRate: 490,
    specialty: ['Bed Frames', 'Wardrobe Assembly'],
    image: 'carpenter-2',
  },
  {
    id: '24',
    name: 'Hrithik Roshan',
    experience: 21,
    rating: 5.0,
    hourlyRate: 800,
    specialty: ['Luxury Furniture', 'Bespoke Designs'],
    image: 'carpenter-3',
  },
  {
    id: '25',
    name: 'Shahid Kapoor',
    experience: 14,
    rating: 4.7,
    hourlyRate: 540,
    specialty: ['Restoration', 'Veneering'],
    image: 'carpenter-1',
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
