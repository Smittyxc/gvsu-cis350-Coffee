import React from 'react';
import { icons } from '@/lib/recipeConstants';

interface RecipeListItemProps {
  recipe: {
    id: number;
    name: string;
    brewMethod: string;
  };
}

// maybe icon access is inefficient here?
const BrewMethodIcons: Record<string, string> = {
  "Regular Cup": icons.RegularCup,
  "Espresso": icons.Espresso,
  "Iced": icons.Iced,
  // Add other methods here
};

const getBrewIcon = (methodName: string): string => {
  return BrewMethodIcons[methodName] || icons.DefaultCoffee;
};

export const RecipeListItem: React.FC<RecipeListItemProps> = ({ recipe }) => {
  return (
    <div
      className="flex items-center p-3 bg-white hover:bg-gray-50 rounded-lg cursor-pointer border-b border-gray-100"
    >
      <div className="mr-3">
        <img
          src={getBrewIcon(recipe.brewMethod)}
          alt={recipe.brewMethod}
          className="w-8 h-8 text-stone-500"
        />
      </div>

      <div className="flex-grow">
        <p className="font-semibold">{recipe.name}</p>
        <p className="text-sm text-gray-500">{recipe.brewMethod}</p>
      </div>

      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
    </div>
  );
};