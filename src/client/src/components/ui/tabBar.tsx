import React from 'react';
import { BookOpen, Coffee, User, LucideIcon } from 'lucide-react';
// import { Link } from 'react-router-dom'; 

interface NavItem {
  name: string;
  icon: LucideIcon;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Account', icon: User, href: '/account' },
  { name: 'Recipes', icon: BookOpen, href: '/recipes' },
  { name: 'Coffee', icon: Coffee, href: '/coffee' },
];

export const TabBar: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-2xl border-t border-gray-100">
      <div className="flex justify-around items-center h-full text-stone-500">
        {navItems.map((item) => {
          const IconComponent = item.icon;

          return (
            // 💡 REPLACED <a> WITH <Link>
            // Replace <div/> with <Link to={item.href}> for actual routing
            <div // Placeholder for <Link> if you can't use it here
              key={item.name}
              // to={item.href} // Use this line with your router's <Link>
              className="flex flex-col items-center justify-center h-full w-1/3 text-stone-300 hover:text-stone-500 transition-colors duration-200 cursor-pointer"
            >
              <IconComponent className="w-6 h-6" />
              <span className="text-xs mt-1 font-semibold">{item.name}</span>
            </div>
            // END OF <Link> BLOCK
          );
        })}
      </div>
    </footer>
  );
};