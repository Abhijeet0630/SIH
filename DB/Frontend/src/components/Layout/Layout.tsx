import React, { ReactNode } from 'react';
import { Navbar } from '../Navigation/Navbar';
import { Footer } from '../Navigation/Footer';
import { AIGuide } from '../BharatAI/AIGuide';

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-parchment-50 text-parchment-900 transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <AIGuide />
    </div>
  );
};
