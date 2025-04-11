import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { ingredientsReducer } from './slices/ingredients-slice/ingredients';
import { userReducer } from './slices/user-Info-slice/user-info';
import { feedReducer } from './slices/feed-slice/feed';
import { orderReducer } from './slices/order-slice/order';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  feed: feedReducer,
  order: orderReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
