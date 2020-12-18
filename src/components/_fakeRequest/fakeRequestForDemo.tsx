import React from 'react';
import { useDispatch } from 'react-redux';
import { requestFailure } from '../../store/reducers/requestStatus';
import fakeRequestService from '../../services/fakeRequestService';

const FakeRequest = () => {
  const dispatch = useDispatch();
  return (
    <span
      onClick={() => {
        dispatch(fakeRequestService());
        setTimeout(() => dispatch(requestFailure()), 3000);
      }}
    >
      Зареєструйся
    </span>
  );
};

export default FakeRequest;
