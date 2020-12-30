import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import {
  loginStart,
  loginFailure,
  loginSuccess,
} from '../store/reducers/loginStatus.reducer';
import loginUserHook from './loginUserHook';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('LOGIN USER HOOK', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('shoud login user', () => {
    fetchMock.postOnce('https://yifbackend.tk/api/Authentication/LoginUser', {
      body: {
        email: 'email',
        password: 'password',
      },
      headers: { 'content-type': 'application/json' },
    });
    const expectedActions = [
      loginStart(),
      loginSuccess({
        data: {
          email: 'email',
          password: 'password',
        },
        statusCode: 200,
      }),
    ];
    const store = mockStore({});
    return store.dispatch<any>(loginUserHook('email', 'password')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('shoud fail, catch error', () => {
    fetchMock.postOnce(
      'https://yifbackend.tk/api/Authentication/LoginUser',
      409
    );
    const expectedActions = [
      loginStart(),
      loginFailure({
        message:
          'invalid json response body at https://yifbackend.tk/api/Authentication/LoginUser reason: Unexpected end of JSON input',
        type: 'invalid-json',
      }),
    ];
    const store = mockStore({});
    return store.dispatch<any>(loginUserHook('email', 'password')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
