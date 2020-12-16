import React from 'react';

import style from './fakeRequest.module.scss';

import { useSelector, useDispatch } from 'react-redux';
import {
  requestFailure,
  requestStatusState,
} from '../../store/reducers/requestStatus';
import fakeRequestService from '../../services/fakeRequestService';
import ErrorButton from './errorButton';

const FakeRequest = () => {
  const state = useSelector(requestStatusState);

  const dispatch = useDispatch();

  return (
    <div className={style.container}>
      <div className={style.div}>
        <h1>GET FAKE REQUEST (error boundary)</h1>
        <a
          href='/'
          onClick={(e) => {
            e.preventDefault();
            dispatch(fakeRequestService());
          }}
        >
          GET DATA
        </a>
        <a
          href='/'
          onClick={(e) => {
            e.preventDefault();
            dispatch(requestFailure());
          }}
        >
          GET ERROR 404
        </a>
        <a
          href='/'
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {<ErrorButton />}
        </a>
        <p> {state.succes.toString()} </p>
      </div>
    </div>
  );
};

export default FakeRequest;
