import { TextField } from '@material-ui/core';
import { useFormik } from "formik";
import React from 'react';
import { useDispatch } from 'react-redux';
import FormAction from '../../shared/form-action/FormAction';
import "./add-catering-form.scss";
import { addCateringFormikConfig } from './add-catering-formik';
import { addCateringInit } from './store/actions';

export interface AddCateringData {
  name: string,
  phoneNumber: string,
  description?: string
}

function AddCateringForm(props: { onClose: () => void }) {
  const dispatch = useDispatch();

  const handleSaveClick = () => {
    dispatch(addCateringInit({
      id: "",
      description: formik.values.description as string,
      meals: [],
      name: formik.values.name,
      phoneNumber: formik.values.phoneNumber.toString()
    }))
    props.onClose();
  }

  const handleCancelClick = () => {
    props.onClose();
  }

  const formik = useFormik<AddCateringData>(addCateringFormikConfig(handleSaveClick));

  const textFieldStyle = (error: boolean) => {
    return "ni-text-field catering-form__text-field " + (error ? "ni-text-field--error" : "");
  }

  return (
    <div className="catering-form">
      <div className="catering-form__title">Add Catering Service</div>
      <form onSubmit={formik.handleSubmit} className="catering-form__form">
        <TextField
          {...formik.getFieldProps('name')} label="Name" name="name" fullWidth
          className={textFieldStyle(formik.touched.name && formik.errors.name ? true : false)}
          error={formik.touched.name && formik.errors.name ? true : false}
          helperText={formik.errors.name} />
        <TextField type="number"
          {...formik.getFieldProps('phoneNumber')} label="Phone number" name="phoneNumber" fullWidth
          className={textFieldStyle(formik.touched.phoneNumber && formik.errors.phoneNumber ? true : false)}
          error={formik.touched.phoneNumber && formik.errors.phoneNumber ? true : false}
          helperText={formik.errors.phoneNumber} />
        <TextField
          {...formik.getFieldProps('description')} label="Description" name="description" fullWidth
          className="ni-text-field catering-form__text-field" />
        <div className="catering-form__action">
          <FormAction
            mode={false}
            rejectBtnTitle="Cancel"
            acceptBtnTitle="Save"
            onRejectClick={handleCancelClick}
          />
        </div>
      </form>
    </div>
  )
}

export default AddCateringForm;