import React from 'react';
import style from './fakeRequest.module.scss';
import useLogin from '../../services/useLogin';
import useRegistration from '../../services/useRegistration';

const FakeLogin: React.FC<any> = () => {
  const APIUrl: string = 'https://yifbackend.tk/api/Authentication/LoginUser';
  const {
    handleChangeEmail,
    handleChangePassword,
    handleLogOut,
    handleSubmit,
    email,
    password,
    error,
  } = useLogin(APIUrl);

  return (
    <div className={style.container}>
      <div className={style.div}>
        <h1>GET FAKE LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='email'
            placeholder='login'
            value={email.email}
            onChange={handleChangeEmail}
          ></input>
          <br />
          <input
            type='password'
            name='password'
            placeholder='pass'
            value={password.password}
            onChange={handleChangePassword}
          ></input>
          <br />
          <button type='submit'>Login</button>
          <button type='button' onClick={handleLogOut}>
            Logout
          </button>
          {error.hasError && (
            <p>{`Status code: ${error.errorStatusCode}; Error msg: ${error.errorMessage}`}</p>
          )}
        </form>
      </div>
    </div>
  );
};

const FakeRegistration: React.FC<any> = () => {
  const APIUrl: string =
    'https://yifbackend.tk/api/Authentication/RegisterUser';
  const {
    handleChangeEmail,
    handleChangePassword,
    handleChangeConfirmPassword,
    handleSubmit,
    email,
    password,
    confirmPassword,
    error,
  } = useRegistration(APIUrl);

  return (
    <div className={style.container}>
      <div className={style.div}>
        <h1>GET FAKE REGISTRATION</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='email'
            placeholder='login'
            value={email.email}
            onChange={handleChangeEmail}
          ></input>
          <br />
          <input
            type='password'
            name='password'
            placeholder='pass'
            value={password.password}
            onChange={handleChangePassword}
          ></input>
          <br />
          <input
            type='password'
            name='confirmPassword'
            placeholder='pass'
            value={confirmPassword.confirmPassword}
            onChange={handleChangeConfirmPassword}
          ></input>
          <br />
          <button type='submit'>Reg</button>
          {error.hasError && (
            <p>{`Status code: ${error.errorStatusCode}; Error msg: ${error.errorMessage}`}</p>
          )}
        </form>
      </div>
    </div>
  );
};
export { FakeLogin, FakeRegistration };

/*
import { useDispatch } from 'react-redux';
import loginUserHook from '../../services/loginUserHook';
import registUserHook from '../../services/registrUserHook';
import useLogin from '../../services/useLogin';

interface IInitState {
  username: string;
  password: string;
  submitted: boolean;
}

const FakeLogin: React.FC<any> = () => {
  
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: '',
    password: '',
    submitted: false,
  });
  const handleChangeName = (e: any) => {
    const { value } = e.target;
    setUser({
      ...user,
      username: value,
    });
  };
  const handleChangePass = (e: any) => {
    const { value } = e.target;
    setUser({
      ...user,
      password: value,
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setUser({
      ...user,
      submitted: true,
    });
    const { username, password } = user;

    if (username && password) {
      dispatch(loginUserHook(username, password));
      dispatch(registUserHook(username, username, password, password));
    }
  };

  return (
    <div className={style.container}>
      <div className={style.div}>
        <h1>GET FAKE LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='username'
            placeholder='login'
            value={user.username}
            onChange={handleChangeName}
          ></input>
          <br />
          <input
            type='password'
            name='password'
            placeholder='pass'
            value={user.password}
            onChange={handleChangePass}
          ></input>
          <br />
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default FakeLogin;
*/
