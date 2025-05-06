import { orderReducer, getOrderByNumber } from './order';
import { TOrder } from '@utils-types';

const testOrder: TOrder = {
  _id: '123',
  status: 'done',
  name: 'Test Order',
  createdAt: '2025-05-04T10:00:00.000Z',
  updatedAt: '2025-05-04T11:00:00.000Z',
  number: 42,
  ingredients: ['ingredient1', 'ingredient2']
};

const initialState = {
  orders: [],
  getOrderByNumberResponse: null,
  error: null,
  request: false,
  responseOrder: null
};

describe('order reducer', () => {
  it('проверка вызова экшена request', () => {
    const action = { type: getOrderByNumber.pending.type };
    const state = orderReducer(
      { ...initialState, error: 'Previous error' },
      action
    );

    expect(state).toEqual({
      ...initialState,
      request: true,
      error: null
    });
  });

  it('проверка вызова экшена success', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [testOrder] }
    };

    const state = orderReducer(
      { ...initialState, request: true },
      action
    );

    expect(state).toEqual({
      ...initialState,
      request: false,
      error: null,
      getOrderByNumberResponse: testOrder,
      responseOrder: testOrder
    });
  });

  it('проверка вызова экшена failed', () => {
    const errorMessage = 'Failed to fetch order';

    const action = {
      type: getOrderByNumber.rejected.type,
      payload: errorMessage
    };

    const state = orderReducer(
      { ...initialState, request: true },
      action
    );

    expect(state).toEqual({
      ...initialState,
      request: false,
      error: errorMessage
    });
  });
});
