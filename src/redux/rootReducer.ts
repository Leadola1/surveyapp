import { combineReducers } from 'redux';
import formData from '../assets/data.json';
import { createDynamicSlice } from './dynamicSlice';

const formTypes = Object.keys(formData);

const reducers: Record<string, any> = {};
formTypes.forEach((formType) => {
  const { reducer } = createDynamicSlice(formType);
  reducers[formType] = reducer;
});

const rootReducer = combineReducers(reducers);

export default rootReducer;


