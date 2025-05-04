import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import {
  getOrderByNumber,
  getOrderState
} from '../../services/slices/order-slice/order';
import { getIngredientState } from '../../services/slices/ingredients-slice/ingredients';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';

/**
 * Компонент отображения информации о заказе по его номеру
 */
export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const { getOrderByNumberResponse, request } = useSelector(getOrderState);
  const { ingredients } = useSelector(getIngredientState);

  useEffect(() => {
    if (number) dispatch(getOrderByNumber(Number(number)));
  }, [dispatch, number]);

  const orderInfo = useMemo(() => {
    if (!getOrderByNumberResponse || ingredients.length === 0) return null;

    const date = new Date(getOrderByNumberResponse.createdAt);

    const ingredientsMap = getOrderByNumberResponse.ingredients.reduce<
      Record<string, TIngredient & { count: number }>
    >((acc, id) => {
      if (!acc[id]) {
        const ingredient = ingredients.find((ing) => ing._id === id);
        if (ingredient) {
          acc[id] = { ...ingredient, count: 1 };
        }
      } else {
        acc[id].count++;
      }
      return acc;
    }, {});

    const total = Object.values(ingredientsMap).reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );

    return {
      ...getOrderByNumberResponse,
      ingredientsInfo: ingredientsMap,
      date,
      total
    };
  }, [getOrderByNumberResponse, ingredients]);

  if (!orderInfo || request) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
