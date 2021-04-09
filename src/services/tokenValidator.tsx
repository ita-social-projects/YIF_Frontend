import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
  useMemo,
} from 'react';
import jwt_decode from 'jwt-decode';
import { APIUrl } from './endpoints';
import {
  setRoleReducer,
  removeRoleReducer,
} from '../store/reducers/setRoleReducer';
import { store } from '../store/store';

type Decoded = {
  email: string;
  exp: number;
  id: string;
  roles: string;
};

type Token = string | null;

type Values = {
  token: Token;
  refreshToken: Token;
  isRefreshing: boolean;
  getToken: Function;
  updateToken: Function;
  removeToken: Function;
};

const authContext = createContext({} as Values);

function AuthProvider({ children }: any) {
  const [token, setToken] = useState<Token>(localStorage.getItem('token'));
  const [refreshToken, setRefreshToken] = useState<Token>(
    localStorage.getItem('refreshToken')
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  const updateToken = useCallback((token, refreshToken) => {
    setToken(token);
    setRefreshToken(refreshToken);
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }, []);

  const removeToken = useCallback(() => {
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    store.dispatch(removeRoleReducer());
  }, []);

  const isTokenExpired = useCallback((token: Token) => {
    try {
      const decoded: Decoded = jwt_decode(token!);
      store.dispatch(setRoleReducer(decoded.roles[1]));
      return decoded.exp <= new Date().getTime() / 1000 ? true : false;
    } catch (error) {
      removeToken();
      return false;
    }
  }, []);

  const isExpired = useMemo(() => isTokenExpired(token), [token]);

  const getToken = useCallback(async () => {
    const url = `${APIUrl}Authentication/RefreshToken`;
    let currentToken = token;
    let currentRefreshToken = refreshToken;
    if (isTokenExpired(currentToken)) {
      try {
        setIsRefreshing(true);
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            refreshToken,
          }),
        });

        if (response.ok) {
          let result = await response.json();
          currentToken = result.token;
          currentRefreshToken = result.refreshToken;
          updateToken(currentToken, currentRefreshToken);
          setIsRefreshing(false);
        } else {
          let result = await response.json();
          removeToken();
          setIsRefreshing(false);
          console.error(result.title);
        }
      } catch (error) {
        removeToken();
        setIsRefreshing(false);
        console.error(error);
      }
    }

    return currentToken;
  }, [token, updateToken, removeToken]);

  useEffect(() => {
    if (isTokenExpired(token) && !isRefreshing) getToken();
  }, [isExpired]);

  return (
    <authContext.Provider
      value={{
        token,
        refreshToken,
        isRefreshing,
        getToken,
        updateToken,
        removeToken,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  return useContext(authContext);
}

export { AuthProvider, useAuth, authContext };
