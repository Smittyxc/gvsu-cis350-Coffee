export type GrindSize = 'Extra Fine' | 'Fine' | 'Medium' | 'Coarse' | 'Extra Coarse';

export interface RecipeStep {
  description: string;
  time?: string;
}

export interface Recipe {
  id: number;
  name: string;
  dose: number;
  brewMethod: string;
  waterAmount: number;
  grindSize: GrindSize;
  temp: number;
  description?: string;
  steps: RecipeStep[];
}

export interface RecipeStep {
  description: string;
  time?: string; // optional
}