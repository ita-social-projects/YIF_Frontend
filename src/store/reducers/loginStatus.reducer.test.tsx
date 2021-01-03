import loginStatusReducer, {
  loginStart,
  loginFailure,
  loginSuccess,
  loginStatusState,
} from './loginStatus.reducer';

describe('LOGIN STATUS REDUCER', () => {
  it('should return the initial state', () => {
    const emptyObj: any = {};
    const mockState: any = { loginStatus: true };

    expect(loginStatusReducer(undefined, emptyObj)).toEqual({
      loading: false,
      data: {},
      statusCode: 0,
      errorMessage: '',
    });
    expect(loginStatusState(mockState)).toEqual(true);
  });

  it('should change state error to true', () => {
    const action = {
      statusCode: 409,
      data: {
        message: 'error',
      },
    };
    expect(loginStatusReducer(undefined, loginFailure(action))).toEqual({
      loading: false,
      data: {},
      statusCode: action.statusCode,
      errorMessage: action.data.message,
    });
  });
  it('should change state loading to true', () => {
    expect(loginStatusReducer(undefined, loginStart())).toEqual({
      loading: true,
      data: {},
      statusCode: 0,
      errorMessage: '',
    });
  });
  it('should change state to succesfull', () => {
    const action = {
      statusCode: 201,
      data: 'success',
    };
    expect(loginStatusReducer(undefined, loginSuccess(action))).toEqual({
      loading: false,
      data: action.data,
      statusCode: action.statusCode,
      errorMessage: '',
    });
  });
});
