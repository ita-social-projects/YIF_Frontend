import {
  requestStart,
  requestFailure,
  requestSuccess,
} from './errorBoundryStatus.reducer';
import errorBoundryStatusReducer from './errorBoundryStatus.reducer';

describe('ERROR BOUNDARY', () => {
  it('should return the initial state', () => {
    const emptyObj: any = {};
    expect(errorBoundryStatusReducer(undefined, emptyObj)).toEqual({
      loading: false,
      error: false,
      succes: false,
    });
  });

  it('should change state error to true', () => {
    expect(errorBoundryStatusReducer(undefined, requestFailure())).toEqual({
      loading: false,
      error: true,
      succes: false,
    });
  });
  it('should change state loading to true', () => {
    expect(errorBoundryStatusReducer(undefined, requestStart())).toEqual({
      loading: true,
      error: false,
      succes: false,
    });
  });
  it('should change state to succesfull', () => {
    expect(errorBoundryStatusReducer(undefined, requestSuccess())).toEqual({
      loading: false,
      error: false,
      succes: true,
    });
  });
});
