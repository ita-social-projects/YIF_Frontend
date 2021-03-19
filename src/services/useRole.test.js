import useRole from './useRole';
import { store } from '../store/store';
import { setRoleReducer } from '../store/reducers/setRoleReducer';

describe('USE ROLE HOOK', () => {
  const { pathToRedirect } = useRole();
  it('shoud return empty path', () => {
    store.dispatch(setRoleReducer(''));
    expect(pathToRedirect()).toBe('');
  });
  it('shoud return /cabinet', () => {
    store.dispatch(setRoleReducer('Graduate'));
    expect(pathToRedirect()).toBe('/cabinet');
  });
  it('shoud return /superAdminAccount path', () => {
    store.dispatch(setRoleReducer('SuperAdmin'));
    expect(pathToRedirect()).toBe('/superAdminAccount');
  });
});
