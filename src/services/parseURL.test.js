import { parse } from 'url';
import parseURL from './parseURL';

describe('parseURL', () => {
  it('parse url correctly', () => {
    const url = '?id=user_id&token=random_token';
    expect(parseURL(url)).toMatchObject({
      id: 'user_id',
      token: 'random_token',
    });
  });
});
