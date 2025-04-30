import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { addIngredientToConstructor } from '../../services/slices/burgers-slice/burgers';

/**
 * Компонент для отображения отдельного ингредиента в списке.
 * Отвечает за отображение, счётчик и добавление ингредиента в конструктор.
 */
export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      // Добавляем ингредиент в конструктор
      dispatch(addIngredientToConstructor(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }} // сохраняем состояние для модалки
        handleAdd={handleAdd}
      />
    );
  }
);
