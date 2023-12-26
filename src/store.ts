import { configureStore } from "@reduxjs/toolkit";

import recipeReducer from "./features/recipe/recipeReducer";
import recipesReducer from "./features/recipes/recipesReducer";

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    recipe: recipeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type AppSelector = ReturnType<typeof store.getState>;

export default store;
