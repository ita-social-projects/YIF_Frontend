import { requestStart, requestFailure, requestSuccess } from './requestStatus';
import requestStatusReducer from './requestStatus';

describe('ERROR BOUNDARY', () => {
  it('should return the initial state', () => {
    const emptyObj: any = {};
    expect(requestStatusReducer(undefined, emptyObj)).toEqual({
      loading: false,
      error: false,
      succes: false,
    });
  });

  it('should change state error to true', () => {
    expect(requestStatusReducer(undefined, requestFailure())).toEqual({
      loading: false,
      error: true,
      succes: false,
    });
  });
  it('should change state loading to true', () => {
    expect(requestStatusReducer(undefined, requestStart())).toEqual({
      loading: true,
      error: false,
      succes: false,
    });
  });
  it('should change state to succesfull', () => {
    expect(requestStatusReducer(undefined, requestSuccess())).toEqual({
      loading: false,
      error: false,
      succes: true,
    });
  });
});
