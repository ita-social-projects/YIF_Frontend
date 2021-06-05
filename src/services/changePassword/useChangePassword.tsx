import { useState } from 'react';
import { APIUrl } from '../endpoints';
import { useCaptcha } from '../useCaptcha';
import { requestSecureData } from '../../services/requestDataFunction';
import { useAuth } from '.././tokenValidator';

const useChangePassword = (endpoint: string) => {
    const { getToken } = useAuth();
    const captcha = useCaptcha(APIUrl);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState({
        hasError: false,
        errorStatusCode: '',
        errorMessage: '',
    });
    const [success, setSuccess] = useState({
        hasSuccess: false,
        successStatusCode: '',
        successMessage: '',
    });

    const handleSubmit = async ({
        oldPassword,
        newPassword,
        confirmNewPassword }: {
            oldPassword: string,
            newPassword: string,
            confirmNewPassword: string
        }) => {
        setSubmitted(true);
        setError({ hasError: false, errorStatusCode: '', errorMessage: '' });
        setSuccess({
            hasSuccess: false,
            successStatusCode: '',
            successMessage: '',
        });

        const recaptchaToken = await captcha.getCaptchaToken();
        const currentToken = await getToken();

        requestSecureData(endpoint, 'PUT', currentToken, {
            oldPassword,
            newPassword,
            confirmNewPassword,
            recaptchaToken
        })
            .then((res: any) => {
                const statusCode = res.statusCode.toString();
                if (statusCode.match(/^[23]\d{2}$/)) {
                    setError({ hasError: false, errorStatusCode: '', errorMessage: '' });
                    setSuccess({
                        hasSuccess: true,
                        successStatusCode: res.statusCode,
                        successMessage: res.data.message || 'Дані збережені',
                    });
                    setTimeout(() => {
                        setSuccess({
                            hasSuccess: false,
                            successStatusCode: '',
                            successMessage: '',
                        });
                    }, 3000);
                    setSubmitted(false);
                } else {
                    setError({
                        hasError: true,
                        errorStatusCode: res.statusCode,
                        errorMessage:
                            res.data.message || 'Щось пішло не так, спробуйте знову.',
                    });
                }
            })
            .catch((error) => {
                setError({
                    hasError: true,
                    errorStatusCode: error.statusCode,
                    errorMessage: 'Щось пішло не так, спробуйте знову.',
                });
            });
    };

    return {
        handleSubmit,
        submitted,
        error,
        success,
        setError,
    };
};


export default useChangePassword;


