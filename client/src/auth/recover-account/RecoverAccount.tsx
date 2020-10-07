import { TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { NiHeader } from '../../shared';
import "../../shared/styles/ni-button.scss";
import "../../shared/styles/ni-text-field.scss";
import { RootState } from '../../store/store';
import { AuthFormData } from '../form-data';
import { changePassword } from '../store';
import "./recover-account.scss";
import { recoverFormikConfig } from './recover-formik';

function RecoverAccount() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { error, message } = useSelector((state: RootState) => state.auth);

  const handleSubmit = () => {
    dispatch(changePassword(formik.values.email as string, formik.values.oldPassword as string, formik.values.newPassword as string));
  }

  const formik = useFormik<AuthFormData>(recoverFormikConfig(handleSubmit));
  useEffect(() => {
    if (error) {
      formik.setErrors({ email: "Wrong email", oldPassword: "Wrong password" });
    }
  }, [formik, error]);


  const textFieldStyle = (error: boolean) => {
    return "ni-text-field " + (error ? "ni-text-field--error" : "");
  }

  const handleCancelClick = () => {
    history.goBack();
  }

  return (
    <div className="recover-account">
      <NiHeader backArrow={true} logo={true} menu={false} title="NIGNITE"></NiHeader>

      <form onSubmit={formik.handleSubmit} className="recover-account__form">
        <TextField
          {...formik.getFieldProps('email')} type="email"
          className={textFieldStyle(formik.touched.email && formik.errors.email ? true : false)}
          helperText={formik.errors.email} label="Email" name="email"
          error={formik.touched.email && formik.errors.email ? true : false}>
        </TextField>
        <TextField
          {...formik.getFieldProps('oldPassword')} type="password"
          className={textFieldStyle(formik.touched.oldPassword && formik.errors.oldPassword ? true : false)}
          helperText={formik.errors.oldPassword} label="Current password" name="oldPassword"
          error={formik.touched.oldPassword && formik.errors.oldPassword ? true : false}>
        </TextField>
        <TextField
          {...formik.getFieldProps('newPassword')} type="password"
          className={textFieldStyle(formik.touched.newPassword && formik.errors.newPassword ? true : false)}
          helperText={formik.errors.newPassword} label="New password" name="newPassword"
          error={formik.touched.newPassword && formik.errors.newPassword ? true : false}>
        </TextField>
        {error ? <h3>You need to enter validate password.</h3> : ""}
        <h3>{message}</h3>
        <div className="recover-account__buttons">
          <button
            className="ni-button ni-button--small ni-button__text ni-button__text--dark"
            onClick={handleCancelClick}>
            Cancel
          </button>
          <button type="submit"
            className="ni-button ni-button--small ni-button__contained ni-button__contained--primary">Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default RecoverAccount;