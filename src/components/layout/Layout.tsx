import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ThemeToggle from '../ThemeToggle';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <motion.main
        className="flex-1 container mx-auto px-4 py-8 md:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      <Footer />
      <ThemeToggle />
    </div>
  );
};

export default Layout;
