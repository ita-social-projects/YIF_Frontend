import { rejects } from 'assert';
import { resolve } from 'path';
import { requestData } from './requestDataFunction';

const mockJsonPromise = Promise.resolve('received data');
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

it('method GET', () => {
  requestData('URL', 'GET');
  expect(global.fetch).toHaveBeenCalledWith('URL', {
    body: undefined,
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  });
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

it('method POST', () => {
  requestData('URL', 'POST', { filed1: 'value1' });
  expect(global.fetch).toHaveBeenCalledWith('URL', {
    body: JSON.stringify({ filed1: 'value1' }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });
  expect(global.fetch).toHaveBeenCalledTimes(2);
});

it('request Data on success', () => {
  const request = requestData('', '', '');
  return expect(request).resolves.toMatchObject({
    data: 'received data',
    statusCode: 200,
  });
});
