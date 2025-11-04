export type GrindSize = 'Extra Fine' | 'Fine' | 'Medium' | 'Coarse' | 'Extra Coarse';

export interface RecipeStep {
  description: string;
  time?: string;
}

export interface Recipe {
  recipe_name: string;
  dose_grams: number;
  // brew_method: string;
  water_amount: number;
  grind_size: GrindSize;
  steps: RecipeStep[];
}

export interface RecipeStep {
  description: string;
  time?: string; // optional
}