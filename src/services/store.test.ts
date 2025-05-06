import { rootReducer } from './store';
import { constructorReducer } from './slices/burgers-slice/burgers';
import { ingredientReducer } from './slices/ingredients-slice/ingredients';
import { userReducer } from './slices/user-Info-slice/user-info';
import { feedReducer } from './slices/feed-slice/feed';
import { orderReducer } from './slices/order-slice/order';

describe('rootReducer', () => {
  it('правильная инициализация rootReducer', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state.burders).toEqual(constructorReducer(undefined, { type: '@@INIT' }));
    expect(state.ingredients).toEqual(ingredientReducer(undefined, { type: '@@INIT' }));
    expect(state.user).toEqual(userReducer(undefined, { type: '@@INIT' }));
    expect(state.feed).toEqual(feedReducer(undefined, { type: '@@INIT' }));
    expect(state.order).toEqual(orderReducer(undefined, { type: '@@INIT' }));
  });
});
