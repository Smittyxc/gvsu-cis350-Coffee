// Working
import { BookOpen, Coffee, User, Scale, Thermometer, Bean } from 'lucide-react';
import DefaultCoffeeIcon from '/icons/coffee.svg';
import RegularCupIcon from '/icons/icon-72x72.png';

import React, { useState } from 'react';

// EXTEND SHARED VARIABLES FOR EASE OF DESIGN CHANGE
const baseButton = "px-4 py-2 rounded-lg font-semibold transition-colors duration-150";
//const primaryButton = `${baseButton} bg-yellow-700 text-white hover:bg-yellow-800`;
const secondaryButton = `${baseButton} bg-gray-200 text-gray-800 hover:bg-gray-300`;
const inputStyle = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-700 bg-stone-200";

// PALETTE?
// BLUES:
// gray-600
// gray-700

//Random
interface Recipe {
  id: number;
  name: string;
  brewMethod: string;
  dose: number;
  waterAmount: number;
  grindSize: 'Extra Fine' | 'Fine' | 'Medium' | 'Coarse' | 'Extra Coarse';
  steps: { description: string; time?: string }[];
}

// RECIPE LIST
const RecipesList: React.FC<{ onSelectRecipe: (id: number) => void, onAddNew: () => void }> = ({ onSelectRecipe, onAddNew }) => {
    const BrewMethodIcons = {
        "Regular Cup": RegularCupIcon,
        // ... other icons
    };

    const getBrewIcon = (methodName: string) => {
        return BrewMethodIcons[methodName as keyof typeof BrewMethodIcons] || DefaultCoffeeIcon;
    };
    
    const testRecipes = [
        { id: 1, name: "Alan Adler", brewMethod: "Regular Cup" },
        { id: 2, name: "James Hoffmann", brewMethod: "Espresso" },
        // ... other recipes
    ];

    const navItems = [
        { name: 'Account', icon: User, href: '/account' },
        { name: 'Recipes', icon: BookOpen, href: '/recipes' },
        { name: 'Coffee', icon: Coffee, href: '/coffee' },
    ];


    return (
        <div> 
            <div className="flex flex-col h-full">
                <header className="p-4">
                    <h1 className="text-3xl font-bold">Recipes</h1>
                    {/* Search is offset only by spaces, typed text not offset */}
                    <input
                        type="search"
                        placeholder="Search"
                        className="mt-4 text-gray-700 bg-stone-200"
                    />
                    {/* PLACEHOLDER FILTERS */}
                    <div className="flex space-x-2 mt-3">
                        <button className="px-4 py-1 text-sm bg-stone-200 border border-gray-300 hover:bg-gray-200">All</button>
                        <button className="px-4 py-1 text-sm border border-gray-300 hover:bg-gray-200">Regular Cup</button>
                        <button className="px-4 py-1 text-sm border border-gray-300 hover:bg-gray-200">Espresso</button>
                        <button className="px-4 py-1 text-sm border border-gray-300 hover:bg-gray-200">Iced</button>
                    </div>
                </header>

                <main className="flex-grow overflow-y-auto p-4 space-y-2">
                    {testRecipes.map(recipe => (
                        <div
                        key={recipe.id}
                            //className="flex justify-between items-center p-3 bg-white hover:bg-gray-50 rounded-lg cursor-pointer border-b border-gray-100"
                            className="flex items-center p-3 bg-white hover:bg-gray-50 rounded-lg cursor-pointer border-b border-gray-100"
                            onClick={() => onSelectRecipe(recipe.id)}
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
                    ))}

                    {/* ADD BUTTON */}
                    <button 
                        className="absolute bottom-20 right-8 w-14 h-14 rounded-full hover:bg-gray-600 bg-stone-500 bg-accent-brown text-white shadow-lg 
                                flex items-center justify-center"
                        onClick={onAddNew}
                    >
                        <svg 
                            className="w-8 h-8" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg" //CHANGE FOR 
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                    </button>
                </main>

            </div>

            {/* NAV BAR */}
            <footer className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-2xl border-t border-gray-100">
                <div className="flex justify-around items-center h-full text-stone-500">
                    {navItems.map((item) => {
                        const IconComponent = item.icon;
                        
                        return (
                            <a 
                                key={item.name} 
                                href={item.href} 
                                className="flex flex-col items-center justify-center h-full w-1/3 text-stone-300 hover:text-stone-500 transition-colors duration-200"
                            >
                                <IconComponent className="w-6 h-6" />
                                <span className="text-xs mt-1 font-semibold">{item.name}</span>
                            </a>
                        );
                    })}
                </div>
            </footer>
        </div>
    )
}

