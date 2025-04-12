import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructorState,
  getOrderBurger,
  getOrderModalData,
  getOrderRequest,
  resetModal,
  setRequest
} from '../../services/slices/burgers-slice/burgers';
import { useNavigate } from 'react-router-dom';
import { getUserState } from '../../services/slices/user-Info-slice/user-info';

/**
 * Комопнент для конструктора бургеров
 */
export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(getConstructorState);

  const orderRequest = useSelector(getOrderRequest);

  const orderModalData = useSelector(getOrderModalData);

  const isAuthenticated = useSelector(getUserState).isAuthenticated;

  let arr: string[] = [];
  const ingredients: string[] | void = constructorItems.ingredients.map(
    (i) => i._id
  );
  if (constructorItems.bun) {
    const bun = constructorItems.bun?._id;
    arr = [bun, ...ingredients, bun];
  }
  const onOrderClick = () => {
    if (constructorItems.bun && isAuthenticated) {
      dispatch(setRequest(true));
      dispatch(getOrderBurger(arr));
    } else if (!constructorItems.bun && isAuthenticated) {
      return;
    } else if (!isAuthenticated) {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    dispatch(setRequest(false));
    dispatch(resetModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
