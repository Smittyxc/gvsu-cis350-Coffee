// Working
import { BookOpen, Coffee, User } from 'lucide-react';
import DefaultCoffeeIcon from '/icons/coffee.svg';
import RegularCupIcon from '/icons/icon-72x72.png';

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

export function RecipeOverview() {
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
                        placeholder="  Search"
                        className="mt-4 text-gray-700 bg-stone-200"
                    />
                    {/* Filters - React Placeholder */}
                    <div className="flex space-x-2 mt-3">
                        <button className="px-4 py-1 text-sm bg-stone-200 border border-gray-300">All</button>
                        <button className="px-4 py-1 text-sm border border-gray-300">Regular Cup</button>
                        <button className="px-4 py-1 text-sm border border-gray-300">Espresso</button>
                        <button className="px-4 py-1 text-sm border border-gray-300">Iced</button>
                    </div>
                </header>

                <main className="flex-grow overflow-y-auto p-4 space-y-2">
                    {testRecipes.map(recipe => (
                        <div
                        key={recipe.id}
                            //className="flex justify-between items-center p-3 bg-white hover:bg-gray-50 rounded-lg cursor-pointer border-b border-gray-100"
                            className="flex items-center p-3 bg-white hover:bg-gray-50 rounded-lg cursor-pointer border-b border-gray-100"
                            //Move to recipe details
                            //onClick={() => onSelectRecipe(recipe.id)}
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
                        
                        {/* Right Arrow Icon */}
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </div>
                    ))}

                    {/* Floating Add Button */}
                    <button 
                        className="absolute bottom-20 right-8 w-14 h-14 rounded-full bg-stone-500 bg-accent-brown text-white shadow-lg 
                                flex items-center justify-center"
                        //onClick={onAddNew}
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

            {/* Nav Bar */}
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
 
            {/* DELETE - Dev Purpose*/}
            <footer>
                <br></br>
                <h6>Jumper</h6>
                <pre>
                    <a href="/recipes">Recipes</a>
                    <a href="/recipes/new"> NewRecipes</a>
                    <a href="/recipes/instructions"> RecipeInstruction</a>
                </pre>
            </footer>
        </div>
    )
}