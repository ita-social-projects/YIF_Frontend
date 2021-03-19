import * as Yup from 'yup';

const passwordValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, 'Пароль має містити мінімум 8 символів')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])/,
      'Пароль повинен містити різні типи символів: цифри, латинські букви у верхньому та нижньому регістрі та спецсимволи.'
    )
    .required('Заповніть поле'),

  confirmNewPassword: Yup.string()
    .min(8, 'Пароль має містити мінімум 8 символів')
    .oneOf([Yup.ref('newPassword'), null], 'Паролі мають співпадати')
    .required('Заповніть поле'),
});

export default passwordValidationSchema;
