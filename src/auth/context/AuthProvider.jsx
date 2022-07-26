import { useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { types } from '../types/types';
import { authReducer } from './authReducer';

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if ( user )  {
    return {
      logged: true,
      user,
    }
  }

  return {
    logged: false,
  }
}

export const AuthProvider = ({ children }) => {

  const [authState, dispatch] = useReducer( authReducer, {}, init );

  const login = ( name = '' ) => {
    const user = { id: 'ABC', name, }
    const action =  {
      type: types.login,
      payload: user, 
    } 

    localStorage.setItem('user', JSON.stringify(user));
    dispatch(action);
  }

  const logout = () => {
    const action = {
      type: types.logout,
    }

    localStorage.removeItem('user');
    dispatch(action);
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      { children }
    </AuthContext.Provider>
  )
}
