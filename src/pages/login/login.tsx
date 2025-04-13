import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import {
  getLoginUser,
  selectUserState
} from '../../services/slices/user-Info-slice/user-info';

type LoginState = {
  email: string;
  password: string;
};

/**
 * Компонент страницы входа в систему
 */
export const Login: FC = () => {
  const [formData, setFormData] = useState<LoginState>({
    email: '',
    password: ''
  });
  const { error, isAuthenticated } = useSelector(selectUserState);
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return;
    }
    dispatch(getLoginUser(formData));
  };

  if (isAuthenticated) return <Navigate to='/' replace />;

  return (
    <LoginUI
      errorText={error || ''}
      email={formData.email}
      setEmail={(value) =>
        handleInputChange({
          target: { name: 'email', value }
        } as React.ChangeEvent<HTMLInputElement>)
      }
      password={formData.password}
      setPassword={(value) =>
        handleInputChange({
          target: { name: 'password', value }
        } as React.ChangeEvent<HTMLInputElement>)
      }
      handleSubmit={handleSubmit}
    />
  );
};
