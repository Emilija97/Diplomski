import { FormikConfig } from "formik";
import * as Yup from 'yup';
import { REQUIRED_MESSAGE } from "../../auth/form-data";
import { Meal } from "./store/meal-types";

export interface MealFormData {
  name: string,
  quantity: number,
  price: number,
  description: string
}

export const mealFormikConfig = (onSubmit: (values: MealFormData) => void, meal?: Meal): FormikConfig<MealFormData> => {
  return {
    initialValues: {
      price: meal == null ? 1 : meal.price,
      quantity: meal == null ? 1 : meal.quantity,
      description: meal == null ? "" : meal.description,
      name: meal == null ? "" : meal.name
    },
    validationSchema: Yup.object<MealFormData>({
      name: Yup.string()
        .required(REQUIRED_MESSAGE),
      price: Yup.number()
        .required(REQUIRED_MESSAGE)
        .positive(NON_NEGATIVE_MESSAGE),
      description: Yup.string().required(REQUIRED_MESSAGE),
      quantity: Yup.number()
        .required(REQUIRED_MESSAGE)
        .positive(NON_NEGATIVE_MESSAGE),
    }),
    initialErrors: {
      name: meal != null ? undefined : REQUIRED_MESSAGE,
      price: meal != null ? undefined : REQUIRED_MESSAGE,
      quantity: meal != null ? undefined : REQUIRED_MESSAGE
    },
    onSubmit: values => onSubmit(values),
    enableReinitialize: true
  };
}

const NON_NEGATIVE_MESSAGE = "Value cannot be negative or zero";