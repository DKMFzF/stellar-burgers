import {
  userReducer,
  initialState,
  getRegisterUser,
  getLoginUser,
  getCheckUser,
  updateUser,
  getLogoutUser,
  getOrders,
  userLogout,
  resetError,
  setAuthChecked,
} from './user-info';
import { TUserState } from './type';
import { TOrder, TUser } from '@utils-types';
import { TRegisterData, TLoginData } from '@api';

const mockUserData: TUser = {
  email: 'test@test.com',
  name: 'TestUserName'
};

const mockOrdersData: TOrder[] = [
  {
    _id: '1',
    status: 'done',
    name: 'TestOrderName',
    createdAt: '00:00',
    updatedAt: '00:01',
    number: 1,
    ingredients: ['ing1', 'ing2']
  }
];

const mockRegisterData: TRegisterData = {
  email: 'test@test.com',
  password: 'testPassword',
  name: 'TestUserName'
};

const mockLoginData: TLoginData = {
  email: 'test@test.com',
  password: 'testPassword',
};

const mockRegisterResponseData = {
  success: true,
  user: mockUserData,
  accessToken: 'accessToken',
  refreshToken: 'refreshToken'
};

const mockLoginResponseData = {
  success: true,
  user: mockUserData,
  accessToken: 'accessToken',
  refreshToken: 'refreshToken'
};

const mockUserResponseData = {
  success: true,
  user: mockUserData
};

