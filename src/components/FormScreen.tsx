import React, {useState} from 'react';
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
import {useSelector, shallowEqual} from 'react-redux';
import {RootState} from '../redux/store';
import FormField from './FormField';
import {FormValues} from '../assets/type';
import useFormFields from '../hooks/useHandle';
import useFormSubmit from '../hooks/useFormSubmit';
import {FormFieldType} from '../assets/type';

interface FormScreenProps {
  formData: FormFieldType[];
  formType: string;
}
interface DynamicFormState {
  [key: string]: {
    formValues: Record<string, string | boolean | number | undefined>[];
  };
}
const selectFormValues = (state: RootState, formType: string) => {
  const formDataState = (state[formType] as DynamicFormState) || {};
  const formValues =
    (
      (formDataState.formValues || {}) as Record<
        string,
        Record<string, string | boolean | number | undefined>[]
      >
    )?.[formType] || [];
  return formValues;
};

const FormScreen: React.FC<FormScreenProps> = ({formData, formType}) => {
  const savedFormValues = useSelector(
    (state: RootState) => selectFormValues(state, formType),
    shallowEqual,
  );
  const [formValues, setFormValues] = useState<FormValues>({});
  const renderFormFields = () => {
    return (
      <>
        {formData.map((field: any) => {
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

  const handleFieldChange = useFormFields(formValues, setFormValues);
  const handleSubmit = useFormSubmit(
    formValues,
    setFormValues,
    formData,
    formType,
  );

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
                  {formType}
                </Text>
                {savedFormValues.map((values, index) => (
                  <View
                    key={index}
                    style={{flexDirection: 'row', marginVertical: 5}}>
                    {Object.entries(values).map(([key, value]) => (
                      <View key={key} style={{flex: 1, alignItems: 'center'}}>
                        {index === 0 && (
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
};

export default FormScreen;
