
import { useEffect, useState } from 'react';
import useRegistration from './useRegistration';

declare global {
  interface Window {
    captchaOnLoad: () => void
    grecaptcha: ReCaptchaInstance
  }
}

interface ReCaptchaInstance {
  ready: (cb: () => any) => any
  execute: (key: string, options: { action: string }) => Promise<string>
}

type token = string | undefined;
type inputRecaptcha = HTMLInputElement;

export const useCaptcha = (endpoint: string) => {

  const APIUrl: string =
      'https://yifbackend.tk/api/Authentication/RegisterUser';
  const useYIFRegistration = useRegistration(APIUrl);

  const SITE_KEY = '6Le3gRkaAAAAADJIzK5jv3HegJ7VzkuS0XiBa-mK';

  // const [loading, setLoading] = useState(false);
  //const [response, setResponse] = useState(null);
  //const[token, setToken] = useState({recaptchaToken: ''});

  const handleLoaded = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(SITE_KEY, {action: 'submit'})
          .then((token: string) => {
            submitData(token)
          });
    });
  }
  useEffect(() => {

    const loadScriptByURL = (id: string, url: string, callback:() => void) => {
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
        //script.addEventListener('load', () => handleLoaded);
      }
      if (isScriptExist && callback) callback();
    }

    loadScriptByURL('recaptcha-key',`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`,
        function () {
          console.log("Script loaded!");
        });

  }, []);



  const submitData = (token: string) => {
    console.log(token)
    useYIFRegistration.handleChangeRecaptchaToken(token)

    /*fetch( endpoint, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "recaptchaToken": token
      })
    }).then(res => res.json()).then(res => {
      setLoading(false);
      setResponse(res);
    });*/
  }
  return {
    handleLoaded,
    submitData
  }

}
