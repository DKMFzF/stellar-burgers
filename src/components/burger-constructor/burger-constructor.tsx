import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';

import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructorState,
  getOrderBurger,
  getOrderModalData,
  getOrderRequest,
  resetModal,
  setRequest
} from '../../services/slices/burgers-slice/burgers';
import { selectUserState } from '../../services/slices/user-Info-slice/user-info';

/**
 * Компонент для отображения конструктора бургера.
 * Управляет логикой формирования заказа и модального окна.
 */
export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(getConstructorState);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);
  const isAuthenticated = useSelector(selectUserState).isAuthenticated;

  // Формируем массив ID ингредиентов с булкой в начале и в конце
  const ingredientIds = useMemo(() => {
    if (!constructorItems.bun) return [];
    const bunId = constructorItems.bun._id;
    const ingredientIds = constructorItems.ingredients.map((i) => i._id);
    return [bunId, ...ingredientIds, bunId];
  }, [constructorItems]);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun) {
      // Можно показать уведомление "Выберите булку"
      return;
    }

    dispatch(setRequest(true));
    dispatch(getOrderBurger(ingredientIds));
  };

  const closeOrderModal = () => {
    dispatch(setRequest(false));
    dispatch(resetModal());
  };

  const totalPrice = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (sum: number, item: TConstructorIngredient) => sum + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
