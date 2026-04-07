import React from 'react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div dir="rtl" className={cn("min-h-screen bg-stone-50 font-sans text-stone-900", className)}>
      {children}
    </div>
  );
}
