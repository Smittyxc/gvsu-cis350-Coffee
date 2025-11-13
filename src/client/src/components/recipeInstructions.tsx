import React, {useEffect, useState} from 'react';
import { Recipe } from '@/lib/recipeData';
import { Scale, Thermometer, Bean } from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from "@/context/AuthContext.tsx"

const RECIPE_DB: Record<string, Recipe> = {
    "1": {
        recipe_name: "Alan Adler",
        dose_grams: 16,
        water_amount: 240,
        grind_size: 'Fine',
        steps: [
            { description: "Add 16 g of ground coffee to the brew chamber" },
            { description: "Give a gentle shake to level the grounds" },
            { description: "Pour water up to about 1.5 on the chamber" },
            { description: "Stir using the paddle", time: "0:10" },
            { description: "Insert the plunger and press gently, pausing when you meet resistance" },
            { description: "Stop once the plunger reaches the grounds" },
            { description: "Add additional hot water to the cup, to taste" },
        ]
    },
    "2": {
        recipe_name: "James Hoffmann",
        dose_grams: 18,
        water_amount: 36,
        grind_size: 'Medium',
        steps: [
            { description: "Add 16 g of ground coffee to the brew chamber" },
            { description: "Give a gentle shake to level the grounds" },
            { description: "Pour water up to about 1.5 on the chamber" },
            { description: "Stir using the paddle", time: "0:10" },
            { description: "Insert the plunger and press gently, pausing when you meet resistance" },
            { description: "Stop once the plunger reaches the grounds" },
            { description: "Add additional hot water to the cup, to taste" },
        ]
    }
    // ... add more recipes
};

export const RecipeInstructions: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>(); // ID FROM URL
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();

  const handleAddNew = () => {
    navigate("/recipes/recipeNew");
  };

  

  useEffect(() => {
    if (recipeId == "1" || recipeId == "2") {
    console.log("hello world");
    setRecipe([RECIPE_DB[recipeId]]);
    setLoading(false);
  } else {
    const fetchRecipes = async () => {
      try {
        const token = session?.access_token;

        const resp = await fetch("http://localhost:5000/api/recipeFetch/" + recipeId, {
          headers: {
            Authorization: `Bearer ${token ?? ""}`,
          },
        });

        if (!resp.ok) {
          const msg = await resp.text();
          throw new Error(msg || `Failed with status ${resp.status}`);
        }

        const data = await resp.json();

        // Normalize to an array (handles object OR array responses)
        setRecipe(Array.isArray(data) ? data : (data ? [data] : []));
      } catch (err: any) {
        console.error("Error fetching recipes:", err);
        setError(err.message || "Failed to load recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
    }
  }, []);

  if (!recipeId) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold text-red-600">Invalid URL</h2>
        <p>No recipe ID was provided in the URL.</p>
        <button onClick={() => navigate('/recipes')} className="mt-4 text-amber-600">Go Back to List</button>
      </div>
    );
  }

  // Loading + Error states
  if (loading) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-600">Loading…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold text-red-600">Error</h2>
        <p className="text-gray-700">{error}</p>
        <button onClick={() => navigate('/recipes')} className="mt-4 text-amber-600">Go Back to List</button>
      </div>
    );
  }

  // Not found when the array is empty
  if (recipe.length === 0) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold text-red-600">Recipe Not Found</h2>
        <p>Could not find a recipe with ID: {recipeId}</p>
        <button onClick={() => navigate('/recipes')} className="mt-4 text-amber-600">Go Back to List</button>
      </div>
    );
  }

  // Destructure the first (and only) recipe
  const r = recipe[0]!;
  const { recipe_name, dose_grams, water_amount, grind_size, steps = [] } = r;

  const handleBack = () => navigate('/recipes');
  const handleEdit = () => navigate(`/recipes/${recipeId}/edit`);

  const getCelsius = (f: number) => Math.round((f - 32) * 5 / 9);

  return (
    <div className="p-4 h-full overflow-y-auto">
      <header className="flex justify-between items-center pb-4 border-b">
        <button onClick={handleBack} className="text-lg text-gray-600 hover:text-stone-500 mr-4">Back</button>
        <h2 className="text-xl font-bold">Recipe Instructions</h2>
        <button onClick={handleEdit} className="text-lg font-semibold text-amber-600 hover:text-amber-700">Edit</button>
      </header>

      <main className="mt-4">
        <h1 className="text-3xl font-bold">{recipe_name}</h1>

        {/* Core Recipe Details */}
        <div className="flex justify-around items-center my-6 p-4 bg-stone-200 rounded-lg shadow-inner">
          <div className="text-center flex flex-col items-center">
            <Scale />
            <p className="font-bold text-xl">{dose_grams}g</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <Bean />
            <p className="font-bold text-xl">{grind_size}</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <Thermometer />
            <p className="font-bold text-xl">176°F</p>
            <p className="text-xs text-gray-500">{getCelsius(176)}°C</p>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Steps</h3>
          {(steps ?? []).map((step, index) => (
            <div key={index} className="flex items-start">
              <span className="w-6 h-6 flex-shrink-0 mr-3 text-center rounded-full bg-stone-500 text-white text-sm font-bold pt-0.5">{index + 1}</span>
              <p className="flex-grow text-gray-800">{step.description}</p>
              {step.time && <span className="ml-4 text-sm font-mono p-1 bg-gray-100 rounded">{step.time}</span>}
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <Link to="/brewresults">
            <button className="mt-6 text-amber-600 font-semibold hover:text-amber-700">Log Results &gt;</button>
          </Link>
          <Link to="/timer">
            <button className="mt-6 text-amber-600 font-semibold hover:text-amber-700">Use Recipe &gt;</button>
          </Link>
        </div>
      </main>
    </div>
  );
};
