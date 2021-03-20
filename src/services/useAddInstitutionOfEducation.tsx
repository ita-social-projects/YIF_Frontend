import { useState } from 'react';
import { requestSecureData } from './requestDataFunction';
import { useHistory } from 'react-router-dom';
import { useAuth } from './tokenValidator';

const useAddInstitutionOfEducation = (
  endpoint: string,
  lat: number,
  lon: number,
  picture: string
) => {
  const { token, getToken } = useAuth();
  const history = useHistory();
  const [institutionOfEducationName, setInstitutionOfEducationName] = useState(
    ''
  );

  const [institutionOfEducationType, setInstitutionOfEducationType] = useState(
    ''
  );

  const [
    institutionOfEducationAbbreviation,
    setInstitutionOfEducationAbbreviation,
  ] = useState('');

  const [
    institutionOfEducationAdress,
    setInstitutionOfEducationAdress,
  ] = useState('');

  const [institutionOfEducationSite, setInstitutionOfEducationSite] = useState(
    ''
  );

  const [
    institutionOfEducationEmail,
    setInstitutionOfEducationEmail,
  ] = useState('');

  const [
    institutionOfEducationPhone,
    setInstitutionOfEducationPhone,
  ] = useState('');

  const [
    institutionOfEducationDescription,
    setInstitutionOfEducationDescription,
  ] = useState('');

  const [
    institutionOfEducationAdminEmail,
    setInstitutionOfEducationAdminEmail,
  ] = useState('');

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
    setInstitutionOfEducationName(value);
  };

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInstitutionOfEducationType(value);
  };

  const handleChangeAbbreviation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInstitutionOfEducationAbbreviation(value);
  };

  const handleChangeAdress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInstitutionOfEducationAdress(value);
  };

  const handleChangeSite = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInstitutionOfEducationSite(value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInstitutionOfEducationEmail(value);
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInstitutionOfEducationPhone(value);
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setInstitutionOfEducationDescription(value);
  };

  const handleChangeAdminEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInstitutionOfEducationAdminEmail(value);
  };

  const handleSubmit = async (
    e: React.ChangeEvent<HTMLFormElement>,
    pathToRedirect: string
  ) => {
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
        lon: lon,
        institutionOfEducationType: institutionOfEducationType,
        imageApiModel: {
          photo: picture,
        },
        institutionOfEducationAdminEmail: institutionOfEducationAdminEmail,
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
            history.push(pathToRedirect);
          }, 3000);
          setSubmitted(false);
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
    handleChangeType,
    handleChangeAbbreviation,
    handleChangeAdress,
    handleChangeSite,
    handleChangeEmail,
    handleChangePhone,
    handleChangeDescription,
    handleChangeAdminEmail,
    handleSubmit,
    submitted,
    error,
    success,
  };
};

export default useAddInstitutionOfEducation;
