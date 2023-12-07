import React from 'react';
import {View, Text} from 'react-native';
import {Divider, TextInput} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import {FormFieldProps} from '../assets/type';
import {GetPickerItems} from './GetPickerItem';

const FormField: React.FC<FormFieldProps> = ({
  field,
  formValues,
  handleFieldChange,
}) => {
  const radioButtons: RadioButtonProps[] = [
    {
      id: 'single',
      label: 'Single',
      value: 'single',
      disabled: field.readonly === 1,
    },
    {
      id: 'married',
      label: 'Married',
      value: 'married',
      disabled: field.readonly === 1,
    },
  ];
  return (
    <>
      {field.type === 'text' && (
        <View key={field.column_name} style={{marginBottom: 10}}>
          <Text>{field.label}</Text>
          <TextInput
            label={field.label}
            value={formValues[field.label]?.toString() || ''}
            onChangeText={text =>
              handleFieldChange(field.label, text, field.readonly === 1)
            }
            editable={!field.readonly}
            activeUnderlineColor="green"
            style={{backgroundColor: '#afe1af'}}
          />
          <Divider />
        </View>
      )}
      {field.type === 'list' && (
        <View key={field.column_name} style={{marginBottom: 2}}>
          <Text>{field.label}</Text>
          <Divider />
          <RNPickerSelect
            placeholder={{label: field.label, value: null}}
            onValueChange={value =>
              handleFieldChange(field.label, value, field.readonly === 1)
            }
            items={GetPickerItems(field)}
            value={formValues[field.label]?.toString() || ''}
            disabled={field.readonly === 1}
          />
        </View>
      )}
      {field.type === 'radiobutton' &&
        field.column_name === 'marital_status' && (
          <>
            <View key={field.column_name} style={{marginBottom: 10}}>
              <Text>{field.label}</Text>
              <RadioGroup
                radioButtons={radioButtons}
                onPress={data =>
                  handleFieldChange(field.label, data, field.readonly === 1)
                }
                layout="row"
                selectedId={formValues[field.label]?.toString() || ''}
              />
              <Divider />
            </View>
          </>
        )}
      {field.type === 'number' && (
        <View key={field.column_name} style={{marginBottom: 10}}>
          <Text>{field.label}</Text>
          <TextInput
            label={field.label}
            value={formValues[field.label]?.toString() || ''}
            keyboardType="numeric"
            onChangeText={text =>
              handleFieldChange(field.label, text, field.readonly === 1)
            }
            editable={!field.readonly}
            activeUnderlineColor="green"
            style={{backgroundColor: '#afe1af'}}
          />
          <Divider />
        </View>
      )}
    </>
  );
};

export default FormField;
