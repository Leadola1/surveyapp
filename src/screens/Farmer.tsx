import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import formData from '../assets/data.json';
import {useDispatch, useSelector} from 'react-redux';
import {submitForm} from '../redux/farmerSlice';
import {RootState} from '../redux/store';
import {showMessage} from 'react-native-flash-message';
import FormField from '../components/FormField';
import {FormValues} from '../assets/type';

export default function Farmer() {
  const dispatch = useDispatch();
  const savedFormValues = useSelector(
    (state: RootState) => state.form.formValues,
  );
  const [formValues, setFormValues] = useState<FormValues>({});

  const renderFormFields = () => {
    return (
      <>
        {formData.farmer_registration.map(field => {
          if (field.visible === 1) {
            return (
              <FormField
                key={field.column_name}
                field={field}
                formValues={formValues}
                handleFieldChange={handleFieldChange}
              />
            );
          } else {
            return null;
          }
        })}
        <TouchableOpacity
          style={{
            backgroundColor: '#007155',
            marginTop: 20,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
          onPress={handleSubmit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </>
    );
  };

  const handleFieldChange = (
    fieldName: string,
    value: string | number | undefined,
    readonly: boolean,
  ) => {
    if (!readonly) {
      setFormValues(prevFormValues => ({
        ...prevFormValues,
        [fieldName]: value,
      }));
    }
  };

  const handleSubmit = () => {
    const mandatoryFields = formData.farmer_registration.filter(
      field => field.mandatory === 1 && field.visible === 1,
    );

    const valuesProvided = mandatoryFields.every(
      field =>
        formValues[field.label] !== undefined && formValues[field.label] !== '',
    );

    if (valuesProvided) {
      const nonMandatoryFields = formData.farmer_registration.filter(
        field => field.mandatory === 0 && field.visible === 1,
      );
      nonMandatoryFields.forEach(field => {
        if (!formValues.hasOwnProperty(field.label)) {
          formValues[field.label] = '';
        }
      });

      const orderedKeys = [
        'Name', 
        ...Object.keys(formValues)
          .sort()
          .filter(key => key !== 'Name'), 
      ];

      const rearrangedObject: FormValues = {};
      orderedKeys.forEach(key => {
        rearrangedObject[key] = formValues[key];
      });

      dispatch(submitForm(rearrangedObject));
      setFormValues({});
      Keyboard.dismiss();
      showMessage({
        message: 'Farmer Added',
        type: 'success',
      });
    } else {
      showMessage({
        message: 'Please fill out mandatory fields before submitting',
        type: 'danger',
      });
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{flex: 1}}>
          <ScrollView
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{justifyContent: 'center'}}>
            <SafeAreaView>
              <View style={{padding: '5%'}}>{renderFormFields()}</View>
              <View style={{marginTop: 0, padding: 10}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    color: 'black',
                  }}>
                  Farmers Detail
                </Text>
                {savedFormValues.map((values, index) => (
                  <View
                    key={index}
                    style={{flexDirection: 'row', marginVertical: 5}}>
                    {Object.entries(values).map(([key, value]) => (
                      <View key={key} style={{flex: 1, alignItems: 'center'}}>
                        {index == 0 && (
                          <View
                            key={key}
                            style={{
                              flex: 1,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text style={{fontWeight: 'bold'}}>{key}:</Text>
                          </View>
                        )}
                        <Text>{value}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </SafeAreaView>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
