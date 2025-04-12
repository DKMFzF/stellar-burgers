import { TRegisterData } from '@api';
import { TOrder, TUser } from '@utils-types';
import { TStateError } from '../types';

type TUserStateResponse = TUser | null;
type TUserStateRegisterData = TRegisterData | null;
type TUserStateAtr = TUser | null;
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
