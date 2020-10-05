import { TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { NextArrowImage } from '../../assets';
import { NiHeader, NiIconButton } from '../../shared';
import "../../shared/styles/ni-button.scss";
import "../../shared/styles/ni-text-field.scss";
import { RootState } from '../../store/store';
import { signUpInit, UserType } from '../store';
import "./register.scss";
import { registrationFormikConfig } from './registration-formik';

function Register() {
  const dispatch = useDispatch();
  const { loggedUserType, error, message } = useSelector((state: RootState) => state.auth);
  const [validationError, setValidationError] = useState("");

  const handleSubmit = () => {
    dispatch(signUpInit(formik.values.fullName as string, formik.values.email as string, formik.values.password as string, UserType.GUEST as number));
  }

  const formik = useFormik(registrationFormikConfig(handleSubmit));

  useEffect(() => {
    if (error) {
      formik.setErrors({ email: "Wrong email", password: "Wrong password" });
      setValidationError("User with this email address already exists.");
    }
  }, [formik, error, message]);

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

        {error ? <h3 >{validationError}</h3> : <h3 >{message}</h3>}
        <div className="register__button">
          <NiIconButton srcIcon={NextArrowImage}
            className="ni-button__circle--large ni-button__circle--primary" />
        </div>
      </form>
    </div>
  );
}

export default Register;