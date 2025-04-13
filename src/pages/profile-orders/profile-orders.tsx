import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getFeeds } from '../../services/slices/feed-slice/feed';
import {
  getOrders,
  selectUserState
} from '../../services/slices/user-Info-slice/user-info';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const { userOrders, request } = useSelector(selectUserState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getFeeds());
  }, []);

  if (request === true) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={userOrders} />;
};
