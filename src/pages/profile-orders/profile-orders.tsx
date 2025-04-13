import { FC, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';
import { getFeeds } from '../../services/slices/feed-slice/feed';
import {
  getOrders,
  selectUserState
} from '../../services/slices/user-Info-slice/user-info';

/**
 * Компонент для отображения истории заказов пользователя
 */
export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { userOrders, request: isLoading } = useSelector(selectUserState);

  const loadOrdersData = useCallback(() => {
    try {
      dispatch(getOrders());
      dispatch(getFeeds());
    } catch (error) {
      return <>Failed to load orders data:</>;
    }
  }, [dispatch]);

  useEffect(() => {
    loadOrdersData();
  }, [loadOrdersData]);

  if (isLoading) return <Preloader />;

  return <ProfileOrdersUI orders={userOrders} />;
};
