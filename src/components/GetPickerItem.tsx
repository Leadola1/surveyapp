import React from 'react'
import { FormFieldType, ListItem } from '../assets/type';
export const GetPickerItems = (field: FormFieldType): ListItem[] => {
    if (field.type === 'list') {
      // Add your custom logic to determine list items based on the field or any other criteria
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
          // Add more options as needed
        ];
      } else {
        // Default list items
        return [
          {label: 'Option 1', value: 'Option1'},
          {label: 'Option 2', value: 'Option2'},
        ];
      }
    } else {
      // Handle other field types or return an empty array
      return [];
    }
  };