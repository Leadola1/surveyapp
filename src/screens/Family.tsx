import React from 'react';
import FormScreen from '../components/FormScreen';
import formData from '../assets/data.json';

const Family = () => {
  return (
    <FormScreen
      formData={formData.farmer_family_registration}
      formType="family"
    />
  );
};

export default Family;
