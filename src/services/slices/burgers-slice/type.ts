import { TConstructorIngredient, TOrder } from '@utils-types';
import type { TStateError, TStateTypeNull } from '../types';

// типы для слайса burgers

export type TStateBun = TStateTypeNull<TConstructorIngredient>;
export type TStateOrderModalData = TStateTypeNull<TOrder>;
export type TStateIngredients = Array<TConstructorIngredient>;
type TConstructorState = {
  constructorItems: {
    bun: TStateBun;
    ingredients: TStateIngredients;
  };
  orderRequest: boolean;
  orderModalData: TStateOrderModalData;
  loading: boolean;
  error: TStateError;
};

export default TConstructorState;
