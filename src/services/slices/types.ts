import { TConstructorIngredient, TOrder } from '@utils-types';

export type TStateBun = TConstructorIngredient | null;
export type TStateIngredients = Array<TConstructorIngredient>;
export type TStateOrderModalData = TOrder | null;
export type TStateError = string | null;
