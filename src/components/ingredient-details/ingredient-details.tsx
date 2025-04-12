import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Params, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIngredientState } from '../../services/slices/ingredients-slice/ingredients';

export const IngredientDetails: FC = () => {
  const { id } = useParams<Params>();
  const { ingredients, loading, error } = useSelector(getIngredientState);

  const ingredientData = ingredients.find((i) => {
    if (i._id === id) return i;
  });

  if (!ingredientData || loading) return <Preloader />;
  if (error) return <Preloader />;

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
