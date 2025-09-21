
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ShoppingCart, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Logo } from '@/components/icons/logo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/carpenters', label: 'Carpenters' },
  { href: '/style-quiz', label: 'Style Quiz', icon: Sparkles },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // For homepage, header becomes "scrolled" after user scrolls past the hero viewport height (100vh)
      // For other pages, it's immediate.
      const scrollThreshold = isHomePage ? window.innerHeight : 10;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    handleScroll(); // Set initial state
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const headerClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    isScrolled || !isHomePage
      ? 'bg-background/80 shadow-md backdrop-blur-sm'
      : 'bg-transparent'
  );

  const linkClasses = (href: string) => cn(
    'text-sm font-medium transition-colors hover:text-primary flex items-center gap-2',
    pathname === href ? 'text-primary' : (isScrolled || !isHomePage) ? 'text-foreground/80' : 'text-white/80 hover:text-white',
  );
  
  const iconButtonClasses = cn(
    'transition-colors',
    (isScrolled || !isHomePage) ? 'text-foreground/80 hover:text-primary' : 'text-white hover:text-white hover:bg-white/10'
  );

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClasses(link.href)}
              >
                {link.icon && <link.icon className={cn("h-4 w-4", link.href === '/style-quiz' ? "text-accent" : "")} />}
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className={cn(iconButtonClasses, 'relative')}>
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
            <ThemeToggle />
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={iconButtonClasses}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-background/95 backdrop-blur-sm shadow-lg"
          >
            <nav className="flex flex-col items-center gap-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-lg font-medium transition-colors hover:text-primary flex items-center gap-2',
                    pathname === link.href ? 'text-primary' : 'text-foreground/80'
                  )}
                >
                  {link.icon && <link.icon className={cn("h-5 w-5", link.href === '/style-quiz' ? "text-accent" : "")} />}
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
