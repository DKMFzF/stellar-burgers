import { feedReducer, getFeeds, initialState } from './feed';
import { IFeedsResponse } from './type';

const testOrders: IFeedsResponse = {
  orders: [
    {
      _id: '1',
      number: 12345,
      status: 'done',
      name: 'Test Order One',
      ingredients: ['ingredient1', 'ingredient2'],
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z'
    },
    {
      _id: '2',
      number: 12346,
      status: 'pending',
      name: 'Test Order Two',
      ingredients: ['ingredient3', 'ingredient4'],
      createdAt: '2023-01-02T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z'
    }
  ],
  total: 200,
  totalToday: 20
};

describe('feed reducer', () => {

  it('проверка вызова экшена request', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedReducer(
      { ...initialState, error: 'Previous error' },
      action
    );

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('проверка вызова экшена success', () => {
    const action = {
      type: getFeeds.fulfilled.type,
      payload: testOrders
    };

    const state = feedReducer(
      { ...initialState, isLoading: true },
      action
    );

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: null,
      orders: testOrders.orders,
      total: testOrders.total,
      totalToday: testOrders.totalToday
    });
  });

  it('проверка вызова экшена failed', () => {
    const errorMessage = 'Network Error';
    const action = {
      type: getFeeds.rejected.type,
      payload: errorMessage
    };
  
    const state = feedReducer(
      { ...initialState, isLoading: true },
      action
    );
  
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: errorMessage
    });
  });
});
