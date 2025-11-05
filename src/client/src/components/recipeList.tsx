import React, {useEffect, useState} from 'react';
import { RecipeListItem } from './recipeListItem';
import { TabBar } from './ui/tabBar';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.tsx"
// import { BookOpen, Coffee, User } from 'lucide-react'; 

const testRecipes = [
    { id: 1, name: "Alan Adler", brewMethod: "Regular Cup" },
    { id: 2, name: "James Hoffmann", brewMethod: "Espresso" },
    { id: 3, name: "Cold Brew Overnight", brewMethod: "Iced" },
];

type RecipeSummary = {id: number; name: string, brewMethod: string}; 

export const RecipesList: React.FC = () => {
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { session } = useAuth();

    const handleAddNew = () => {
        navigate("/recipes/recipeNew");
    };

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
            const token = session?.access_token;

            const resp = await fetch("http://localhost:5000/api/recipes", {
            headers: {
                Authorization: `Bearer ${token ?? ""}`,
            },
            });

            if (!resp.ok) {
            const msg = await resp.text();
            throw new Error(msg || `Failed with status ${resp.status}`);
            }

            const data = await resp.json(); // { recipes: [...] }
            const dataAppended = data.recipes.map((i: any) => ({
                id: i.id,
                name: i.recipe_name,
                brewMethod: "Regular Cup",
            }));
            setRecipes(dataAppended || []);
        } catch (err: any) {
            console.error("Error fetching recipes:", err);
            setError(err.message || "Failed to load recipes");
        } finally {
            setLoading(false);
        }
        };

        fetchRecipes();
    }, []);

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
                    {['All', 'Pourover', 'Aeropress', 'Iced'].map(filter => (
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

            {loading && <p>Loading recipes...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && recipes.length === 0 && (
            <p className="text-gray-500">You don't have any recipes yet.</p>
            )}

            {!loading &&
          !error &&
          recipes.map((recipe) => (
            <Link
              to={`/recipes/${recipe.id}`}
              key={recipe.id}
              className="block"
            >
              <RecipeListItem recipe={recipe} />
            </Link>
          ))}

                {/* ADD BUTTON */}
                <button
                    className="absolute bottom-22 right-5 w-16 h-16 rounded-full hover:bg-gray-600 bg-stone-500 bg-accent-brown text-white shadow-lg flex items-center justify-center"
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