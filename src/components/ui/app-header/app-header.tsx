import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

/**
 * Компонент отрисовки шапки приложения
 */
export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();

  const isActiveLink = (path: string, exact = false) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <Link
            to='/'
            className={`${styles.link} ${
              isActiveLink('/', true) ? styles.link_active : ''
            }`}
          >
            <BurgerIcon
              type={isActiveLink('/', true) ? 'primary' : 'secondary'}
            />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </Link>
          <Link
            to='/feed'
            className={`${styles.link} ${
              isActiveLink('/feed') ? styles.link_active : ''
            }`}
          >
            <ListIcon type={isActiveLink('/feed') ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </Link>
        </div>

        <div className={styles.logo}>
          <Link to='/'>
            <Logo className='' />
          </Link>
        </div>

        <Link
          to='/profile'
          className={`${styles.link} ${styles.link_position_last} ${
            isActiveLink('/profile') ? styles.link_active : ''
          }`}
        >
          <ProfileIcon
            type={isActiveLink('/profile') ? 'primary' : 'secondary'}
          />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </Link>
      </nav>
    </header>
  );
};
