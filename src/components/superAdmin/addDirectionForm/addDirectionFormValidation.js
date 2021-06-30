import * as Yup from 'yup';

const addDirectionFormValidator = Yup.object().shape({
  directionCode: Yup.string()
    .required('Введіть код напряму')
    .matches(/^[0-9]*$/, 'Введіть лише числа')
    .min(3, 'Введіть мінімум три цифри')
    .max(3, 'Введіть максимум три цифри'),
  directionName: Yup.string()
    .required('Введіть освітній напрямок')
    .min(3, 'Занадто мала кількість символів, мінімум 3 символи'),
});
export default addDirectionFormValidator;