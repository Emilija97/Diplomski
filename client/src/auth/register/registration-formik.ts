import { FormikConfig } from 'formik';
import * as Yup from 'yup';
import { AuthFormData, REQUIRED_MESSAGE, SHORT_PASSWORD_MESSAGE, WRONG_FORMAT_MESSAGE } from "../form-data";

export const registrationFormikConfig = (onSubmit: () => void): FormikConfig<AuthFormData> => {
  return {
    initialValues: {
      email: '',
      password: '',
      fullName: ''
    },
    validationSchema: Yup.object<AuthFormData>({
      fullName: Yup.string()
        .required(REQUIRED_MESSAGE),
      email: Yup.string()
        .email(WRONG_FORMAT_MESSAGE)
        .required(REQUIRED_MESSAGE),
      password: Yup.string()
        .min(4, SHORT_PASSWORD_MESSAGE)
        .required(REQUIRED_MESSAGE)
    }),
    initialErrors: {
      fullName: REQUIRED_MESSAGE,
      email: REQUIRED_MESSAGE,
      password: REQUIRED_MESSAGE
    },
    onSubmit: values => onSubmit(),
  };
}