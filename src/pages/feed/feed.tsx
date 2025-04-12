import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeeds, getFeedState } from '../../services/slices/feed-slice/feed';
import { AppDispatch } from '../../services/store';

/**
 * Компонент страницы Feed
 */
export const Feed: FC = () => {
  const { orders, loading } = useSelector(getFeedState);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (loading) return <Preloader />;

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
