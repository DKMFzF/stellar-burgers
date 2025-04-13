import { forwardRef, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { getConstructorState } from '../../services/slices/burgers-slice/burgers';

/**
 * Компонент отображения категории ингредиентов (булки, соусы, начинки).
 */
export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const { bun, ingredients: constructorIngredients } =
    useSelector(getConstructorState);

  const ingredientsCounters = useMemo(() => {
    const counters: Record<string, number> = {};

    constructorIngredients.forEach((ingredient: TIngredient) => {
      counters[ingredient._id] = (counters[ingredient._id] || 0) + 1;
    });

    if (bun) {
      counters[bun._id] = 2; // Верх и низ бургера
    }

    return counters;
  }, [bun, constructorIngredients]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
