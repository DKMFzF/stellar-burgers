import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { RootState } from '../../store';
import { IngredientsState } from './type';

// Начальное состояние
const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

// Thunk для загрузки ингредиентов
export const getIngredients = createAsyncThunk<TIngredient[], void>(
  'ingredients/getAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getIngredientsApi();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Слайс ингредиентов
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.ingredients = action.payload;
      });
  }
});

// Селектор состояния ингредиентов
export const getIngredientState = (state: RootState): IngredientsState =>
  state.ingredients;

export const ingredientReducer = ingredientsSlice.reducer;
