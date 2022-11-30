import { createAction } from '../../../Services/reducerService';
import { AUTH_ACTION_TYPES } from './auth.types';

const name = JSON.parse( localStorage.getItem( "name" ) );


export const setUser = ( userData ) =>
  createAction( AUTH_ACTION_TYPES.SET_USER, userData );

export const setLogin = ( isLoggedIn = false ) =>
  createAction( AUTH_ACTION_TYPES.SET_LOGIN, isLoggedIn );

export const setName = () => {
  createAction( AUTH_ACTION_TYPES.SET_NAME, name );
};
