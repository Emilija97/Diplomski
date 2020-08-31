import TextField from "@material-ui/core/TextField";
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router';
import { NextArrowImage } from "../../assets";
import { NiHeader, NiIconButton } from "../../shared";
import "../../shared/styles/ni-button.scss";
import "../../shared/styles/ni-text-field.scss";
import { RootState } from "../../store/store";
import { AuthFormData } from "../form-data";
import { loginInit, UserType } from "../store";
import { loginFormikConfig } from "./login-formik";
import "./login.scss";

function Login() {
	const dispatch = useDispatch();

	const { loggedUserType, error } = useSelector((state: RootState) => state.auth);

	const handleSubmit = () => {
		dispatch(loginInit(formik.values.email as string, formik.values.password as string));
	}

	const formik = useFormik<AuthFormData>(loginFormikConfig(handleSubmit));

	useEffect(() => {
		if (error) {
			formik.setErrors({ email: "Wrong email", password: "Wrong password" });
		}
	}, [formik, error]);

	const textFieldStyle = (error: boolean) => {
		return "ni-text-field " + (error ? "ni-text-field--error" : "");
	}

	if (loggedUserType !== UserType.GUEST) {
		return (<Redirect to="/dashboard" />);
	}

	return (
		<div className="login">
			<NiHeader backArrow={true} logo={true} menu={false} title="NIGNITE"></NiHeader>
			<form onSubmit={formik.handleSubmit} className="login__form">
				<div className="login__title">Log in</div>
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
				<div className="login__button">
					<NiIconButton srcIcon={NextArrowImage}
						className="ni-button__circle--large ni-button__circle--primary" />
				</div>
			</form>
		</div >
	);
}

export default Login;