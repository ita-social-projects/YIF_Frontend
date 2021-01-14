import React  from 'react';
import {response} from '@testing-library/react';
import useCaptcha from './useCaptcha';

const testToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliNmRkNGY2LTIzMGEtNDA4Ni05YWQ5LTQyYTZlNTEwNmJmOCIsImVtYWlsIjoicm9tYW4uYXJrLmtvQGdtYWlsLmNvbSIsInJvbGVzIjoiR3JhZHVhdGUiLCJleHAiOjE2MDkzMzA2NjR9.EqY773v1vn7_OO72pu8GKpk4ylpQ-UZn8oNQMtP7WPg';
const SITE_KEY = '6Le3gRkaAAAAADJIzK5jv3HegJ7VzkuS0XiBa-mK';

const APIUrl =
    'https://yifbackend.tk/api/Authentication/RegisterUser';

  describe(' hook useCaptcha', () => {

    test('request-promise-native', () => {
      return Promise.resolve({
        ok: true,
        json: () => response,
      })
    });/*

    const request = 'request-promise-native';
    //const  getCaptchaToken = useCaptcha();

    describe('Lib - ReCaptcha test', () => {
      afterEach(() => {
        jest.resetAllMocks();
      });

      it('should request captcha verification', async () => {
        const value = 'foo';
        const expected = true;

        const postSpy = jest.spyOn(request, 'post').mockResolvedValue({ success: true });

        ///const result = await getCaptchaToken.verify(value);

        expect(result).toEqual(expected);
        expect(postSpy).toBeCalledWith({
          url: 'https://www.google.com/recaptcha/api/siteverify',
          qs: { secret: null, response: 'foo' },
          json: true
        });
      });
    });*/
  });
