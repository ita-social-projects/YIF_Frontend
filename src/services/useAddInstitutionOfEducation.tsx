import { useState } from 'react';
import { requestSecureData } from './requestDataFunction';
import { useHistory } from 'react-router-dom';
import { useAuth } from './tokenValidator';

const useAddinstitutionOfEducation = (
  endpoint: string,
  lat: number,
  lng: number,
  picture: string
) => {
  const { token, getToken } = useAuth();
  const history = useHistory();
  const [institutionOfEducationName, setinstitutionOfEducationName] = useState(
    ''
  );
  const [
    institutionOfEducationAbbreviation,
    setinstitutionOfEducationAbbreviation,
  ] = useState('');
  const [
    institutionOfEducationAdress,
    setinstitutionOfEducationAdress,
  ] = useState('');
  const [institutionOfEducationSite, setinstitutionOfEducationSite] = useState(
    ''
  );
  const [
    institutionOfEducationEmail,
    setinstitutionOfEducationEmail,
  ] = useState('');
  const [
    institutionOfEducationPhone,
    setinstitutionOfEducationPhone,
  ] = useState('');
  const [
    institutionOfEducationDescription,
    setinstitutionOfEducationDescription,
  ] = useState('');
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
    setinstitutionOfEducationName(value);
  };

  const handleChangeAbbreviation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setinstitutionOfEducationAbbreviation(value);
  };

  const handleChangeAdress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setinstitutionOfEducationAdress(value);
  };

  const handleChangeSite = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setinstitutionOfEducationSite(value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setinstitutionOfEducationEmail(value);
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setinstitutionOfEducationPhone(value);
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setinstitutionOfEducationDescription(value);
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
      `${endpoint}SuperAdmin/AddinstitutionOfEducationAndAdmin`,
      'POST',
      token!,
      {
        name: institutionOfEducationName,
        abbreviation: institutionOfEducationAbbreviation,
        site: institutionOfEducationSite,
        address: institutionOfEducationAdress,
        phone: institutionOfEducationPhone,
        email: institutionOfEducationEmail,
        description: institutionOfEducationDescription,
        lat: lat,
        lon: lng,
        imageApiModel: {
          photo: picture,
        },
        institutionOfEducationAdminEmail: adminEmail,
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

export default useAddinstitutionOfEducation;
