import { TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router';
import { NiHeader } from '../../shared';
import "../../shared/styles/ni-button.scss";
import "../../shared/styles/ni-text-field.scss";
import { AuthFormData } from '../form-data';
import "./recover-account.scss";
import { recoverFormikConfig } from './recover-formik';

function RecoverAccount() {
  const history = useHistory();

  const handleSubmit = () => {
    history.push("/login");
  }

  const formik = useFormik<AuthFormData>(recoverFormikConfig(handleSubmit));

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
          {...formik.getFieldProps('password')} type="password"
          className={textFieldStyle(formik.touched.password && formik.errors.password ? true : false)}
          helperText={formik.errors.password} label="Password" name="password"
          error={formik.touched.password && formik.errors.password ? true : false}>
        </TextField>
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