import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { Recipe, RecipeData } from '@/types/recipes';
import { RootState } from '../store';

export const recipeApiSlice = createApi({
  reducerPath: 'recipes',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Recipes', 'MealPlans', 'ShoppingList'],
  endpoints: (build) => ({
    createRecipe: build.mutation<Recipe, RecipeData>({
      query: (recipe) => ({
        url: 'recipes/recipes/',
        method: 'POST',
        body: recipe,
      }),
    }),
    getPuplicRecipes: build.query<Recipe[], void>({
      query: () => ({
        url: 'recipes/public',
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Recipes' as const,
                id,
              })),
              { type: 'Recipes', id: 'LIST' },
            ]
          : [{ type: 'Recipes', id: 'LIST' }],
    }),
    getRecipes: build.query<Recipe[], string>({
      query: (querySearch) => ({
        url: `recipes?query=${querySearch}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Recipes' as const,
                id,
              })),
              { type: 'Recipes', id: 'LIST' },
            ]
          : [{ type: 'Recipes', id: 'LIST' }],
    }),
    deleteRecipe: build.mutation<void, any>({
      query: (id) => ({
        url: `recipes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Recipes', 'MealPlans'],
    }),
    // updateRecipe: build.mutation<
    //   Recipe,
    //   { id: number; recipe: RecipeData }
    // >({
    //   query: ({ id, recipe }) => ({
    //     url: `recipes/recipes/${id}/`,
    //     method: 'PATCH',
    //     body: recipe,
    //   }),
    //   invalidatesTags: ['Recipes', 'MealPlans'],
    // }),
    uploadRecipeImage: build.mutation<any, any>({
      query: ({ file, recipeId }) => ({
        url: `recipes/${recipeId}/photo`,
        method: 'PUT',
        body: file,
      }),
      invalidatesTags: ['Recipes'],
    }),
    getRecipeById: build.query<any, any>({
      query: (id) => ({
        url: `/recipes/${id}`,
        method: 'GET',
      }),
      providesTags: ['Recipes'],
    }),
    generateRecipe: build.mutation<any, any>({
      query: (ingredients) => ({
        url: 'recipes/generate/',
        method: 'POST',
        body: ingredients,
      }),
      //@ts-ignore
      invalidatesTags: ['Recipes'],
    }),
  }),
});

export const {
  useCreateRecipeMutation,
  useGetRecipesQuery,
  useDeleteRecipeMutation,
  // useUpdateRecipeMutation,
  useGetRecipeByIdQuery,
  useGenerateRecipeMutation,
  useGetPuplicRecipesQuery,
  useUploadRecipeImageMutation,
} = recipeApiSlice;
