import { useEffect } from 'react';

declare global {
  interface Window {
    captchaOnLoad: () => void;
    grecaptcha: ReCaptchaInstance;
  }
}

interface ReCaptchaInstance {
  ready: (cb: () => any) => any;
  execute: (key: string, options: { action: string }) => Promise<string>;
}

export const useCaptcha = (endpoint: string) => {

  const getCaptchaToken = (): Promise<string> => {
    return new Promise((resolve) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(`${process.env.REACT_APP_SITE_KEY}`, { action: 'submit' })
          .then((token: string) => {
            resolve(token);
          });
      });
    });
  };

  useEffect(() => {
    const isScriptExist = document.getElementById('recaptcha-key');
    let script: any;
    if (!isScriptExist) {
      script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.REACT_APP_SITE_KEY}`;
      script.id = 'recaptcha-key';
      document.body.appendChild(script);
    }

    return () => {
      let unwantedDiv = document.querySelectorAll('.grecaptcha-badge')[0]
        .parentElement;
      if (script && unwantedDiv) {
        script.remove();
        unwantedDiv?.remove();
      }
    };
  }, []);

  return {
    getCaptchaToken,
  };
};
