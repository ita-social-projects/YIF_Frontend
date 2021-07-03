import * as Yup from 'yup';

export const addNewAdminValidation = Yup.object().shape({
    email: Yup.string()
        .email('Введіть дійсну електронну адресу')
        .required('Заповніть поле')
        .max(
        70,
        'Занадто велика кількість символів,перевірте правильність ведення електронної пошти'
        ),
});
export default addNewAdminValidation;