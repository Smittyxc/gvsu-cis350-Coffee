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
  const { recipe_name, dose_grams, grind_size, steps = [] } = r; //deleted waterAmount

  const handleBack = () => navigate('/recipes');
  const handleEdit = () => navigate(`/recipes/${recipeId}/edit`);

  const getCelsius = (f: number) => Math.round((f - 32) * 5 / 9);

  return (
    <div className="p-4 h-full overflow-y-auto">
      <header className="flex justify-between items-center pb-4 border-b border-white">
        <button onClick={handleBack} className="text-lg text-ctext hover:white mr-4">Back</button>
        <h2 className="text-xl text-white font-bold">Recipe Instructions</h2>
        <button onClick={handleEdit} className="text-lg font-semibold text-caction hover:text-cactionHover">Edit</button>
      </header>

      <main className="mt-4">
        <h1 className="text-3xl text-white font-bold">{recipe_name}</h1>

        {/* Core Recipe Details */}
        <div className="flex justify-around items-center my-6 p-4 bg-cbg2 rounded-lg shadow-inner">
          <div className="text-center flex flex-col items-center">
            <Scale color={`var(--color-cltext)`}/>
            <p className="font-bold text-xl text-ctext">{dose_grams}g</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <Bean color={`var(--color-cltext)`}/>
            <p className="font-bold text-xl text-ctext">{grind_size}</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <Thermometer color={`var(--color-cltext)`}/>
            <p className="font-bold text-xl text-ctext">176°F</p>
            <p className="text-xs text-cnote">{getCelsius(176)}°C</p>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-4">
          <h3 className="text-xl text-white font-bold">Steps</h3>
          {(steps ?? []).map((step, index) => (
            <div key={index} className="flex items-start">
              <span className="w-6 h-6 flex-shrink-0 mr-3 text-center rounded-full bg-cnote text-white text-sm font-bold pt-0.5">{index + 1}</span>
              <p className="flex-grow text-ctext">{step.description}</p>
              {step.time && <span className="ml-4 text-sm text-cltext font-mono p-1 bg-cbg3 rounded">{step.time}</span>}
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <Link to="/brewresults">
            <button className="mt-6 text-caction font-semibold hover:text-cactionHover">Log Results &gt;</button>
          </Link>
          <Link to="/timer">
            <button className="mt-6 text-caction font-semibold hover:text-cactionHover">Use Recipe &gt;</button>
          </Link>
        </div>
      </main>


      <button
        onClick={handleEdit}
        className={`
    fixed left-1/2 -translate-x-1/2
    bottom-13
    bg-caction
    px-16 py-3 pb-10
    rounded-t-xl
    animate-[slide-up-fab_0.5s_ease-out_forwards]
    
    transition duration-300 ease-in-out
    hover:scale-105
    shadow-lg
  `}
      >
        <span className='text-white font-semibold'>Edit</span>
      </button>
    </div>
  );
};
