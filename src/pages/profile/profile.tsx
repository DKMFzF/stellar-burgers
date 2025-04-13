import { FC, SyntheticEvent, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { ProfileUI } from '@ui-pages';
import { Preloader } from '@ui';
import {
  getUser,
  selectUserState,
  updateUser
} from '../../services/slices/user-Info-slice/user-info';

type ProfileFormState = {
  name: string;
  email: string;
  password: string;
};

/**
 * Компонент страницы профиля пользователя
 */
export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { user, request: loading } = useSelector(selectUserState);

  const [formValue, setFormValue] = useState<ProfileFormState>({
    name: '',
    email: '',
    password: ''
  });
  const [isFormChanged, setIsFormChanged] = useState<boolean>(false);

  // Инициализация формы данными пользователя
  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
    }
  }, [user]);

  // Проверка изменений формы
  useEffect(() => {
    const hasChanges =
      formValue.name !== user?.name ||
      formValue.email !== user?.email ||
      Boolean(formValue.password);

    setIsFormChanged(hasChanges);
  }, [formValue, user]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormValue((prev) => ({
        ...prev,
        [name]: value
      }));
    },
    []
  );

  const handleCancel = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      if (user) {
        setFormValue({
          name: user.name || '',
          email: user.email || '',
          password: ''
        });
      }
      setIsFormChanged(false);
    },
    [user]
  );

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      const isNameOrEmailEmpty =
        !formValue.name.trim() || !formValue.email.trim();

      if (!isFormChanged || isNameOrEmailEmpty) return;

      try {
        await dispatch(updateUser(formValue)).unwrap();
        setFormValue((prev) => ({ ...prev, password: '' }));
        setIsFormChanged(false);
        dispatch(getUser());
      } catch (error) {
        return <>Profile update failed:</>;
      }
    },
    [formValue, isFormChanged, dispatch]
  );

  if (loading) {
    return <Preloader />;
  }

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
