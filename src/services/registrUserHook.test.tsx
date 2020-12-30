import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import {
  registrStart,
  registrFailure,
  registrSuccess,
} from '../store/reducers/registrStatus.reducer';
import registerUserHook from './registrUserHook';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('REGISTER USER HOOK', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('shoud register new user', () => {
    fetchMock.postOnce(
      'https://yifbackend.tk/api/Authentication/RegisterUser',
      {
        body: {
          email: 'email',
          login: 'login',
          password: 'password',
          confirmPassword: 'confirmPassword',
        },
        headers: { 'content-type': 'application/json' },
      }
    );
    const expectedActions = [
      registrStart(),
      registrSuccess({
        data: {
          confirmPassword: 'confirmPassword',
          email: 'email',
          login: 'login',
          password: 'password',
        },
        statusCode: 200,
      }),
    ];
    const store = mockStore({});
    return store
      .dispatch<any>(
        registerUserHook('email', 'login', 'password', 'confirmPassword')
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('shoud fail, catch error', () => {
    fetchMock.postOnce(
      'https://yifbackend.tk/api/Authentication/RegisterUser',
      409
    );
    const expectedActions = [
      registrStart(),
      registrFailure({
        message:
          'invalid json response body at https://yifbackend.tk/api/Authentication/RegisterUser reason: Unexpected end of JSON input',
        type: 'invalid-json',
      }),
    ];
    const store = mockStore({});
    return store
      .dispatch<any>(
        registerUserHook('email', 'login', 'password', 'confirmPassword')
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
