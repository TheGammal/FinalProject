import React, { useContext, useEffect, useState } from 'react'
import styles from './Checkout.module.css'
import { useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext'
import { useNavigate, useParams } from 'react-router-dom'

export default function Checkout() {
    let [isOnlinePayment, setIsOnlinePayment] = useState(false)
    let {cachOnDel, onlinePayment} = useContext(CartContext)
    let params = useParams()
    let navigate = useNavigate()

    async function pay() {
        console.log("hi !!");
        if (isOnlinePayment) { //Not Best Practice
            let x = await onlinePayment(params.cartId, myForm.values)
            console.log("x", x, "url", x.data.session.url);
            if (x.data.status == "success") {
                window.location.href = x.data.session.url
            }
        } else {
            let x = await cachOnDel(params.cartId, myForm.values)
            console.log("x", x);
            navigate('/allorders')
        }
    }

    const myForm = useFormik({
        initialValues: {
        details: "details",
        phone: "01010800921",
        city: "Cairo"
        },
        onSubmit: pay
    })

    useEffect(() => {}, [])
    return (
    <>
        <form className="max-w-md mx-auto" onSubmit={myForm.handleSubmit}>
            <h1 className='text-3xl font-bold mb-4 text-gray-500 mt-5'>Shipping Address</h1>
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="details" value={myForm.values.details} onChange={myForm.handleChange} id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " />
                <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-700 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Details
                </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="tel" name="phone" value={myForm.values.phone} onChange={myForm.handleChange} id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " />
                <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-700 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Phone
                </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="city" value={myForm.values.city} onChange={myForm.handleChange} id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " />
                <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-700 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    City
                </label>
            </div>
            <div>
                <input type="checkbox" onChange={() => setIsOnlinePayment(!isOnlinePayment)} />
                <label htmlFor="">Online</label>
            </div>
            <button className='btn'>
                {isOnlinePayment ? 'Pay Online' : 'Cash On Delievery'}
            </button>
        </form>    
    </>
    )
}
