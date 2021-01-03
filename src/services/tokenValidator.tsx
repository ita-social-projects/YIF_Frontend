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
  user: Object;
  isExpired: boolean;
  getToken: Function;
  updateToken: Function;
  removeToken: Function;
};

const authContext = createContext({} as Values);

const isTokenExpired = (token: Token) => {
  if (!token) {
    return true;
  }
  const decoded: Decoded = jwt_decode(token);
  return decoded.exp <= new Date().getTime() / 1000 ? true : false;
};

const getUser = (token: Token) => {
  if (!token) {
    return {};
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

  const isExpired = useMemo(() => isTokenExpired(token), [token]);
  const user = useMemo(() => getUser(token), [token]);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setRefreshToken(localStorage.getItem('refreshToken'));

    window.onstorage = (event: StorageEvent) => {
      if (event.key === 'token') setToken(localStorage.getItem('token'));
      if (event.key === 'refreshToken')
        setRefreshToken(localStorage.getItem('refreshToken'));
    };
  }, []);

  const updateToken = useCallback((token, refreshToken) => {
    setToken(token);
    setRefreshToken(refreshToken);
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }, []);

  const removeToken = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
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
        } else {
          let result = await response.json();
          console.error(result.title);
        }
      } catch (error) {
        console.error(error);
      }
    }
    return currentToken;
  }, [isExpired, refreshToken, token, updateToken]);

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
