import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { RootState } from '../../store';
import OrderState from './type';

// Начальное состояние
const initialState: OrderState = {
  orders: [],
  getOrderByNumberResponse: null,
  error: null,
  request: false,
  responseOrder: null
};

// Thunk для получения заказа по номеру
export const getOrderByNumber = createAsyncThunk(
  'order/byNumber',
  async (number: number) => getOrderByNumberApi(number)
);

// Слайс заказов
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.error = null;
        state.request = true;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error = (action.payload as string) ?? 'Unknown error occurred';
        state.request = false;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.error = null;
        state.request = false;
        state.getOrderByNumberResponse = action.payload.orders[0];
        state.responseOrder = action.payload.orders[0]; // Синхронизация с responseOrder
      });
  }
});

// Селектор состояния заказов
export const getOrderState = (state: RootState): OrderState => state.order;

export const orderReducer = orderSlice.reducer;
