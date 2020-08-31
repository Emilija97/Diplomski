import { FormikConfig } from 'formik';
import * as Yup from 'yup';
import { AuthFormData, REQUIRED_MESSAGE } from "../form-data";

export const recoverFormikConfig = (onSubmit: () => void): FormikConfig<AuthFormData> => {
  return {
    initialValues: {
      password: ''
    },
    validationSchema: Yup.object<AuthFormData>({
      password: Yup.string()
        .required(REQUIRED_MESSAGE)
    }),
    initialErrors: {
      password: REQUIRED_MESSAGE
    },
    onSubmit: values => onSubmit(),
  };
}