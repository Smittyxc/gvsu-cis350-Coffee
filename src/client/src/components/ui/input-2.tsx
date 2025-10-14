import React from 'react';
import { inputStyle } from '@/lib/recipeConstants';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input 
      className={`${inputStyle} ${className}`} 
      {...props} 
    />
  );
};