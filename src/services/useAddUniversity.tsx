import { useState } from 'react';
import { requestSecureData } from './requestDataFunction';
import { useHistory } from 'react-router-dom';
import { useAuth } from './tokenValidator';

const useAddUniversity = (
  endpoint: string,
  lat: number,
  lng: number,
  picture: string
) => {
  const { token, getToken } = useAuth();
  const history = useHistory();
  const [universityName, setUniversityName] = useState('');
  const [universityAbbreviation, setUniversityAbbreviation] = useState('');
  const [universityAdress, setUniversityAdress] = useState('');
  const [universitySite, setUniversitySite] = useState('');
  const [universityEmail, setUniversityEmail] = useState('');
  const [universityPhone, setUniversityPhone] = useState('');
  const [universityDescription, setUniversityDescription] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [error, setError] = useState({
    hasError: false,
    errorStatusCode: '',
    errorMessage: '',
    redirectLink: '',
  });

  const [success, setSuccess] = useState({
    hasSuccess: false,
    successStatusCode: '',
    successMessage: '',
  });

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUniversityName(value);
  };

  const handleChangeAbbreviation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUniversityAbbreviation(value);
  };

  const handleChangeAdress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUniversityAdress(value);
  };

  const handleChangeSite = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUniversitySite(value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUniversityEmail(value);
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUniversityPhone(value);
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setUniversityDescription(value);
  };

  const handleChangeAdminEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAdminEmail(value);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitted(true);
    setError({
      hasError: false,
      errorStatusCode: '',
      errorMessage: '',
      redirectLink: '',
    });
    setSuccess({
      hasSuccess: false,
      successStatusCode: '',
      successMessage: '',
    });

    getToken();

    requestSecureData(
      `${endpoint}SuperAdmin/AddUniversityAndAdmin`,
      'POST',
      token!,
      {
        name: universityName,
        abbreviation: universityAbbreviation,
        site: universitySite,
        address: universityAdress,
        phone: universityPhone,
        email: universityEmail,
        description: universityDescription,
        lat: lat,
        lon: lng,
        imageApiModel: {
          photo: picture,
        },
        universityAdminEmail: adminEmail,
      }
    )
      .then((res: any) => {
        const statusCode = res.statusCode.toString();
        if (statusCode.match(/^[23]\d{2}$/)) {
          setError({
            hasError: false,
            errorStatusCode: '',
            errorMessage: '',
            redirectLink: '',
          });
          setSuccess({
            hasSuccess: true,
            successStatusCode: res.statusCode,
            successMessage: res.data.message || 'Університет успішно додано',
          });
          setTimeout(() => {
            setSuccess({
              hasSuccess: false,
              successStatusCode: '',
              successMessage: '',
            });
          }, 3000);
          setSubmitted(false);
          // history.push(pathToRedirect);
        } else {
          setError({
            hasError: true,
            errorStatusCode: res.statusCode,
            errorMessage:
              res.data.message || 'Щось пішло не так, спробуйте знову.',
            redirectLink: '',
          });
        }
      })
      .catch((error) => {
        setError({
          hasError: true,
          errorStatusCode: error.statusCode,
          errorMessage: 'Щось пішло не так, спробуйте знову.',
          redirectLink: '',
        });
      });
  };
  return {
    handleChangeName,
    handleChangeAbbreviation,
    handleChangeAdress,
    handleChangeSite,
    handleChangeEmail,
    handleChangePhone,
    handleChangeDescription,
    handleChangeAdminEmail,
    handleSubmit,
    picture,
    lat,
    lng,
    submitted,
    error,
    success,
  };
};

export default useAddUniversity;
