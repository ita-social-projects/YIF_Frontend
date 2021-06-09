import * as Yup from 'yup';

const editSpecialtyValidation = Yup.object().shape({
  specialtyName: Yup.string()
    .min(5, 'Мінімум 5 символів!')
    .required('Заповніть поле'),
  paymentForm: Yup.string()
    .min(5, 'Мінімум 5 символів!')
    .required('Заповніть поле'),
  educationalProgramLink: Yup.string()
    .min(5, 'Мінімум 5 символів!')
    .required('Заповніть поле'),
  educationFormName: Yup.string()
    .min(5, 'Мінімум 5 символів!')
    .required('Заповніть поле'),
});

export default editSpecialtyValidation;
