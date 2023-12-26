import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Recipe {}

interface InitialState {
  recipe: Recipe | null;
  isLoading: boolean;
  error: string;
}

const getRecipeFromLocalStorage = (): Recipe | null => {
  const bookmarksJSON = localStorage.getItem('recipe');

  return bookmarksJSON ? JSON.parse(bookmarksJSON) : null;
};

const initialState: InitialState = {
  recipe: getRecipeFromLocalStorage(),
  isLoading: false,
  error: '',
};

const recipeReducer = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    getData(state, action) {
      state.isLoading = false;
      state.error = '';
      state.recipe = action.payload;
    },
    loading(state) {
      state.error = '';
      state.isLoading = true;
    },
    getError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const getRecipe = (id: number) => {
  return async dispatch => {
    try {
      dispatch({ type: 'recipe/loading' });

      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/get?rId=${id}`,
      );

      if (!res.ok) throw new Error('Something went wrong');
      const data = (await res.json()) as { recipe: Recipe };

      dispatch({ type: 'recipe/getData', payload: data.recipe });
    } catch (err) {
      if (err instanceof Error)
        dispatch({ type: 'recipe/getError', payload: err.message });
    }
  };
};

export const getRecipeState = state => state.recipe;

export const { getError } = recipeReducer.actions;
export default recipeReducer.reducer;
