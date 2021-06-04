import * as Yup from 'yup';

const addNewSpeciatyFormValidator = Yup.object().shape({
  directionCode: Yup.string()
      .required('Введіть код спеціальності')
      .matches(/^[0-9]*$/, 'Введіть лише числа')
      .min(3, 'Введіть мінімум три цифри')
      .max(3, 'Введіть максимум три цифри'),
  directionName: Yup.string()
      .required('Введіть освітній напрямок')
      .min(
        3,
        'Занадто мала кількість символів, мінімум 3 символи'
      ),
  specialtyDescription: Yup.string()
      .required('Напишіть опис спеціальності')
      .min(10, 'Мінімум 10 символів')
});
export default addNewSpeciatyFormValidator;