import { FormikConfig } from "formik";
import * as Yup from 'yup';
import { REQUIRED_MESSAGE } from "../../auth/form-data";
import { AddCateringData } from "./AddCateringForm";

export const addCateringFormikConfig = (onSubmit: () => void): FormikConfig<AddCateringData> => {
  return {
    initialValues: {
      description: "",
      name: "",
      phoneNumber: ""
    },
    validationSchema: Yup.object<AddCateringData>({
      name: Yup.string()
        .required(REQUIRED_MESSAGE),
      phoneNumber: Yup.string()
        .required(REQUIRED_MESSAGE),
      description: Yup.string().notRequired()
    }),
    initialErrors: {
      name: REQUIRED_MESSAGE,
      phoneNumber: REQUIRED_MESSAGE
    },
    onSubmit: values => onSubmit(),
  };
}