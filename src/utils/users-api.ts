import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from './cookie';

export const registerUser = async (registerData: TRegisterData) => {
  const data = await registerUserApi(registerData);
  if (!data.success) throw new Error('Registration failed');

  setCookie('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data;
};

export const loginUser = async ({ email, password }: TLoginData) => {
  const data = await loginUserApi({ email, password });
  if (!data.success) throw new Error('Login failed');

  setCookie('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data;
};

export const fetchUser = async () => await getUserApi();

export const fetchUserOrders = async () => await getOrdersApi();

export const updateUserData = async (userData: TRegisterData) =>
  await updateUserApi(userData);

export const logoutUser = async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
};
