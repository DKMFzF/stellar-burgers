import { TOrder } from '@utils-types';
import { StateError } from '../types';

// Интерфейс ответа API для ленты заказов
export interface IFeedsResponse {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

// Состояние ленты заказов
export interface IFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: StateError;
}
