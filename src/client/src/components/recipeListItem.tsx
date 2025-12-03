import React from 'react';
import { LucideIcon } from 'lucide-react';
import { icons } from '@/lib/recipeConstants';

interface RecipeListItemProps {
  recipe: {
    id: number;
    name: string;
    brewMethod: string;
  };
}

// maybe icon access is inefficient here?
/*
const BrewMethodIcons: Record<string, string> = {
  "Regular Cup": icons.RegularCup,
  "Espresso": icons.Espresso,
  "Iced": icons.Iced,
  // Add other methods here
};
*/

const BrewMethodIcons: Record<string, LucideIcon> = {
  "Regular Cup": icons.RegularCup,
  "Espresso": icons.Espresso,
  "Iced": icons.Iced,
  // Add other methods here
};

const getBrewIcon = (methodName: string): LucideIcon => {
  return BrewMethodIcons[methodName] || icons.DefaultCoffee;
};

/*
const getBrewIcon = (methodName: string): string => {
  return BrewMethodIcons[methodName] || icons.DefaultCoffee;
};
*/

export const RecipeListItem: React.FC<RecipeListItemProps> = ({ recipe }) => {
  return (
    <div
      className="flex items-center p-3 bg-cbg2 hover:bg-chover rounded-lg cursor-pointer"
    >

      <div className="mr-3 text-ctext">
        {/*}
        <img
          src={getBrewIcon(recipe.brewMethod)}
          alt={recipe.brewMethod}
          className="w-8 h-8 text-cnote color-white"
        />
        */}

        {React.createElement(getBrewIcon(recipe.brewMethod), { size: 30, color: "#ffffff" })}
        
        {/* <Coffee size={30} /> */}
      </div>

      <div className="flex-grow">
        <p className="font-semibold text-cltext">{recipe.name}</p>
        <p className="text-ctext text-sm">{recipe.brewMethod}</p>
      </div>

      <svg className="w-5 h-5 text-caccent2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
    </div>
  );
};