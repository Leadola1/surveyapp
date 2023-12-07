import { combineReducers } from 'redux';
import {farmerReducer} from './farmerSlice'
import { familyReducer } from './farmerFamilySlice';

const rootReducer = combineReducers({
  form: farmerReducer,
  family: familyReducer
});

export default rootReducer;
