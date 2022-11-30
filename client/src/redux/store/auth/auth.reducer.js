
import { AUTH_ACTION_TYPES } from './auth.types';


const AUTH_INITIAL_STATE = {
  isLoggedIn: false,
  userData: {
    name: "",
    email: "",
    phone: "",
    bio: "",
    photo: "",
  },
};

export const authReducer = ( state = AUTH_INITIAL_STATE, action = {} ) => {
  const { type, payload } = action;

  switch ( type ) {
    case AUTH_ACTION_TYPES.SET_LOGIN:
      return { ...state, isLoggedIn: payload };
    case AUTH_ACTION_TYPES.SET_USER:
      return { ...state, userData: payload };
    default:
      return state;
  }
};