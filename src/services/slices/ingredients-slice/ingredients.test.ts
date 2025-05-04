import { ingredientReducer, getIngredients } from './ingredients';
import { TIngredient } from '@utils-types';

const testIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Bun A',
    type: 'bun',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 200,
    price: 50,
    image: 'image-url',
    image_large: 'image-large-url',
    image_mobile: 'image-mobile-url'
  },
  {
    _id: '2',
    name: 'Sauce B',
    type: 'sauce',
    proteins: 5,
    fat: 10,
    carbohydrates: 15,
    calories: 100,
    price: 20,
    image: 'image-url',
    image_large: 'image-large-url',
    image_mobile: 'image-mobile-url'
  }
];

const initialState = {
  ingredients: [],
  loading: false,
  error: null
};

describe('ingredients reducer', () => {
  it('проверка вызова экшена request', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientReducer(
      { ...initialState, error: 'Previous error' },
      action
    );

    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('проверка вызова экшена success', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: testIngredients
    };

    const state = ingredientReducer(
      { ...initialState, loading: true },
      action
    );

    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: null,
      ingredients: testIngredients
    });
  });

  it('проверка вызова экшена failed', () => {
    const errorMessage = 'Failed to fetch ingredients';

    const action = {
      type: getIngredients.rejected.type,
      payload: errorMessage
    };

    const state = ingredientReducer(
      { ...initialState, loading: true },
      action
    );

    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: errorMessage
    });
  });
});
