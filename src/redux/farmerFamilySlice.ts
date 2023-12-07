import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FamilyState {
  formValues: Record<string, string | boolean | number | undefined>[];
}

const initialState: FamilyState = {
  formValues: [],
};

const familySlice = createSlice({
  name: 'family',
  initialState,
  reducers: {
    submitFamilyForm: (state, action: PayloadAction<Record<string, string | boolean | number | undefined>>) => {
      state.formValues.push(action.payload);
    },
  },
});

export const { submitFamilyForm } = familySlice.actions;
export const familyReducer = familySlice.reducer;
