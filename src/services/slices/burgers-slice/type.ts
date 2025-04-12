import { TStateBun, TStateError, TStateIngredients, TStateOrderModalData } from "../types";

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
