import {  Dispatch } from 'react';
import { FormValues } from '../assets/type';

const useFormFields = (
  formValues: FormValues,
  setFormValues: Dispatch<React.SetStateAction<FormValues>>
) => {
  const handleFieldChange = (
    fieldName: string,
    value: string | number | undefined,
    readonly: boolean
  ) => {
    setFormValues(prevFormValues => ({
      ...prevFormValues,
      [fieldName]: value,
    }));
  };
  

  return handleFieldChange;
};

export default useFormFields;
