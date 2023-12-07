import React from 'react';
import {FormFieldType, ListItem} from '../assets/type';
export const GetPickerItems = (field: FormFieldType): ListItem[] => {
  if (field.type === 'list') {
    if (field.column_name === 'gender') {
      return [
        {label: 'Male', value: 'Male'},
        {label: 'Female', value: 'Female'},
      ];
    } else if (field.column_name === 'relation_with_farmer') {
      return [
        {label: 'Father', value: 'Father'},
        {label: 'Mother', value: 'Mother'},
        {label: 'Sibling', value: 'Sibling'},
      ];
    } else {
      return [
        {label: 'Option 1', value: 'Option1'},
        {label: 'Option 2', value: 'Option2'},
      ];
    }
  } else {
    return [];
  }
};
