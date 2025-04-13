import { FC, useState, SyntheticEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      setError(null);
      setIsLoading(true);

      try {
        await forgotPasswordApi({ email });
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('An unknown error occurred')
        );
      } finally {
        setIsLoading(false);
      }
    },
    [email, navigate]
  );

  return (
    <ForgotPasswordUI
      errorText={error?.message}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
