import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import type TUserState from './type';
import * as userApi from '../../../utils/users-api';
import { TLoginData, TRegisterData } from '@api';

// Начальное состояние
export const initialState: TUserState = {
  request: false,
  error: null,
  response: null,
  registerData: null,
  user: null,
  userOrders: [],
  isAuthChecked: false,
  isAuthenticated: false,
  loginUserRequest: false
};

// Thunk actions
export const getRegisterUser = createAsyncThunk(
  'users/register',
  async (registerData: TRegisterData, { rejectWithValue }) => {
    try {
      return await userApi.registerUser(registerData);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getLoginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData: TLoginData, { rejectWithValue }) => {
    try {
      return await userApi.loginUser(loginData);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getCheckUser = createAsyncThunk(
  'users/getUser',
  async (_, { rejectWithValue }) => {
    try {
      return await userApi.fetchUser();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getOrders = createAsyncThunk(
  'users/getOrders',
  async (_, { rejectWithValue }) => {
    try {
      return await userApi.fetchUserOrders();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userData: TRegisterData, { rejectWithValue }) => {
    try {
      return await userApi.updateUserData(userData);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getLogoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await userApi.logoutUser();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Слайс пользователя
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    resetError: (state) => {
      state.error = null;
    },
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Регистрация
      .addCase(getRegisterUser.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(getRegisterUser.rejected, (state, action) => {
        state.request = false;
        state.error = action.payload as string;
        state.isAuthChecked = false;
      })
      .addCase(getRegisterUser.fulfilled, (state, action) => {
        state.request = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })

      // Авторизация
      .addCase(getLoginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.error = null;
      })
      .addCase(getLoginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.error = action.payload as string;
      })
      .addCase(getLoginUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })

      // Получение данных пользователя
      .addCase(getCheckUser.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(getCheckUser.rejected, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(getCheckUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })

      // Обновление данных
      .addCase(updateUser.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.request = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.request = false;
        state.user = action.payload.user;
      })

      // Выход
      .addCase(getLogoutUser.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(getLogoutUser.rejected, (state, action) => {
        state.request = false;
        state.error = action.payload as string;
      })
      .addCase(getLogoutUser.fulfilled, (state) => {
        state.request = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Получение заказов
      .addCase(getOrders.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.request = false;
        state.error = action.payload as string;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.request = false;
        state.userOrders = action.payload;
      });
  }
});

export const { userLogout, resetError, setAuthChecked } = userSlice.actions;

export const selectUserState = (state: RootState): TUserState => state.user;

export const userReducer = userSlice.reducer;
