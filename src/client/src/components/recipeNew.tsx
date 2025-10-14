import React, { useState } from 'react';
import { Recipe, GrindSize } from '@/lib/recipeData';
import { Button } from './ui/button-2';
import { Input } from './ui/input-2';
import { useNavigate } from 'react-router-dom';

export const NewRecipe: React.FC = () => {
  const navigate = useNavigate();

  const [recipeName, setRecipeName] = useState('');
  const [dose, setDose] = useState(1);
  const [waterAmount, setWaterAmount] = useState<number | ''>('');
  const [grindSize, setGrindSize] = useState<GrindSize | null>('Medium');
  // ... state for steps

  const [steps, setSteps] = useState<RecipeStep[]>([
    { description: '', time: '' } // Start with one empty step
  ]);

  // 💡 HANDLER: Update a specific step's description or time
  const handleStepChange = (index: number, field: keyof RecipeStep, value: string) => {
    const newSteps = steps.map((step, i) => {
      if (i === index) {
        // Use spread operator to safely update the specific field
        return { ...step, [field]: value };
      }
      return step;
    });
    setSteps(newSteps);
  };

  // 💡 HANDLER: Add a new step
  const handleAddStep = () => {
    console.log("Add new step");
    setSteps([...steps, { description: '', time: '' }]);
  };

  const handleSave = () => {
    // Basic validation and data collection
    if (!recipeName || !waterAmount || !grindSize) {
      alert("Please fill out all required fields.");
      return;
    }

    const newRecipe: Partial<Recipe> = {
      name: recipeName,
      dose: dose,
      waterAmount: waterAmount as number,
      grindSize: grindSize as GrindSize,
      brewMethod: "Regular Cup", // Placeholder
      steps: steps, // Placeholder for step state
    };
    console.log("Saving recipe:", newRecipe);
    // CALL STATE MANAGEMENT BEFORE NAV

    navigate('/recipes'); // MAIN RECIPE LIST PAGE
  };

  const handleCancel = () => {
    navigate('/recipes'); // MAIN RECIPE LIST PAGE
  };

  const grindOptions: GrindSize[] = ['Extra Fine', 'Fine', 'Medium', 'Coarse', 'Extra Coarse'];

  return (
    <div className="p-4 h-full overflow-y-auto">
      <header className="flex justify-between items-center pb-4 border-b">
        {/* handleCancel */}
        <button onClick={handleCancel} className="text-lg text-gray-600 hover:text-stone-500">Cancel</button>
        <h2 className="text-xl font-bold">New Recipe</h2>
        {/* handleSave */}
        <button onClick={handleSave} className="text-lg font-semibold text-amber-600 hover:text-amber-700">Save</button>
      </header>

      <form className="mt-6 space-y-6">
        <label className="block">
          <span className="text-gray-700 font-medium">Name</span>
          <Input
            type="text"
            placeholder="My Recipe"
            className="mt-1"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
        </label>

        {/* Dose Selection */}
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
        </div>

        {/* Water Amount */}
        <label className="block">
          <span className="text-gray-700 font-medium">Water Amount (mL)</span>
          <Input
            type="number"
            className="mt-1"
            value={waterAmount}
            onChange={(e) => setWaterAmount(parseInt(e.target.value) || '')}
          />
        </label>

        {/* Grind Size Selection */}
        <div className="space-y-2">
          <span className="text-gray-700 font-medium">Grind Size</span>
          <div className="grid grid-cols-3 gap-2 mt-1">
            {grindOptions.map(size => (
              <Button
                key={size}
                type="button"
                variant={grindSize === size ? 'primary' : 'secondary'}
                onClick={() => setGrindSize(size)}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="pt-4 space-y-4">
          <h3 className="text-xl font-bold">Steps</h3>

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
            <div key={index} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-semibold w-5 flex-shrink-0 text-center">{index + 1})</span>

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
                <span className='text-sm text-gray-500'>Time (MM:SS)</span>
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
            className="w-8 h-8 rounded-full hover:bg-gray-600 bg-stone-500 bg-accent-brown text-white text-2xl shadow-lg flex items-center justify-center mt-4"
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