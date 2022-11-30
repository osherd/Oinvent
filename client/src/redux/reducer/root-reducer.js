import { combineReducers } from 'redux';
import { authReducer } from '../store/auth/auth.reducer';


export const rootReducer = combineReducers( {
  auth: authReducer
} );