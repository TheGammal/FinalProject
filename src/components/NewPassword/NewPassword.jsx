import React, { useEffect, useState } from 'react'
import styles from './NewPassword.module.css'
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";

export default function NewPassword() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        newPassword: Yup.string()
            .required('New password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            newPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setIsLoading(true);
            setError('');
            setMessage('');
            axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
                .then((res) => {
                    console.log(res);
                    setMessage('Password reset successfully.');
                    setIsLoading(false);
                    // Navigate to login page or other appropriate page
                    navigate('/login');
                })
                .catch((err) => {
                    console.log(err);
                    setError('Failed to reset password, please try again.');
                    setIsLoading(false);
                });
        }
    });

    useEffect(() => {}, [])

    return (
        <div className="container mx-auto">
            <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
                <h1 className="text-3xl font-bold mb-4 text-gray-500 mt-5">Reset Password</h1>
                {message && <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <span className="font-medium">{message}</span>
                </div>}
                {error && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{error}</span>
                </div>}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        id="email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                        placeholder=" "
                    />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text peer-focus:text-gray-700 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        User Email
                    </label>
                    {formik.errors.email && formik.touched.email && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">{formik.errors.email}</span>
                        </div>
                    )}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="password"
                        name="newPassword"
                        value={formik.values.newPassword}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        id="newPassword"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                        placeholder=" "
                    />
                    <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text peer-focus:text-gray-700 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        New Password
                    </label>
                    {formik.errors.newPassword && formik.touched.newPassword && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">{formik.errors.newPassword}</span>
                        </div>
                    )}
                </div>
                <button
                    disabled={isLoading}
                    type="submit"
                    className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {isLoading ? <i className='fa fa-spinner fa-spin'></i> : "Reset Password"}
                </button>
            </form>
        </div>
    )
}
