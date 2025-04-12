import {
  createAsyncThunk,
  createSelector,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import ConstructorState from './types';
import { RootState } from '../../store';
import { orderBurgerApi } from '@api';

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

export const getOrderBurger = createAsyncThunk(
  'user/newUserOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

const moveIngredient = (
  ingredients: TConstructorIngredient[],
  fromIndex: number,
  toIndex: number
) => {
  const [movedIngredient] = ingredients.splice(fromIndex, 1);
  ingredients.splice(toIndex, 0, movedIngredient);
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredientToConstructor: {
      prepare: (item: TIngredient) => {
        const id = nanoid();
        return { payload: { id, ...item } };
      },
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
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
      if (index < state.constructorItems.ingredients.length - 1) {
        moveIngredient(state.constructorItems.ingredients, index, index + 1);
      }
    },

    resetConstructor: (state) => {
      state.constructorItems.ingredients = [];
      state.constructorItems.bun = null;
    },

    setRequest: (state, action) => {
      state.orderRequest = action.payload;
    },

    resetModal: (state) => {
      state.orderModalData = null;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getOrderBurger.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.orderRequest = true;
    });
    builder.addCase(getOrderBurger.rejected, (state, action) => {
      state.loading = false;
      state.orderRequest = false;
      state.error = action.error.message as string;
    });
    builder.addCase(getOrderBurger.fulfilled, (state, action) => {
      state.loading = false;
      state.orderRequest = false;
      state.error = null;
      state.orderModalData = action.payload.order;
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    });
  }
});

const constructorSliceSelectors = (state: RootState): ConstructorState =>
  state.burders;

export const getConstructorState = createSelector(
  [constructorSliceSelectors],
  (state) => ({
    ingredients: state.constructorItems.ingredients,
    bun: state.constructorItems.bun
  })
);
export const getOrderRequest = (state: RootState) => state.burders.orderRequest;
export const getOrderModalData = (state: RootState) =>
  state.burders.orderModalData;

export const {
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  moveIngredientUp,
  moveIngredientDown,
  resetConstructor,
  setRequest,
  resetModal
} = constructorSlice.actions;

export default constructorSlice.reducer;
