import React, { useContext, useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserTokenContext } from '../../Context/UserTokenContext'
import { CartContext } from '../../Context/CartContext'

export default function Navbar() {
    let [count, setCount] = useState(0)

    let {token, setToken} = useContext(UserTokenContext)
    // console.log(token, "hi from nav comp."); Clear Console

    let {numOfItems} = useContext(CartContext)
    
    let navigate = useNavigate()
    
    useEffect(() => {}, [])

    function logOut() {
        setToken(null)
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <nav className='bg-slate-300 p-2 lg:fixed z-20 left-0 top-0 right-0'>
            <div className='container mx-auto flex flex-col lg:flex-row justify-between items-center text-center'>
                <div className='flex flex-col lg:flex-row items-center'>
                    <img src={logo} width={120} className='lg:mr-7 mb-4 lg:mb-0' alt="" />
                    <ul className='flex flex-col lg:flex-row gap-2 text-xl'>
                        {
                        token ? <>
                        <li>
                            <NavLink to=''>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='cart'>Cart</NavLink>
                        </li>
                        <li>
                            <NavLink to='brands'>Brands</NavLink>
                        </li>
                        <li>
                            <NavLink to='categories'>Categories</NavLink>
                        </li>
                        <li>
                            <NavLink to='products'>Products</NavLink>
                        </li>
                        </> : null
                        }
                    </ul>
                </div>
                <div className='flex flex-col lg:flex-row items-center'>
                    <div className='flex flex-col lg:flex-row gap-2 text-xl'>
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-tiktok"></i>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa-brands fa-linkedin"></i>
                        <i className="fa-brands fa-youtube"></i>
                    </div>
                    <div className='lg:pl-4'>
                        <ul className='flex flex-col lg:flex-row gap-2'>
                            {
                            token ? 
                            <>
                            <span className='bg-orange-50 text-black font-bold px-2 rounded-md'>{numOfItems}</span>
                            <li>
                                <i className='fa fa-cart-shopping'></i>
                            </li>
                            <li>
                                <button onClick={logOut}>SignOut</button>
                            </li> </> : 
                            <>
                            <li>
                                <NavLink to='login'>Login</NavLink>
                            </li>
                            <li>
                                <NavLink to='register'>Register</NavLink>
                            </li>
                            </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}