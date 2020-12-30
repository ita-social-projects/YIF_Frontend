import registrStatusReducer, {
  registrStart,
  registrFailure,
  registrSuccess,
  registrStatusState,
} from './registrStatus.reducer';

describe('REGISTRATION STATUS REDUCER', () => {
  it('should return the initial state', () => {
    const emptyObj: any = {};
    const mockState: any = { registrStatus: true };

    expect(registrStatusReducer(undefined, emptyObj)).toEqual({
      loading: false,
      data: {},
      statusCode: 0,
      errorMessage: '',
    });
    expect(registrStatusState(mockState)).toEqual(true);
  });

  it('should change state error to true', () => {
    const action = {
      statusCode: 409,
      data: {
        message: 'error',
      },
    };
    expect(registrStatusReducer(undefined, registrFailure(action))).toEqual({
      loading: false,
      data: {},
      statusCode: action.statusCode,
      errorMessage: action.data.message,
    });
  });
  it('should change state loading to true', () => {
    expect(registrStatusReducer(undefined, registrStart())).toEqual({
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
    expect(registrStatusReducer(undefined, registrSuccess(action))).toEqual({
      loading: false,
      data: action.data,
      statusCode: action.statusCode,
      errorMessage: '',
    });
  });
});
