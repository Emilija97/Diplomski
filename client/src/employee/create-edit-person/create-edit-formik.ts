import { FormikConfig } from 'formik';
import * as Yup from 'yup';
import { Person } from '../store/person-state';
import { CreateEditFormData, REQUIRED_MESSAGE, WRONG_FORMAT_MESSAGE } from './form-data';

export const createEditFormikConfig = (onSubmit: () => void, user?: Person): FormikConfig<CreateEditFormData> => {
  return {
    initialValues: {
      email: user === undefined ? '' : user.email,
      fullName: user === undefined ? '' : user.fullName,
      role: user === undefined ? '' : user.position,
      birthDate: user === undefined ? '' : user.birthDate,
      enrolmentDate: user === undefined ? '' : user.enrolmentDate,
      homeAddress: user === undefined ? '' : user.homeAddress,
      phone: user === undefined ? '' : user.phone
    },
    validationSchema: Yup.object<CreateEditFormData>({
      fullName: Yup.string()
        .required(REQUIRED_MESSAGE),
      role: Yup.string()
        .required(REQUIRED_MESSAGE),
      birthDate: Yup.string()
        .required(REQUIRED_MESSAGE),
      homeAddress: Yup.string()
        .required(REQUIRED_MESSAGE),
      enrolmentDate: Yup.string()
        .required(REQUIRED_MESSAGE),
      email: Yup.string()
        .email(WRONG_FORMAT_MESSAGE)
        .required(REQUIRED_MESSAGE),
      phone: Yup.string()
        .required(REQUIRED_MESSAGE)

    }),
    initialErrors: {
      fullName: REQUIRED_MESSAGE,
      role: REQUIRED_MESSAGE,
      birthDate: REQUIRED_MESSAGE,
      homeAddress: REQUIRED_MESSAGE,
      enrolmentDate: REQUIRED_MESSAGE,
      email: REQUIRED_MESSAGE,
      phone: REQUIRED_MESSAGE,
    },
    onSubmit: values => onSubmit(),
  };
}