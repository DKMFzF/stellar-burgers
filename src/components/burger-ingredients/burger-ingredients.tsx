import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI, Preloader } from '@ui';
import { getIngredientState } from '../../services/slices/ingredients-slice/ingredients';

/**
 * Основной компонент секции ингредиентов.
 * Управляет табами и отображением категорий с автоопределением активного таба при скролле.
 */
export const BurgerIngredients: FC = () => {
  const { ingredients, loading, error } = useSelector(getIngredientState);

  // Разделяем ингредиенты по категориям
  const buns = ingredients.filter((item) => item.type === 'bun');
  const mains = ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients.filter((item) => item.type === 'sauce');

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');

  // Рефы заголовков для плавного скролла
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  // Трекинг попадания категорий в вьюпорт
  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [mainsRef, inViewMains] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });

  // Обновляем активный таб при скролле
  useEffect(() => {
    if (inViewBuns) setCurrentTab('bun');
    else if (inViewSauces) setCurrentTab('sauce');
    else if (inViewMains) setCurrentTab('main');
  }, [inViewBuns, inViewMains, inViewSauces]);

  // Обработка клика по табам — плавно скроллим к нужной категории
  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);

    const scrollTo = {
      bun: titleBunRef,
      main: titleMainRef,
      sauce: titleSaucesRef
    }[tab as TTabMode];

    scrollTo?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) return <Preloader />;

  if (error) return <div>Ошибка загрузки ингредиентов: {error}</div>;

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
