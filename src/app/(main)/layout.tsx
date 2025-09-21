'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useLiquidCursor } from '@/hooks/use-liquid-cursor';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useLiquidCursor();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
