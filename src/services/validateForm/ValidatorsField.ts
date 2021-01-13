
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
    .min(2, 'Замала кількість введених символів')
    .max(50, 'Кількість введених символів перевищує допустиме значення')
    .required('Заповніть поле'),

  lastName: Yup.string()
     .min(2, 'Замала кількість введених символів')
     .max(50, 'Кількість введених символів перевищує допустиме значення')
     .required('Заповніть поле'),

  fathersName: Yup.string()
     .min(2, 'Замала кількість введених символів')
     .max(50, 'Кількість введених символів перевищує допустиме значення')
     .required('Заповніть поле'),

  phone: Yup.string()
      .matches(
          /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
      , 'Номер телефону введено невірно, ввейдіть будь ласка в такому форматі 380670000000')
      .min(12, 'Занадто короткий номер телефону')
      .max(12, 'Кількість введених символів перевищує допустиме значення')
      .required('Заповніть поле'),

   school: Yup.string()
      .min(2, 'Замала кількість введених символів')
      .max(50, 'Кількість введених символів перевищує допустиме значення')
      .required('Заповніть поле'),
});
