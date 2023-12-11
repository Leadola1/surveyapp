import React from 'react';
import FormScreen from '../components/FormScreen';
import { FormFieldType } from '../assets/type';

interface DynamicFormPageProps {
  formData: FormFieldType[];
  formType: string 
}

const DynamicFormPage: React.FC<DynamicFormPageProps> = ({ formData, formType }) => {
  return <FormScreen formData={formData} formType={formType} />;
};

export default DynamicFormPage;
