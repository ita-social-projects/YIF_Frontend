import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
  createContext,
} from 'react';
import jwt_decode from 'jwt-decode';
import { APIUrl } from './endpoints';

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
  isExpired: boolean;
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
  }, []);

  const isTokenExpired = useCallback(
    (token: Token) => {
      if (!token) {
        return false;
      }
      try {
        const decoded: Decoded = jwt_decode(token);
        return decoded.exp <= new Date().getTime() / 1000 ? true : false;
      } catch (error) {
        removeToken();
        return false;
      }
    },
    [removeToken]
  );

  const isExpired = useMemo(() => isTokenExpired(token), [
    isTokenExpired,
    token,
  ]);

  const getToken = useCallback(async () => {
    const url = `${APIUrl}Authentication/RefreshToken`;
    let currentToken;
    let currentRefreshToken = refreshToken;

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
    // return currentToken;
  }, [token, refreshToken, updateToken, removeToken]);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setRefreshToken(localStorage.getItem('refreshToken'));

    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === 'token') {
        setToken(localStorage.getItem('token'));
      }
      if (e.key === 'refreshToken') {
        setRefreshToken(localStorage.getItem('refreshToken'));
      }
    };

    window.addEventListener('storage', handleStorageEvent);

    return () => window.removeEventListener('storage', handleStorageEvent);
  }, []);

  useEffect(() => {
    if (isExpired && !isRefreshing) getToken();
  }, [isExpired, isRefreshing, getToken]);

  return (
    <authContext.Provider
      value={{
        token,
        refreshToken,
        isExpired,
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
