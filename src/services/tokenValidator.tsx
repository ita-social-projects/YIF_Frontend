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

type Values = {
  token: string | null;
  user: Object;
  isExpired: boolean;
  updateToken: Function;
  removeToken: Function;
};

type Token = string | null;

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

  const isExpired = useMemo(() => isTokenExpired(token), [token]);
  const user = useMemo(() => getUser(token), [token]);

  useEffect(() => {
    setToken(localStorage.getItem('token'));

    window.onstorage = (event: StorageEvent) => {
      if (event.key === 'token') setToken(localStorage.getItem('token'));
    };
  }, []);

  const updateToken = useCallback((token) => {
    localStorage.setItem('token', token);
  }, []);

  const removeToken = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
  }, []);

  return (
    <authContext.Provider
      value={{ token, user, isExpired, updateToken, removeToken }}
    >
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  return useContext(authContext);
}

export { AuthProvider, useAuth };
