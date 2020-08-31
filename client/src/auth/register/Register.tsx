import { TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { NextArrowImage } from '../../assets';
import { NiHeader, NiIconButton } from '../../shared';
import "../../shared/styles/ni-button.scss";
import "../../shared/styles/ni-text-field.scss";
import { RootState } from '../../store/store';
import { UserType } from '../store';
import "./register.scss";
import { registrationFormikConfig } from './registration-formik';

function Register() {
  const { loggedUserType } = useSelector((state: RootState) => state.auth);

  const handleSubmit = () => { }

  const formik = useFormik(registrationFormikConfig(handleSubmit));

  const textFieldStyle = (error: boolean) => {
    return "ni-text-field " + (error ? "ni-text-field--error" : "");
  }

  if (loggedUserType !== UserType.GUEST) {
    return (<Redirect to="/dashboard" />)
  }

  return (
    <div className="register">
      <NiHeader backArrow={true} logo={true} menu={false} title="NIGNITE"></NiHeader>

      <form onSubmit={formik.handleSubmit} className="register__form">
        <div className="register__title">Create Account</div>
        <TextField
          {...formik.getFieldProps('fullName')}
          className={textFieldStyle(formik.touched.fullName && formik.errors.fullName ? true : false)}
          helperText={formik.errors.fullName} label="Full name" name="fullName"
          error={formik.touched.fullName && formik.errors.fullName ? true : false}>
        </TextField>
        <TextField
          {...formik.getFieldProps('email')}
          className={textFieldStyle(formik.touched.email && formik.errors.email ? true : false)}
          helperText={formik.errors.email} label="Email" name="email"
          error={formik.touched.email && formik.errors.email ? true : false}>
        </TextField>
        <TextField
          {...formik.getFieldProps('password')} type="password"
          className={textFieldStyle(formik.touched.password && formik.errors.password ? true : false)}
          helperText={formik.errors.password} label="Password" name="password"
          error={formik.touched.password && formik.errors.password ? true : false}>
        </TextField>

        <div className="register__button">
          <NiIconButton srcIcon={NextArrowImage}
            className="ni-button__circle--large ni-button__circle--primary" />
        </div>
      </form>
    </div>
  );
}

export default Register;