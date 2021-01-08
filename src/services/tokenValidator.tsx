import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
  createContext,
} from 'react';
import jwt_decode from 'jwt-decode';

type Decoded = {
  email: string;
  exp: number;
  id: string;
  roles: string;
};

type Token = string | null;

type Values = {
  token: Token;
  user: User | null;
  isExpired: boolean;
  getToken: Function;
  updateToken: Function;
  removeToken: Function;
};

type User = {
  email: string;
  id: string;
  role: string;
};

const authContext = createContext({} as Values);

const getUser = (token: Token) => {
  if (!token) {
    return null;
  }
  const decoded: Decoded = jwt_decode(token);
  const user = {
    id: decoded.id,
    role: decoded.roles,
    email: decoded.email,
  };
  return user;
};

function AuthProvider({ children }: any) {
  const [token, setToken] = useState<Token>(null);
  const [refreshToken, setRefreshToken] = useState<Token>(null);

  const isTokenExpired = useCallback((token: Token) => {
    if (!token) {
      return true;
    }
    try {
      const decoded: Decoded = jwt_decode(token);
      return decoded.exp <= new Date().getTime() / 1000 ? true : false;
    } catch (error) {
      setToken(null);
      localStorage.removeItem('token');
      return true;
    }
  }, []);

  const isExpired = useMemo(() => isTokenExpired(token), [isTokenExpired, token]);
  const user = useMemo(() => getUser(token), [token]);

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

  const getToken = useCallback(async () => {
    const url = 'https://yifbackend.tk/api/Authentication/RefreshToken';
    let currentToken = token;
    if (isExpired) {
      try {
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
          let newRefreshToken = result.refreshToken;
          updateToken(currentToken, newRefreshToken);

          /* 
          let { newToken, newRefreshToken } = result;
          updateToken(newToken, newRefreshToken);
          */
        } else {
          let result = await response.json();
          console.error(result.title);
        }
      } catch (error) {
        console.error(error);
        // removeToken();
      }
    }
    // return currentToken;
  }, [isExpired, refreshToken, token, updateToken]);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setRefreshToken(localStorage.getItem('refreshToken'));

    window.onstorage = (event: StorageEvent) => {
      if (event.key === 'token') setToken(localStorage.getItem('token'));
      if (event.key === 'refreshToken')
        setRefreshToken(localStorage.getItem('refreshToken'));
    };

    if (isExpired) getToken();
  }, [getToken, isExpired]);

  return (
    <authContext.Provider
      value={{ token, user, isExpired, getToken, updateToken, removeToken }}
    >
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  return useContext(authContext);
}

export { AuthProvider, useAuth };
