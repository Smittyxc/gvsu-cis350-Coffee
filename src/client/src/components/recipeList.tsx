import React, { useEffect, useState } from 'react';
import { RecipeListItem } from './recipeListItem';
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.tsx"
import { Skeleton } from "./ui/skeleton";
// import { BookOpen, Coffee, User } from 'lucide-react'; 

const testRecipes = [
    { id: 1, name: "Alan Adler", brewMethod: "Regular Cup" },
    { id: 2, name: "James Hoffmann", brewMethod: "Espresso" },
    { id: 3, name: "Cold Brew Overnight", brewMethod: "Iced" },
];

type RecipeSummary = { id: number; name: string, brewMethod: string };

export const RecipesList: React.FC = () => {
    // const navigate = useNavigate();

    const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { session } = useAuth();

    /*
    const handleAddNew = () => {
        navigate("/recipes/recipeNew");
    };
    */

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
            <div className="p-4 sm:p-8 text-white overflow-x-hidden w-full space-y-3">
                <div className="flex items-center justify-center p-4 bg-cbg2 rounded-lg border-t-4 border-caccent3">
                    <h1 className="text-3xl font-bold text-white">Recipes</h1>
                </div>

                <div className="w-7/8 mx-auto">
                    <input
                        type="search"
                        placeholder="Search"
                        className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:cbg3 text-ctext bg-cbg2"
                    />
                    <div className="flex space-x-2 mt-3 overflow-x-auto pb-2">
                        {['All', 'Pourover', 'Aeropress', 'Iced'].map(filter => (
                            <button
                                key={filter}
                                className="flex-shrink-0 px-4 py-1 hover:bg-chover text-cltext text-sm bg-cbg2 rounded"
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

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

                {/* <p className="text-cnote">Loading recipes...</p> */}
                {loading && (
                    <div className="flex flex-col w-4/5 pt-2 gap-4 justify-center items-center mx-auto">
                    <Skeleton className="h-10 w-full bg-gray-300" />
                    <Skeleton className="h-10 w-full bg-gray-300" />
                    <Skeleton className="h-10 w-full bg-gray-300" />
                    <Skeleton className="h-10 w-full bg-gray-300" />
                    <Skeleton className="h-10 w-full bg-gray-300" />
                    <Skeleton className="h-10 w-full bg-gray-300" />
                    </div>
                )}
                {error && <p className="text-cerror">Error: {error}</p>}
                {!loading && !error && recipes.length === 0 && (
                    <p className="text-cltext text-center">You don't have any recipes yet.</p>
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

                {/* ADD BUTTON
                <button
                    className="fixed bottom-22 right-5 w-16 h-16 rounded-full hover:bg-chover bg-cbg3 bg-accent-brown text-white shadow-lg flex items-center justify-center"
                    onClick={handleAddNew}
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                </button>
                */}
            </main>
        </div>
    );
}