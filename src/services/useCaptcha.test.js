import React  from 'react';
import {response } from '@testing-library/react';
import useCaptcha from './useCaptcha';

const SITE_KEY = '6Le3gRkaAAAAADJIzK5jv3HegJ7VzkuS0XiBa-mK';

  describe(' hook useCaptcha', () => {
    const APIUrl =
        'https://yifbackend.tk/api/Authentication/RegisterUser';

    test('request-promise-native', () => {
      return Promise.resolve({
        ok: true,
        json: () => response,
      })
    });


   // describe('Lib - ReCaptcha test', () => {
     /* const {getCaptchaToken}  = useCaptcha(APIUrl);
  afterEach(() => {
    jest.resetAllMocks();*/
/*

    it('should request captcha verification', async () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliNmRkNGY2LTIzMGEtNDA4Ni05YWQ5LTQyYTZlNTEwNmJmOCIsImVtYWlsIjoicm9tYW4uYXJrLmtvQGdtYWlsLmNvbSIsInJvbGVzIjoiR3JhZHVhdGUiLCJleHAiOjE2MDkzMzA2NjR9.EqY773v1vn7_OO72pu8GKpk4ylpQ-UZn8oNQMtP7WPg';
      const expected = true;
      const postSpy = jest.fn(request, 'post').mockResolvedValue({ success: true });

      const result = await getCaptchaToken.verify(token);

      wait (() => expect(result).toEqual(expected));

      expect(postSpy).toBeCalledWith({
        url: 'https://www.google.com/recaptcha/api/siteverify',
        qs: { secret: null, response: 'foo' },
        json: true
      });
    });
*/

 /* });*/

  });

