import React from 'react';

// CHANGE FOR CONSISTENT ICONS IMPORTS
const DefaultCoffeeIcon = '/icons/coffee.svg';
const RegularCupIcon = '/icons/icon-72x72.png';

interface RecipeListItemProps {
  recipe: {
    id: number;
    name: string;
    brewMethod: string;
  };
}

const BrewMethodIcons: Record<string, string> = {
  "Regular Cup": RegularCupIcon,
  // Add other methods here
};

const getBrewIcon = (methodName: string): string => {
  return BrewMethodIcons[methodName] || DefaultCoffeeIcon;
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