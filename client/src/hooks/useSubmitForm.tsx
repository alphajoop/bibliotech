import { useState } from 'react';

interface SubmitFormHook<T> {
  isLoading: boolean;
  successMessage: string;
  errorMessage: string;
  handleSubmit: (
    data: T,
    successMsg?: string,
    errorMsg?: string,
  ) => Promise<void>;
}

export function useSubmitForm<T>(
  submitFunction: (data: T) => Promise<void>,
): SubmitFormHook<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (
    data: T,
    successMsg = 'Opération réussie',
    errorMsg = "Erreur lors de l'opération",
  ) => {
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    try {
      await submitFunction(data);
      setSuccessMessage(successMsg);
    } catch (error) {
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, successMessage, errorMessage, handleSubmit };
}
