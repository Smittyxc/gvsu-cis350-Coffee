import React from 'react';
import { Recipe } from '@/lib/recipeData';
import { Scale, Thermometer, Bean } from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// PLACEHOLDER DATA
const RECIPE_DB: Record<string, Recipe> = {
    "1": {
        id: 1,
        name: "Alan Adler",
        brewMethod: "Regular Cup",
        dose: 16,
        waterAmount: 240,
        grindSize: 'Fine',
        description: "A simple, clean-tasting brew method from the inventor of the AeroPress.",
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
    },
    "2": {
        id: 2,
        name: "James Hoffmann",
        brewMethod: "Espresso",
        dose: 18,
        waterAmount: 36,
        grindSize: 'Medium',
        description: "A complex, but highly rewarding espresso-style brew.",
        temp: 195,
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

    // USE RECIPEID TO FETCH DATA INSTEAD OF PLACEHOLDER
    console.log("Viewing recipe ID:", recipeId);

    if (!recipeId) {
        return (
            <div className="p-4 text-center">
                <h2 className="text-xl font-bold text-red-600">Invalid URL</h2>
                <p>No recipe ID was provided in the URL.</p>
                <button onClick={() => navigate('/recipes')} className="mt-4 text-amber-600">Go Back to List</button>
            </div>
        );
    }

    const recipe = RECIPE_DB[recipeId]; // USE PLACEHOLDER DISPLAY

    if (!recipe) {
        return (
            <div className="p-4 text-center">
                <h2 className="text-xl font-bold text-red-600">Recipe Not Found</h2>
                <p>Could not find a recipe with ID: {recipeId}</p>
                <button onClick={() => navigate('/recipes')} className="mt-4 text-amber-600">Go Back to List</button>
            </div>
        );
    }

    const { name, dose, grindSize, description, temp, steps } = recipe;

    const handleBack = () => navigate('/recipes');
    const handleEdit = () => navigate(`/recipes/${recipeId}/edit`);

    const getCelsius = (f: number) => Math.round((f - 32) * 5 / 9);

    return (
        <div className="p-4 h-full overflow-y-auto">
            <header className="flex justify-between items-center pb-4 border-b">
                <button onClick={handleBack} className="text-lg text-ctext hover:white mr-4">Back</button>
                <h2 className="text-xl text-white font-bold">Recipe Instructions</h2>
                <button onClick={handleEdit} className="text-lg font-semibold text-caction hover:text-cactionHover">Edit</button>
            </header>

            <main className="mt-4">
                <h1 className="text-3xl text-white font-bold">{name}</h1>
                <p className="mt-2 text-cltext text-sm leading-relaxed">{description}</p>

                {/* Core Recipe Details */}
                <div className="flex justify-around items-center my-6 p-4 bg-cbg2 rounded-lg shadow-inner">
                    <div className="text-center flex flex-col items-center">
                        <Scale />
                        <p className="font-bold text-xl text-ctext">{dose}g</p>
                    </div>
                    <div className="text-center flex flex-col items-center">
                        <Bean />
                        <p className="font-bold text-xl text-ctext">{grindSize}</p>
                    </div>
                    <div className="text-center flex flex-col items-center">
                        <Thermometer />
                        <p className="font-bold text-xl text-ctext">{temp}°F</p>
                        <p className="text-xs text-cnote">{getCelsius(temp)}°C</p>
                    </div>
                </div>

                {/* Steps List */}
                <div className="space-y-4">
                    <h3 className="text-xl text-white font-bold">Steps</h3>
                    {steps.map((step, index) => (
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
        </div>
    );
};