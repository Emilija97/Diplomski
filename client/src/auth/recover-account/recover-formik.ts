import { FormikConfig } from 'formik';
import * as Yup from 'yup';
import { AuthFormData, REQUIRED_MESSAGE } from "../form-data";

export const recoverFormikConfig = (onSubmit: () => void): FormikConfig<AuthFormData> => {
  return {
    initialValues: {
      email: '',
      oldPassword: '',
      newPassword: ''
    },
    validationSchema: Yup.object<AuthFormData>({
      email: Yup.string()
        .required(REQUIRED_MESSAGE),
      oldPassword: Yup.string()
        .required(REQUIRED_MESSAGE),
      newPassword: Yup.string()
        .required(REQUIRED_MESSAGE)
    }),
    initialErrors: {
      email: REQUIRED_MESSAGE,
      oldPassword: REQUIRED_MESSAGE,
      newPassword: REQUIRED_MESSAGE
    },
    onSubmit: values => onSubmit(),
  };
}