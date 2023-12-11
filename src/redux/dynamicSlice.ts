import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DynamicFormState {
  formValues: Record<string, Record<string, string | boolean | number | undefined>[]>;
}

const initialState: DynamicFormState = {
  formValues: {},
};

export const dynamicSlice = createSlice({
  name: 'dynamic',
  initialState,
  reducers: {
    submitForm: (state, action: PayloadAction<{ formType: string; data: Record<string, string | boolean | number | undefined> }>) => {
      const { formType, data } = action.payload;

      if (!state.formValues[formType]) {
        state.formValues[formType] = [];
      }
      state.formValues[formType].push(data);
    },
  },
});

export const createDynamicSlice = (formType: string) => {
  return {
    ...dynamicSlice,
    name: formType,
  };
};

export const { reducer, actions } = dynamicSlice;
