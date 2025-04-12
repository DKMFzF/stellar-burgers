import { TConstructorIngredient, TOrder } from '@utils-types';

type TStateBun = TConstructorIngredient | null;
type TStateIngredients = Array<TConstructorIngredient>;
type TStateOrderModalData = TOrder | null;
type TStateError = string | null;
type ConstructorState = {
  constructorItems: {
    bun: TStateBun;
    ingredients: TStateIngredients;
  };
  orderRequest: boolean;
  orderModalData: TStateOrderModalData;
  loading: boolean;
  error: TStateError;
};

export default ConstructorState;
