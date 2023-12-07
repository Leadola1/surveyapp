import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FarmerState {
  formValues: Record<string, string | boolean | number | undefined>[];
}

const initialState: FarmerState = {
  formValues: [],
};

const farmerSlice = createSlice({
  name: 'farmer',
  initialState,
  reducers: {
    submitForm: (state, action: PayloadAction<Record<string, string | boolean | number | undefined>>) => {
      state.formValues.push(action.payload)
    },
  },
});

export const { submitForm } = farmerSlice.actions;
export const farmerReducer = farmerSlice.reducer;
