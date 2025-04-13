import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { getIngredientState } from '../../services/slices/ingredients-slice/ingredients';

/**
 * Компонент для отображения деталей ингредиента по ID из URL.
 */
export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { ingredients, loading, error } = useSelector(getIngredientState);

  // Мемоизация поиска ингредиента по ID
  const selectedIngredient = useMemo(
    () => ingredients.find((ingredient) => ingredient._id === id),
    [ingredients, id]
  );

  if (loading) return <Preloader />;
  if (error)
    return <div className='text-center text-red-500'>Ошибка: {error}</div>;
  if (!selectedIngredient)
    return <div className='text-center'>Ингредиент не найден</div>;

  return <IngredientDetailsUI ingredientData={selectedIngredient} />;
};