// NEW RECIPE
const NewRecipe: React.FC<{ onCancel: () => void, onSave: (newRecipe: Partial<Recipe>) => void }> = ({ onCancel, onSave }) => {
  // State for form fields (e.g., name, dose, water amount, steps...)

  const handleSave = () => {
    // Collect form data (omitted for brevity)
    const newRecipe: Partial<Recipe> = { name: "My Recipe", dose: 1, waterAmount: 250, steps: [] };
    onSave(newRecipe);
  };

  return (
    <div className="p-4 h-full overflow-y-auto">
      <header className="flex justify-between items-center pb-4 border-b">
        <button onClick={onCancel} className="text-lg text-gray-600 hover:text-stone-500">Cancel</button>
        <h2 className="text-xl font-bold">New Recipe</h2>
        <button onClick={handleSave} className="text-lg font-semibold text-amber-600 hover:text-amber-700">Save</button>
      </header>

      <form className="mt-6 space-y-6">
        <label className="block">
          <span className="text-gray-700 font-medium">Name</span>
          <input type="text" placeholder="My Recipe" className={`${inputStyle} mt-1`} />
        </label>

        {/* Dose Selection */}
        <div className="space-y-2">
          <span className="text-gray-700 font-medium">Dose</span>
          <div className="flex space-x-2">
            {['1 Shot', '2 Shots', '3 Shots'].map(dose => (
              <button key={dose} type="button" className={secondaryButton}>{dose}</button>
            ))}
          </div>
        </div>

        {/* Water Amount */}
        <label className="block">
          <span className="text-gray-700 font-medium">Water Amount</span>
          <input type="number" className={`${inputStyle} mt-1`} />
        </label>

        {/* Grind Size Selection */}
        <div className="space-y-2">
          <span className="text-gray-700 font-medium">Grind Size</span>
          <div className="grid grid-cols-3 gap-2 mt-1">
            {['Extra Fine', 'Fine', 'Medium', 'Coarse', 'Extra Coarse'].map(size => (
              <button key={size} type="button" className={secondaryButton}>{size}</button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="pt-4 space-y-4">
          <h3 className="text-xl font-bold">Steps</h3>
          {/* Loop over state steps here */}
          <div className="flex items-center space-x-2">
            <span className="font-semibold">1)</span>
            <input type="text" placeholder="Step 1" className={inputStyle} />
            <button type="button" className="text-sm text-amber-600 whitespace-nowrap">Add Time...</button>
          </div>
          {/* CHANGE TO SVG - Add Step button */}
          <button type="button" className="w-10 h-10 bg-stone-500 text-white rounded-full text-2xl font-light">+</button>
        </div>
      </form>
    </div>
  );
};

// RECIPE INSTRUCTIONS
const RecipeInstructions: React.FC<{ recipe: Recipe, onBack: () => void, onEdit: () => void }> = ({ recipe, onBack, onEdit }) => {
  // Mock data for the instructions view
  const exampleRecipe = {
    name: "Alan Adler",
    description: "Description...",
    dose: 16,
    grind: "Fine Grind",
    temp: 176,
    steps: [
      { description: "Add 16 g of ground coffee to the brew chamber" },
      { description: "Give a gentle shake to level the grounds" },
      { description: "Pour water up to about 1.5 on the chamber" },
      { description: "Stir using the paddle", time: "0:10" },
      { description: "Insert the plunger and press gently, pausing when you meet resistance" },
      { description: "Stop once the plunger reaches the grounds" },
      { description: "Add additional hot water to the cup, to taste" },
    ]
  };

  const handleEdit = () => {
    // EDIT
    onEdit()
  }

  return (
    <div className="p-4 h-full overflow-y-auto">
      <header className="flex justify-between items-center pb-4 border-b">
        <button onClick={onBack} className="text-lg text-gray-600 hover:text-stone-500 mr-4">Back</button>
        <h2 className="text-xl font-bold">Recipe Instructions</h2>
        <button onClick={handleEdit} className="text-lg font-semibold text-amber-600 hover:text-amber-700">Edit</button>
      </header>

      <main className="mt-4">
        <h1 className="text-3xl font-bold">{exampleRecipe.name}</h1>
        <p className="mt-2 text-gray-700 text-sm leading-relaxed">{exampleRecipe.description}</p>

        {/* Core Recipe Details - Styled with Tailwind Icons flex flex-col items-center justify-center*/}
        <div className="flex justify-around items-center my-6 p-4 bg-stone-200 rounded-lg shadow-inner">
          <div className="text-center flex flex-col items-center">
            <Scale/>
            <p className="font-bold text-xl">{exampleRecipe.dose}g</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <Bean/>
            <p className="font-bold text-xl">{exampleRecipe.grind}</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <Thermometer/>
            <p className="font-bold text-xl">{exampleRecipe.temp}°F</p>
            <p className="text-xs text-gray-500">80°C</p>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Steps</h3>
          {exampleRecipe.steps.map((step, index) => (
            <div key={index} className="flex items-start">
              <span className="w-6 h-6 flex-shrink-0 mr-3 text-center rounded-full bg-stone-500 text-white text-sm font-bold pt-0.5">{index + 1}</span>
              <p className="flex-grow text-gray-800">{step.description}</p>
              {step.time && <span className="ml-4 text-sm font-mono p-1 bg-gray-100 rounded">{step.time}</span>}
            </div>
          ))}
        </div>

        <button className="mt-6 text-amber-600 font-semibold hover:text-amber-700">Log Results &gt;</button>
      </main>
    </div>
  );
};

// STAGE MANAGEMENT
const RecipesPage: React.FC = () => {
  type View = 'list' | 'new' | 'instructions' | 'edit';
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

  // FETCH RECIPE DATA
  const getSelectedRecipe = (): Recipe | null => {
    // PLACEHOLDER
    return selectedRecipeId ? ({
      id: 1, name: "Alan Adler", brewMethod: "Regular Cup", dose: 16, waterAmount: 250, grindSize: 'Fine', steps: []
    } as Recipe) : null;
  };

  const handleSelectRecipe = (id: number) => {
    setSelectedRecipeId(id);
    setCurrentView('instructions');
  };

  // UNFINISHED
  const handleEditRecipe = () => {
    setCurrentView('edit')
  }

  // SAVE RECIPE DATA
  const handleSaveNewRecipe = (newRecipe: Partial<Recipe>) => {
    console.log("Saving recipe:", newRecipe);
    setCurrentView('list');
  };

  const renderView = () => {
    switch (currentView) {
      case 'new':
        return <NewRecipe onCancel={() => setCurrentView('list')} onSave={handleSaveNewRecipe} />;
      case 'instructions':
        const recipe = getSelectedRecipe();
        // ONEDIT() NOT COMPLETED
        return recipe ? <RecipeInstructions recipe={recipe} onBack={() => setCurrentView('list')} onEdit={() => setCurrentView('new')}/> : <p>Recipe not found.</p>;
      case 'list':
      default:
        return <RecipesList onSelectRecipe={handleSelectRecipe} onAddNew={() => setCurrentView('new')} />;
    }
  };

  return (
    // ARTIFICIAL MOBILE LOOK:
    //<div className="app-container max-w-sm mx-auto h-screen shadow-2xl bg-gray-100">
    <div className="app-container w-screen mx-auto h-screen shadow-2xl bg-gray-100">
      {/* PWA consideration: The 'h-screen' and limited width helps mimic a mobile PWA look. */}
      {renderView()}
    </div>
  );
};

export default RecipesPage;