import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
  createContext,
} from 'react';
import jwt_decode from 'jwt-decode';

const authContext = createContext({});

const isTokenExpired = (token) => {
  if (token) {
    const decoded = jwt_decode(token);
    return decoded.exp <= new Date().getTime() / 1000 ? true : false;
  }
};

function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  const isExpired = useMemo(() => isTokenExpired(token), [token]);

  useEffect(() => {
    setToken(localStorage.getItem('token'));

    //цей івент же не перезапише токен в стейті, бо компонента не перерендериться? він спрацює лише коли сторінка перезагрузиться, так і має бути?
    window.addEventListener('storage', () => {
      setToken(localStorage.getItem('token'));
    });
  }, []);

  /*   const updateToken = useCallback((token) => {
    // це має бути така проста функція?
    localStorage.setItem('token', token)    
  }, []); */

  const updateToken = useCallback(async (login, password) => {
    // чи такого плану?
    const url = 'https://yifbackend.tk/api/Authentication/LoginUser';
    let response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login,
        password,
      }),
    });

    let result = await response.json();
    localStorage.setItem('token', result.token);
    setToken(result.token);
  }, []);

  const removeToken = useCallback(() => {
    // ця функція вішається на кнопку logout?
    // виглядає підозріло просто
    setToken(null);
    localStorage.removeItem('token');
  }, []);

  return (
    <authContext.Provider
      value={{ token, isExpired, updateToken, removeToken }}
    >
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  return useContext(authContext);
}

export { AuthProvider, useAuth };
