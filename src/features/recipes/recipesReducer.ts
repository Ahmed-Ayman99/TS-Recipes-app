import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe } from '../../shared/types';

interface Data {
  count: number;
  recipes: Recipe[];
}

interface InitialState {
  recipes: Recipe[];
  currentRecipes: Recipe[];
  bookmarks: Recipe[];

  currentPage: number;
  pageCount: number;
  limit: number;
  error: string;
  isLoading: boolean;
}

const getBookmarksFromLocalStorage = (): Recipe[] => {
  const bookmarksJSON = localStorage.getItem('forkifyRecipes');
  return bookmarksJSON ? JSON.parse(bookmarksJSON) : [];
};

const initialState: InitialState = {
  recipes: [],
  currentRecipes: [],
  bookmarks: getBookmarksFromLocalStorage(),
  currentPage: 1,
  pageCount: 1,
  limit: 10,
  error: '',
  isLoading: false,
};

const recipesReducer = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    loading(state) {
      state.error = '';
      state.isLoading = true;
    },
    error(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    getData(state, action: PayloadAction<Recipe[]>) {
      const start = (state.currentPage - 1) * state.limit;
      const end = state.currentPage * state.limit;

      state.error = '';
      state.isLoading = false;

      state.recipes = action.payload;
      state.pageCount = Math.ceil(state.recipes.length / state.limit);
      state.currentRecipes = state.recipes.slice(start, end);
    },
    getPrev(state) {
      state.currentPage -= 1;

      state.currentRecipes = state.recipes.slice(
        (state.currentPage - 1) * state.limit,
        state.currentPage * state.limit,
      );
    },
    getNext(state) {
      state.currentRecipes = state.recipes.slice(
        state.currentPage * state.limit,
        (state.currentPage + 1) * state.limit,
      );

      state.currentPage += 1;
    },
    Bookmarked(state, action: PayloadAction<Recipe>) {
      const existed =
        state.bookmarks.length &&
        state.bookmarks?.some(
          bookmark => bookmark?.recipe_id === action.payload.recipe_id,
        );

      state.bookmarks = existed
        ? state.bookmarks.filter(
            bookmark => bookmark.recipe_id !== action.payload.recipe_id,
          )
        : [...state.bookmarks, action.payload];
    },
  },
});

export const getRecipes = (query: string) => {
  return async dispatch => {
    try {
      dispatch({ type: 'recipes/loading' });

      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/search?q=${query}`,
      );

      if (!res.ok) throw new Error('Something went wrog');
      const data = (await res.json()) as Data;

      dispatch({ type: 'recipes/getData', payload: data.recipes });
    } catch (err) {
      if (err instanceof Error)
        dispatch({ type: 'recipes/error', payload: err.message });
    }
  };
};

export const { getPrev, getNext, Bookmarked } = recipesReducer.actions;
export const getRecipesState = state => state.recipes;

export default recipesReducer.reducer;
