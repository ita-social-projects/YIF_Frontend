import React, { useState } from 'react';
import style from './fakeRequest.module.scss';
import { useDispatch } from 'react-redux';
import loginUserHook from '../../services/loginUserHook';
import registUserHook from '../../services/registrUserHook';

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
            onChange={handleChangeName}
          ></input>
          <br />
          <input
            type='password'
            name='password'
            placeholder='pass'
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
