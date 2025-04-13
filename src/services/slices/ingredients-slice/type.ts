import { TIngredient } from "@utils-types";
import { StateError } from "../types";

export interface IngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: StateError;
}