describe('userSlice тесты', () => {
  describe('Синхронизированные экшены', () => {
    it('должен обрабатывать userLogout', () => {
      const state: TUserState = {
        ...initialState,
        user: mockUserData,
        isAuthenticated: true,
      };
      expect(userReducer(state, userLogout())).toEqual({
        ...state,
        user: null,
        isAuthenticated: false,
      });
    });

    it('должен обрабатывать resetError', () => {
      const state: TUserState = {
        ...initialState,
        error: 'Some error',
      };
      expect(userReducer(state, resetError())).toEqual({
        ...state,
        error: null,
      });
    });

    it('должен обрабатывать setAuthChecked', () => {
      const state: TUserState = initialState;
      expect(userReducer(state, setAuthChecked(true))).toEqual({
        ...state,
        isAuthChecked: true,
      });
    });
  });

  describe('Асинхронные экшены', () => {
    describe('getRegisterUser', () => {
      it('обработка pending', () => {
        const state = userReducer(
          initialState,
          getRegisterUser.pending('requestId', mockRegisterData)
        );
        expect(state).toEqual({
          ...initialState,
          request: true,
          error: null,
        });
      });

      it('обработка fulfilled', () => {
        const state = userReducer(
          initialState,
          getRegisterUser.fulfilled(mockRegisterResponseData, 'requestId', mockRegisterData)
        );
        expect(state).toEqual({
          ...initialState,
          request: false,
          user: mockUserData,
          isAuthenticated: true,
        });
      });

      it('обаботка rejected', () => {
        const state = userReducer(
          initialState,
          {
            type: getRegisterUser.rejected.type,
            payload: 'error',
            error: { message: 'Error message' }
          }
        );
        expect(state).toEqual({
          ...initialState,
          request: false,
          error: 'error',
        });
      });
    });

    describe('getLoginUser', () => {
      it('обработка pending', () => {
        const state = userReducer(
          initialState,
          getLoginUser.pending('requestId', mockLoginData)
        );
        expect(state).toEqual({
          ...initialState,
          loginUserRequest: true,
          error: null,
        });
      });

      it('обработка fulfilled', () => {
        const state = userReducer(
          initialState,
          getLoginUser.fulfilled(mockLoginResponseData, 'requestId', mockLoginData)
        );
        expect(state).toEqual({
          ...initialState,
          loginUserRequest: false,
          user: mockUserData,
          isAuthenticated: true,
        });
      });

      it('обработка rejected', () => {
        const state = userReducer(
          initialState,
          {
            type: getLoginUser.rejected.type,
            payload: 'error',
            error: { message: 'Error message' }
          }
        );
        expect(state).toEqual({
          ...initialState,
          loginUserRequest: false,
          error: 'error',
        });
      });
    });

    describe('getCheckUser', () => {
      it('обработка pending', () => {
        const state = userReducer(
          initialState,
          getCheckUser.pending('requestId')
        );
        expect(state).toEqual({
          ...initialState,
          isAuthChecked: false,
        });
      });

      it('обработка fulfilled', () => {
        const state = userReducer(
          initialState,
          getCheckUser.fulfilled(mockUserResponseData, 'requestId')
        );
        expect(state).toEqual({
          ...initialState,
          isAuthChecked: true,
          user: mockUserData,
          isAuthenticated: true,
        });
      });

      it('обработка rejected', () => {
        const state = userReducer(
          initialState,
          getCheckUser.rejected(new Error('error'), 'requestId')
        );
        expect(state).toEqual({
          ...initialState,
          isAuthChecked: true,
          isAuthenticated: false,
        });
      });
    });

    describe('updateUser', () => {
      const updatedUser = { name: 'Updated User', email: 'updated@example.com' };
      const mockUpdateResponse = {
        success: true,
        user: updatedUser,
      };

      it('обработка pending', () => {
        const state = userReducer(
          initialState,
          updateUser.pending('requestId', mockRegisterData)
        );
        expect(state).toEqual({
          ...initialState,
          request: true,
          error: null,
        });
      });

      it('обработка fulfilled', () => {
        const state = userReducer(
          initialState,
          updateUser.fulfilled(mockUpdateResponse, 'requestId', mockRegisterData)
        );
        expect(state).toEqual({
          ...initialState,
          request: false,
          user: updatedUser,
        });
      });

      it('обработка rejected', () => {
        const state = userReducer(
          initialState,
          {
            type: updateUser.rejected.type,
            payload: 'error',
            error: { message: 'Error message' }
          }
        );
        expect(state).toEqual({
          ...initialState,
          request: false,
          error: 'error',
        });
      });
    });

    describe('getLogoutUser', () => {
      it('обработка pending', () => {
        const state = userReducer(
          initialState,
          getLogoutUser.pending('requestId')
        );
        expect(state).toEqual({
          ...initialState,
          request: true,
          error: null,
        });
      });

      it('обработка fulfilled', () => {
        const stateBefore = {
          ...initialState,
          user: mockUserData,
          isAuthenticated: true,
        };
        const state = userReducer(
          stateBefore,
          getLogoutUser.fulfilled(undefined, 'requestId')
        );
        expect(state).toEqual({
          ...stateBefore,
          request: false,
          user: null,
          isAuthenticated: false,
        });
      });

      it('обработка rejected', () => {
        const state = userReducer(
          initialState,
          {
            type: getLogoutUser.rejected.type,
            payload: 'error',
            error: { message: 'Error message' }
          }
        );
        expect(state).toEqual({
          ...initialState,
          request: false,
          error: 'error',
        });
      });
    });

    describe('getOrders', () => {
      it('обработка pending', () => {
        const state = userReducer(
          initialState,
          getOrders.pending('requestId')
        );
        expect(state).toEqual({
          ...initialState,
          request: true,
          error: null,
        });
      });

      it('обработка fulfilled', () => {
        const state = userReducer(
          initialState,
          getOrders.fulfilled(mockOrdersData, 'requestId')
        );
        expect(state).toEqual({
          ...initialState,
          request: false,
          userOrders: mockOrdersData,
        });
      });

      it('обработка rejected', () => {
        const state = userReducer(
          initialState,
          {
            type: getOrders.rejected.type,
            payload: 'error',
            error: { message: 'Error message' }
          }
        );
        expect(state).toEqual({
          ...initialState,
          request: false,
          error: 'error',
        });
      });
    });
  });
});
