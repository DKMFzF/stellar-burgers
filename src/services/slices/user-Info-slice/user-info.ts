import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { 
  getUserApi, 
  loginUserApi, 
  logoutApi, 
  registerUserApi, 
  updateUserApi 
} from '../../../utils/burger-api';
import { TUser } from '../../../utils/types';

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async () => {
    const response = await getUserApi();
    return response.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: { email: string; password: string }) => {
    const response = await loginUserApi(credentials);
    return response.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: { email: string; name: string; password: string }) => {
    const response = await registerUserApi(userData);
    return response.user;
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (userData: { email: string; name: string; password?: string }) => {
    const response = await updateUserApi(userData);
    return response.user;
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async () => {
    await logoutApi();
  }
);

interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export const { setAuthChecked } = userSlice.actions;
export const userReducer = userSlice.reducer;
