import React, { use } from 'react';
import { RecipeListItem } from './recipeListItem';
import { TabBar } from './ui/tabBar';
import { Link, useNavigate } from "react-router-dom";
// import { BookOpen, Coffee, User } from 'lucide-react'; 

const testRecipes = [
    { id: 1, name: "Alan Adler", brewMethod: "Regular Cup" },
    { id: 2, name: "James Hoffmann", brewMethod: "Espresso" },
    { id: 3, name: "Cold Brew Overnight", brewMethod: "Iced" },
];

export const RecipesList: React.FC = () => {
    const navigate = useNavigate();

    const handleAddNew = () => {
        navigate("/recipes/recipeNew");
    };

    return (
        <div className="flex flex-col h-full">
            <header className="p-4">
                <h1 className="text-3xl font-bold">Recipes</h1>
                <input
                    type="search"
                    placeholder="Search"
                    className="mt-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-700 bg-stone-200"
                />
                <div className="flex space-x-2 mt-3 overflow-x-auto pb-2">
                    {['All', 'Regular Cup', 'Espresso', 'Iced'].map(filter => (
                        <button
                            key={filter}
                            className="flex-shrink-0 px-4 py-1 text-sm bg-stone-200 border border-gray-300 hover:bg-gray-200 rounded"
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </header>

            <main className="flex-grow overflow-y-auto p-4 space-y-2 mb-16">
                {testRecipes.map(recipe => (
                    <Link
                        to={`/recipes/${recipe.id}`}
                        key={recipe.id}
                        className="block"
                    >
                        <RecipeListItem
                            recipe={recipe}
                        />
                    </Link>
                ))}

                {/* ADD BUTTON */}
                <button
                    className="absolute bottom-20 right-8 w-14 h-14 rounded-full hover:bg-gray-600 bg-stone-500 bg-accent-brown text-white shadow-lg flex items-center justify-center"
                    onClick={handleAddNew}
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                </button>
            </main>
            <TabBar />
        </div>
    );
}