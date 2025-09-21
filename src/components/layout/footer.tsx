import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Github, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm">
              Furniture for Every Home, from Roots to Luxury.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="GitHub"><Github className="h-5 w-5 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5 hover:text-primary transition-colors" /></Link>
            </div>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/carpenters" className="hover:text-primary transition-colors">Find a Carpenter</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop?category=sofa" className="hover:text-primary transition-colors">Sofas</Link></li>
              <li><Link href="/shop?category=beds" className="hover:text-primary transition-colors">Beds</Link></li>
              <li><Link href="/shop?category=tables" className="hover:text-primary transition-colors">Tables</Link></li>
              <li><Link href="/shop?category=chairs" className="hover:text-primary transition-colors">Chairs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-2">Stay updated with our latest products and offers.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="bg-background" />
              <Button type="submit" variant="default">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Vishwakarma 3D Showroom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
