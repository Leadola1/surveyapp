import { FormValues, FormFieldType } from '../assets/type';
import { useDispatch } from 'react-redux';
import  {actions}  from '../redux/dynamicSlice';
import { showMessage } from 'react-native-flash-message';
import { Keyboard } from 'react-native';

const useFormSubmit = (
  formValues: FormValues,
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>,
  formData: FormFieldType[],
  formType: string,
) => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const mandatoryFields = formData.filter(
      (field) => field.mandatory === 1 && field.visible === 1
    );
    const valuesProvided = mandatoryFields.every(
      (field) =>
        formValues[field.label] !== undefined && formValues[field.label] !== ''
    );
    if (valuesProvided) {
      const nonMandatoryFields = formData.filter(
  (field) => field.mandatory === 0 && field.visible === 1
);

nonMandatoryFields.forEach((field) => {
  if (formValues[field.label] === undefined || formValues[field.label] === null) {
    formValues[field.label] = '-';
  }
});

      const orderedKeys = [
        'Name',
        ...Object.keys(formValues)
          .sort()
          .filter((key) => key !== 'Name'),
      ];
      
      const rearrangedObject: FormValues = {};
      orderedKeys.forEach((key) => {
        rearrangedObject[key] = formValues[key];
      });
      dispatch(actions.submitForm({ formType, data: rearrangedObject }));

      setFormValues({});
      Keyboard.dismiss();
      showMessage({
        message: `${formType} has been added`,
        type: 'success',
      });
    } else {
      showMessage({
        message: 'Please fill out mandatory fields before submitting',
        type: 'danger',
      });
    }
  };

  return handleSubmit;
};

export default useFormSubmit;
