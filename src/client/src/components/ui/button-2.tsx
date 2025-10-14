import React from 'react';
import { baseButton } from '@/lib/recipeConstants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'filter';
  children: React.ReactNode;
}

const getVariantClasses = (variant: ButtonProps['variant']): string => {
  switch (variant) {
    case 'secondary':
      return "bg-gray-200 text-gray-800 hover:bg-gray-300";
    case 'filter':
      return "px-4 py-1 text-sm bg-stone-200 border border-gray-300 hover:bg-gray-200";
    case 'primary':
    default:
      return "bg-yellow-700 text-white hover:bg-yellow-800";
  }
};

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
  const classes = `${baseButton} ${getVariantClasses(variant)} ${className}`;
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};