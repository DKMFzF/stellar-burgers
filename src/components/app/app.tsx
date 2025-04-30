import { useEffect } from 'react';
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import { AppHeader, Modal, IngredientDetails, OrderInfo } from '@components';
import { useDispatch } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredients-slice/ingredients';

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import { ProtectedRoute } from '../protected-route/protected-route';
import styles from './app.module.css';
import { getCheckUser } from '../../services/slices/user-Info-slice/user-info';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Сохраняем состояние для корректной работы модальных окон
  const backgroundLocation = location.state?.background;

  const closeModal = () => {
    navigate(-1); // Возврат к предыдущему состоянию при закрытии модального окна
  };

  useEffect(() => {
    // Загружаем данные об ингредиентах при монтировании и о Юзере
    dispatch(getIngredients());
    dispatch(getCheckUser());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      {/* Основные маршруты приложения */}
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        {/* Публичные маршруты (доступны неавторизованным пользователям) */}
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyAuthorized>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyAuthorized>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyAuthorized>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyAuthorized>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        {/* Приватные маршруты (требуют авторизации) */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        {/* Информационные страницы */}
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />

        {/* Фоллбэк для неизвестных маршрутов */}
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модальные окна для отображения поверх основного контента */}
      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='Информация о заказе' onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
