import { TRegisterData } from '@api';
import { TOrder, TUser } from '@utils-types';
import type { TStateError, TStateTypeNull } from '../types';

// типы для слайса user-info

type TUserStateResponse = TStateTypeNull<TUser>;
type TUserStateRegisterData = TStateTypeNull<TRegisterData>;
type TUserStateAtr = TStateTypeNull<TUser>;
export type TUserState = {
  request: boolean;
  error: TStateError;
  response: TUserStateResponse;
  registerData: TUserStateRegisterData;
  user: TUserStateAtr;
  userOrders: TOrder[];
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginUserRequest: boolean;
};

export default TUserState;
