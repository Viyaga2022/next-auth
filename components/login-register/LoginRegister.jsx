"use client"

import React, { useState } from 'react'
import './login-register.scss'
import { registerUser, loginUser } from '@/lib/functions'
import toast from 'react-hot-toast'

const LoginRegister = () => {

	const onLogin = async (formData) => {
		const { email, password } = Object.fromEntries(formData)
		if (!email || !password) {
			return toast.error("Please enter the required field")
		}
		const res = await loginUser(formData)
		if (res?.error) {
			toast.error(res.error)
			res.error = ''
		} else {
			toast.success("login successfull")
		}
	}

	const onRegister = async (formData) => {
		const { email, password, cpassword } = Object.fromEntries(formData)
		if (!email || !password || !cpassword) {
			return toast.error("Please enter the required field")
		}

		if (password !== cpassword) {
			return toast.error("Password and confirm password not matching")
		}

		const register = await registerUser(email, password)

		if (register?.error) {
			toast.error(register.error)
			register.error = ''
		} else {
			toast.success("registration Successfull")
			setTimeout(() => {
				changeLogin()
			}, 1300)
		}
	}


	const changeSignUp = () => {
		const wrapper = document.querySelector(".wrapper")
		wrapper.classList.remove("active");

	}

	const changeLogin = () => {
		const wrapper = document.querySelector(".wrapper")
		wrapper.classList.add("active")
	}

	return (
		<div className="signin-signup">
			<div className='wrapper'>
				<div className="form signup">
					<header onClick={changeSignUp}>Signup</header>
					<form action={onRegister}>
						<input type="text" name="email" placeholder="Email" />
						<input type="password" name='password' placeholder="Password" />
						<input type="password" name='cpassword' placeholder="Confirm Password" />
						<div className="checkbox">
							<input type="checkbox" id="signupCheck" />
							<label htmlFor="signupCheck">I accept all terms &amp; conditions</label>
						</div>
						<input type="submit" defaultValue="Signup" />
					</form>
				</div>
				<div className="form login">
					<header onClick={changeLogin}>Login</header>
					<form action={onLogin}>
						<input type="text" placeholder="Email" name='email' />
						<input type="password" placeholder="Password" name='password' />
						<a href="#">Forgot password?</a>
						<input type="submit" defaultValue="Login" />
					</form>
				</div>
			</div>
		</div>
	)
}

export default LoginRegister