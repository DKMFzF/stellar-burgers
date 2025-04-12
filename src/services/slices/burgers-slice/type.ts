import { TConstructorIngredient, TOrder } from '@utils-types';
import { TStateError } from '../types';

export type TStateBun = TConstructorIngredient | null;
export type TStateIngredients = Array<TConstructorIngredient>;
export type TStateOrderModalData = TOrder | null;
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
