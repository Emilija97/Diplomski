import { FormikConfig } from 'formik';
import * as Yup from 'yup';
import { AuthFormData, REQUIRED_MESSAGE } from "../form-data";

export const loginFormikConfig = (onSubmit: () => void): FormikConfig<AuthFormData> => {
  return {
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object<AuthFormData>({
      email: Yup.string()
        .required(REQUIRED_MESSAGE),
      password: Yup.string()
        .required(REQUIRED_MESSAGE)
    }),
    initialErrors: {
      email: REQUIRED_MESSAGE,
      password: REQUIRED_MESSAGE
    },
    onSubmit: values => onSubmit(),
  };
}