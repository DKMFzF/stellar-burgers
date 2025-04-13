import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getFeedState } from '../../services/slices/feed-slice/feed';
import { FeedInfoUI } from '../ui/feed-info';
import { TOrder } from '@utils-types';

/**
 * Вытаскивает номера заказов по статусу (ограничение — до 20 шт).
 */
const selectOrderNumbersByStatus = (
  orders: TOrder[],
  status: string
): number[] =>
  orders
    .filter((order) => order.status === status)
    .map((order) => order.number)
    .slice(0, 20);

/**
 * Компонент отображения статистики заказов: выполненные, в работе, общее количество.
 */
export const FeedInfo: FC = () => {
  const { orders, total, totalToday } = useSelector(getFeedState);

  // Мемоизируем вычисления, чтобы не пересчитывать при каждом рендере
  const readyOrders = useMemo(
    () => selectOrderNumbersByStatus(orders, 'done'),
    [orders]
  );
  const pendingOrders = useMemo(
    () => selectOrderNumbersByStatus(orders, 'pending'),
    [orders]
  );

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ orders, total, totalToday }}
    />
  );
};
