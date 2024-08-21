import React, { useEffect, useState } from 'react'
import styles from './LayOut.module.css'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function LayOut() {
    let [count, setCount] = useState(0)
    useEffect(() => {}, [])
    return (
        <>
            <Navbar />
            <div className='lg:pt-11'>
            <Outlet></Outlet>
            </div>
            <Footer />
        </>
    )
}
