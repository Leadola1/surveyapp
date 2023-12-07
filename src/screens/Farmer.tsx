import React from 'react';
import FormScreen from '../components/FormScreen';
import formData from '../assets/data.json';

const Farmer = () => {
  return (
    <FormScreen formData={formData.farmer_registration} formType="farmer" />
  );
};

export default Farmer;
