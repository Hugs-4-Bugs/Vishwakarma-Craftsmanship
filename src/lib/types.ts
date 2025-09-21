export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  description: string;
  image: string;
  dimensions: string;
  material: string;
  color: { name: string; hex: string };
};

export type Carpenter = {
  id: string;
  name: string;
  experience: number;
  rating: number;
  hourlyRate: number;
  specialty: string[];
  image: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
};
