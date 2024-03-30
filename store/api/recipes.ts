import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { Recipe, RecipeData } from '@/types/recipes';
import { RootState } from '../store';

const API_URL = 'http://192.168.0.101:3000/api/v1/';

export const recipeApiSlice = createApi({
  reducerPath: 'recipes',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      console.log(token);
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
    getPuplicRecipes: build.query<any, void>({
      query: () => ({
        url: 'recipes/public',
        method: 'GET',
      }),
      //   providesTags: (result) =>
      //     result
      //       ? [
      //           ...result.map(({ id }) => ({
      //             type: 'Recipes' as const,
      //             id,
      //           })),
      //           { type: 'Recipes', id: 'LIST' },
      //         ]
      //       : [{ type: 'Recipes', id: 'LIST' }],
    }),
    getRecipes: build.query<Recipe[], void>({
      query: () => ({
        url: 'recipes/recipes/',
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
    deleteRecipe: build.mutation<void, number>({
      query: (id) => ({
        url: `${id}/`,
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
    getRecipeById: build.query<Recipe, number>({
      query: (id) => ({
        url: `${id}/`,
        method: 'GET',
      }),
      providesTags: ['Recipes', 'MealPlans'],
    }),
    generateRecipe: build.mutation<any, any>({
      query: (ingredients) => ({
        url: 'recipes/generate/',
        method: 'POST',
        body: ingredients,
      }),
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
} = recipeApiSlice;
