
import { useEffect } from 'react';

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


export const useCaptcha = (endpoint: string) => {

  const SITE_KEY = '6Le3gRkaAAAAADJIzK5jv3HegJ7VzkuS0XiBa-mK';

  const getCaptchaToken = (): Promise<string> => {
   return new Promise ((resolve) =>{
     window.grecaptcha.ready(() => {
       window.grecaptcha
           .execute(SITE_KEY, {action: 'submit'})
           .then((token: string) => {
             resolve(token);
           });
     });
   });
  };

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
      }
      if (isScriptExist && callback) callback();

    };

    loadScriptByURL('recaptcha-key',
        `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`,
        function () {
          console.log("Script loaded!");
        });
    return
  }, []);

  return {
    getCaptchaToken
  };

  const unload = (SITE_KEY:string) => {
    const nodeBadge = document.querySelector('.grecaptcha-badge');
    if (nodeBadge) {
      document.body.removeChild(nodeBadge);
    }

    const scriptSelector = 'script[src=\'https://www.google.com/recaptcha/api.js?render=' +
        SITE_KEY + '\']';
    const script = document.querySelector(scriptSelector);
    if (script) {
      script.remove();
    }
  };

};
