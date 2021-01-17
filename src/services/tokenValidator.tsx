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
  refreshToken: Token;
  user: User | null;
  isExpired: boolean;
  isRefreshing: boolean;
  getToken: Function;
  updateToken: Function;
  removeToken: Function;
  userProfile: UserProfile | null;
  getUserProfile: Function;
};

type User = {
  email: string;
  id: string;
  role: string;
};

type UserProfile = {
  name: string;
  surname: string;
  middleName: string;
  phoneNumber: string;
  schoolName: string;
  email: string;
};

const authContext = createContext({} as Values);

function AuthProvider({ children }: any) {
  const [token, setToken] = useState<Token>(null);
  const [refreshToken, setRefreshToken] = useState<Token>(null);
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

  const getToken = useCallback(async () => {
    const url = 'https://yifbackend.tk/api/Authentication/RefreshToken';
    // const url = 'http://localhost:5000/api/Authentication/RefreshToken';
    let currentToken = token;
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
  }, [token, refreshToken, updateToken, removeToken]);

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

  const getUser = useCallback(
    (token: Token) => {
      if (!token) {
        return null;
      }
      try {
        const decoded: Decoded = jwt_decode(token);
        const user = {
          id: decoded.id,
          role: decoded.roles,
          email: decoded.email,
        };
        return user;
      } catch (error) {
        removeToken();
        return null;
      }
    },
    [removeToken]
  );

  const getUserProfile = useCallback(() => {
    let userJSON = localStorage.getItem('user');
    if (!userJSON) {
      return null;
    }
    return JSON.parse(userJSON);
  }, []);

  const userProfile = useMemo(() => getUserProfile(), [getUserProfile]);

  const isExpired = useMemo(() => isTokenExpired(token), [
    isTokenExpired,
    token,
  ]);
  const user = useMemo(() => getUser(token), [getUser, token]);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setRefreshToken(localStorage.getItem('refreshToken'));

    window.onstorage = (event: StorageEvent) => {
      if (event.key === 'token') setToken(localStorage.getItem('token'));
      if (event.key === 'refreshToken')
        setRefreshToken(localStorage.getItem('refreshToken'));
    };

    if (isExpired && !isRefreshing) getToken();
  }, [getToken, isExpired, isRefreshing, getUserProfile]);

  return (
    <authContext.Provider
      value={{
        token,
        refreshToken,
        user,
        isExpired,
        isRefreshing,
        getToken,
        updateToken,
        removeToken,
        userProfile,
        getUserProfile,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  return useContext(authContext);
}

export { AuthProvider, useAuth };
