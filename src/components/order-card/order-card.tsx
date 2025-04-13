import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { getIngredientState } from '../../services/slices/ingredients-slice/ingredients';

const MAX_INGREDIENTS_TO_SHOW = 6;

/**
 * Карточка заказа с информацией об ингредиентах и стоимости.
 */
export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();
  const { ingredients } = useSelector(getIngredientState);

  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;

    const ingredientsInfo: TIngredient[] = order.ingredients
      .map((id) => ingredients.find((ing) => ing._id === id))
      .filter((item): item is TIngredient => Boolean(item));

    const total = ingredientsInfo.reduce((sum, ing) => sum + ing.price, 0);
    const ingredientsToShow = ingredientsInfo.slice(0, MAX_INGREDIENTS_TO_SHOW);
    const remains = Math.max(
      ingredientsInfo.length - MAX_INGREDIENTS_TO_SHOW,
      0
    );
    const date = new Date(order.createdAt);

    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  if (!orderInfo) return null;

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={MAX_INGREDIENTS_TO_SHOW}
      locationState={{ background: location }}
    />
  );
});
