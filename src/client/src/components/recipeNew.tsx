import React, { useState } from 'react';
import { Recipe, RecipeStep, GrindSize } from '@/lib/recipeData';
import { Button } from './ui/button-2';
import { Input } from './ui/input-2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/context/AuthContext.tsx"

export const NewRecipe: React.FC = () => {
  const navigate = useNavigate();

  const [recipeName, setRecipeName] = useState('');
  const [dose, setDose] = useState<number | ''>('');
  const [waterAmount, setWaterAmount] = useState<number | ''>('');
  const [grindSize, setGrindSize] = useState<GrindSize | null>('Medium');
  const { session } = useAuth();
  // ... state for steps

  const [steps, setSteps] = useState<RecipeStep[]>([
    { description: '', time: '' } // START EMPTY
  ]);

  const handleStepChange = (index: number, field: keyof RecipeStep, value: string) => {
    const newSteps = steps.map((step, i) => {
      if (i === index) {
        return { ...step, [field]: value };
      }
      return step;
    });
    setSteps(newSteps);
  };

  const handleAddStep = () => {
    console.log("Add new step");
    setSteps([...steps, { description: '', time: '' }]);
  };

  const handleSave = async () => {
    // Basic validation and data collection
    if (!recipeName || !waterAmount || !grindSize) {
      alert("Please fill out all required fields.");
      return;
    }

    const newRecipe: Partial<Recipe> = {
      recipe_name: recipeName,
      dose_grams: dose as number,
      water_amount: waterAmount as number,
      grind_size: grindSize as GrindSize,
      // brew_method: "Regular Cup", // Placeholder
      steps: steps, // Placeholder for step state
    };
    console.log("Saving recipe:", newRecipe);

    try {
    const token = session?.access_token;

    const response = await fetch("http://localhost:5000/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(newRecipe),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }

    const savedRecipe = await response.json();
    console.log("Recipe saved successfully:", savedRecipe);

    // Optionally update local state or context with new recipe
    // updateRecipes(savedRecipe);

    navigate("/recipes");
  } catch (error) {
    console.error("Error saving recipe:", error);
    alert("Failed to save recipe. Please try again.");
  }

  };

  const handleCancel = () => {
    navigate('/recipes'); // MAIN RECIPE LIST PAGE
  };

  const grindOptions: GrindSize[] = ['Extra Fine', 'Fine', 'Medium', 'Coarse', 'Extra Coarse'];

  return (
    <div className="p-4 h-full overflow-y-auto">
      <header className="flex justify-between items-center pb-4 border-b">
        {/* handleCancel */}
        <button onClick={handleCancel} className="text-lg text-ctext hover:text-white">Cancel</button>
        <h2 className="text-xl font-bold text-white">New Recipe</h2>
        {/* handleSave */}
        <button onClick={handleSave} className="text-lg font-semibold text-caction hover:text-cactionHover">Save</button>
      </header>

      <form className="mt-6 space-y-6">
        <label className="block">
          <span className="text-white font-medium">Name</span>
          <Input
            type="text"
            placeholder="My Recipe"
            className="mt-1"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
        </label>

        {/* Dose Selection
        <div className="space-y-2">
          <span className="text-gray-700 font-medium">Dose</span>
          <div className="flex space-x-2">
            {[1, 2, 3].map(shot => (
              <Button
                key={shot}
                type="button"
                variant={dose === shot ? 'primary' : 'secondary'}
                onClick={() => setDose(shot)}
              >
                {shot} Shot{shot > 1 ? 's' : ''}
              </Button>
            ))}
          </div>
        </div> */}

      {/* Water Amount & Dose*/}
      <div className="flex gap-6">
        <label className="block">
          <span className="text-white font-medium">Water Amount (mL)</span>
          <Input
            type="number"
            className="mt-1"
            value={waterAmount}
            onChange={(e) => setWaterAmount(parseInt(e.target.value) || '')}
          />
        </label>
        <label className="block">
          <span className="text-white font-medium">Dose (g)</span>
          <Input
            type="number"
            className="mt-1"
            value={dose}
            onChange={(e) => setDose(parseInt(e.target.value) || '')}
          />
        </label>
      </div>

        {/* Grind Size Selection */}
        <div className="space-y-2">
          <span className="text-white font-medium">Grind Size</span>
          <div className="grid grid-cols-3 gap-2 mt-1">
            {grindOptions.map(size => (
              <Button
                key={size}
                type="button"
                variant={grindSize === size ? 'dark' : 'dark2'}
                onClick={() => setGrindSize(size)}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="pt-4 space-y-4">
          <h3 className="text-xl text-white font-bold">Steps</h3>

          {/*
          <div className="flex items-center space-x-2">
            <span className="font-semibold">1)</span>
            <Input type="text" placeholder="Step 1" />
            <button type="button" className="text-sm text-amber-600 whitespace-nowrap">Add Time...</button>
          </div>

          {/* ADD BUTTON 
          <button
            className="w-8 h-8 rounded-full hover:bg-gray-600 bg-stone-500 bg-accent-brown text-white text-2xl shadow-lg flex items-center justify-center"
            onClick={handleAddStep}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
          */}

          {steps.map((step, index) => (
            <div key={index} className="flex flex-col space-y-2 text-white">
              <div className="flex items-center space-x-2">
                <span className="font-semibold w-5 flex-shrink-0 text-center text-cltext">{index + 1})</span>

                {/* STEP DESCRIPTION */}
                <Input 
                    type="text" 
                    placeholder={`Step ${index + 1} Description`} 
                    value={step.description}
                    onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                />
              </div>

              {/* STEP TIME */}
              <div className='flex items-center space-x-2 ml-7'>
                <span className='text-sm text-ctext'>Time (MM:SS)</span>
                <Input 
                    type="text" 
                    placeholder="e.g., 0:30"
                    className="w-24 text-sm"
                    value={step.time || ''}
                    onChange={(e) => handleStepChange(index, 'time', e.target.value)}
                />
              </div>
            </div>
          ))}

          {/* ADD STEP BUTTON */}
          <button
            type="button"
            className="w-8 h-8 rounded-full hover:bg-chover bg-cbg3 text-white text-2xl shadow-lg flex items-center justify-center mt-4"
            onClick={handleAddStep}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>

        </div>
      </form>
    </div>
  );

};