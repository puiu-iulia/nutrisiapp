export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  image: string;
}

export interface RecipeData {
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  image: string;
}
