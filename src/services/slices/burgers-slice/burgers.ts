import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
  createSelector
} from '@reduxjs/toolkit';
import type { TConstructorIngredient, TIngredient } from '@utils-types';
import ConstructorState from './type';
import { RootState } from '../../store';
import { orderBurgerApi } from '@api';

// Начальное состояние
export const initialState: ConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  loading: false,
  error: null
};

// Async thunk для отправки заказа
export const getOrderBurger = createAsyncThunk(
  'constructor/getOrderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

// Утилита перемещения ингредиентов
const moveIngredient = (
  ingredients: TConstructorIngredient[],
  from: number,
  to: number
): void => {
  const [moved] = ingredients.splice(from, 1);
  ingredients.splice(to, 0, moved);
};

// слайс для конструктора бургеров
const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredientToConstructor: {
      prepare: (item: TIngredient) => ({
        payload: { ...item, id: nanoid() }
      }),
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const item = action.payload;
        if (item.type === 'bun') state.constructorItems.bun = item;
        else state.constructorItems.ingredients.push(item);
      }
    },

    removeIngredientFromConstructor: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },

    moveIngredientUp: (state, action: PayloadAction<string>) => {
      const index = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload
      );
      if (index > 0) {
        moveIngredient(state.constructorItems.ingredients, index, index - 1);
      }
    },

    moveIngredientDown: (state, action: PayloadAction<string>) => {
      const index = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload
      );
      if (index < state.constructorItems.ingredients.length - 1)
        moveIngredient(state.constructorItems.ingredients, index, index + 1);
    },

    resetConstructor: (state) => {
      state.constructorItems = { bun: null, ingredients: [] };
    },

    setRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },

    resetModal: (state) => {
      state.orderModalData = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getOrderBurger.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(getOrderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.error = null;
        state.orderModalData = action.payload.order;
        state.constructorItems = { bun: null, ingredients: [] };
      })
      .addCase(getOrderBurger.rejected, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.error = action.error.message || 'Произошла ошибка';
      });
  }
});

// Селектор
const selectConstructor = (state: RootState): ConstructorState => state.burders;

export const getConstructorState = createSelector(
  [selectConstructor],
  ({ constructorItems }) => constructorItems
);

export const getOrderRequest = (state: RootState) =>
  selectConstructor(state).orderRequest;

export const getOrderModalData = (state: RootState) =>
  selectConstructor(state).orderModalData;

export const {
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  moveIngredientUp,
  moveIngredientDown,
  resetConstructor,
  setRequest,
  resetModal
} = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
