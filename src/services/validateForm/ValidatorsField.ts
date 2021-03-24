import * as Yup from 'yup';

export const validationField = Yup.object().shape({
  email: Yup.string()
    .email('Введіть дійсну електронну адресу')
    .required('Заповніть поле')
    .max(
      70,
      'Занадто велика кількість символів,перевірте правильність ведення електронної пошти'
    ),

  password: Yup.string()
    .min(8, 'Пароль має містити мінімум 8 символів')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])/,
      'Пароль повинен містити різні типи символів: цифри, латинські букви у верхньому та нижньому регістрі та спецсимволи.'
    )
    .required('Заповніть поле'),

  confirmPassword: Yup.string()
    .min(8, 'Пароль має містити мінімум 8 символів')
    .oneOf([Yup.ref('password'), null], 'Паролі мають співпадати')
    .required('Заповніть поле'),

  firstName: Yup.string()
    .min(2, 'Недостатня кількість введених символів')
    .max(50, 'Кількість введених символів перевищує допустиме значення'),

  lastName: Yup.string()
    .min(2, 'Недостатня кількість введених символів')
    .max(50, 'Кількість введених символів перевищує допустиме значення'),

  fathersName: Yup.string()
    .min(2, 'Замала кількість введених символів')
    .max(50, 'Кількість введених символів перевищує допустиме значення'),

  phone: Yup.string()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      'Номер телефону введено невірно, введіть будь ласка в такому форматі +380670000000'
    )
    .min(12, 'Номер телефону має містити не менше ніж 12 символів')
    .max(13, 'Кількість введених символів перевищує допустиме значення'),

  institutionOfEducationName: Yup.string()
    .min(2, 'Замала кількість введених символів')
    .max(50, 'Кількість введених символів перевищує допустиме значення')
    .required('Заповніть поле'),

  institutionOfEducationType: Yup.string().required('Оберіть тип закладу'),

  institutionOfEducationAbbreviation: Yup.string()
    .min(2, 'Замала кількість введених символів')
    .max(10, 'Кількість введених символів перевищує допустиме значення')
    .required('Заповніть поле'),

  institutionOfEducationAddress: Yup.string()
    .min(2, 'Замала кількість введених символів')
    .max(50, 'Кількість введених символів перевищує допустиме значення')
    .required('Заповніть поле'),

  institutionOfEducationSite: Yup.string()
    .matches(
      /^(http\:\/\/|https\:\/\/)/i,
      'Aдреса повинна починатись з http:// або https://'
    )
    .matches(
      /^(http\:\/\/|https\:\/\/)([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$/i,
      'Адресу сайту введено не вірно'
    )
    .min(2, 'Замала кількість введених символів')
    .max(50, 'Кількість введених символів перевищує допустиме значення')
    .required('Заповніть поле'),

  institutionOfEducationPhone: Yup.string()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      'Номер телефону введено невірно, введіть будь ласка в такому форматі +380670000000'
    )
    .min(12, 'Номер телефону має містити не менше ніж 12 символів')
    .max(13, 'Кількість введених символів перевищує допустиме значення')
    .required('Вкажіть номер телефону'),

  institutionOfEducationEmail: Yup.string()
    .email('Введіть дійсну електронну адресу')
    .required('Заповніть поле')
    .max(
      70,
      'Занадто велика кількість символів,перевірте правильність ведення електронної пошти'
    ),

  institutionOfEducationDescription: Yup.string()
    .required('Заповніть поле')
    .min(50, 'Кількість символів повинна бути більше 50'),

  institutionOfEducationLat: Yup.string().required('Вкажіть розташування'),

  institutionOfEducationPicture: Yup.string().required('Оберіть зображення'),

  institutionOfEducationAdminEmail: Yup.string()
    .email('Введіть дійсну електронну адресу')
    .required('Заповніть поле')
    .max(
      70,
      'Занадто велика кількість символів,перевірте правильність ведення електронної пошти'
    ),

  //  school: Yup.string()
  //     .min(2, 'Недостатня кількість введених символів')
  //     .max(50, 'Кількість введених символів перевищує допустиме значення')
  //     .required('Заповніть поле'),
});
