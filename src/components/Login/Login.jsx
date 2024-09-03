import React, { useContext, useEffect, useState } from 'react'
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { UserTokenContext } from '../../Context/UserTokenContext'
import { jwtDecode } from 'jwt-decode'


export default function Login() {
    let [apiError, setApiError] = useState(null)
    let [isLoading, setIsLoading] = useState(false)

    let tokenContext = useContext(UserTokenContext)

    let navigate = useNavigate()

    // async function register(formValue) {
    //     console.log("Hello from Register", formValue);
    //     let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formValue)
    //     console.log(data);
        
    //     if (date.message == "success") {
    //         //Login
    //     } else {
    //         //Errors
    //     }
    // }
    function login(formValue) {
        setApiError(null) //To make refresh "Error alert" when click
        setIsLoading(true) //To show loader when click on submit btn

        console.log("Hello from Register", formValue);
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formValue)
            .then((res) => {
                let {data} = res;
                console.log(data.message, "data.message");
                console.log(data); //message, token ..
                
                if (data.message === "success") {
                    localStorage.setItem("token", data.token)
                    console.log(data);
                    tokenContext.setToken(data.token)

                    convertToken()

                    // Yro7 3la l login
                    navigate("/")
                }
            })
            .catch((err) => {
                setApiError(err.response.data.message)
                setIsLoading(false) //Back Loader to btn
            })
    }

    //manually validation, then deleted, then ...

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{3,6}$/).required(),
    })

    const myForm = useFormik({
        initialValues: {
            email:"",
            password:"",
        },
        validationSchema: validationSchema,
        onSubmit: login
    })
    // This Data From Back-End Documentation (Authentication > Signin) [On POSTMAN]
    return (
        <div className='container mx-auto'>
            {apiError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{apiError}</span>
            </div>}
            <form className="max-w-md mx-auto" onSubmit={myForm.handleSubmit}>
                <h1 className='text-3xl font-bold mb-4 text-gray-500 mt-5'>Login Now:</h1>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" name="email" value={myForm.values.email} onBlur={myForm.handleBlur} onChange={myForm.handleChange} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-700 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        User Email
                    </label>
                    {myForm.errors.email && myForm.touched.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">{myForm.errors.email}</span>
                    </div>}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="password" value={myForm.values.password} onBlur={myForm.handleBlur} onChange={myForm.handleChange} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-700 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        User Password
                    </label>
                    {myForm.errors.password && myForm.touched.password && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">{myForm.errors.password}</span>
                    </div>}
                </div>
                <button disabled={isLoading} type="submit" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {isLoading ? <i className='fa fa-spinner fa-spin'></i> : "Login" }
                </button>
                
            </form>
        </div>
    )
}
