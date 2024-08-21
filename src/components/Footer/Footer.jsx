import React, { useEffect, useState } from 'react'
import styles from './Footer.module.css'

export default function Footer() {
    let [count, setCount] = useState(0)
    useEffect(() => {}, [])
    return (
        <footer className='relative left-0 right-0 bottom-0 bg-slate-500 text-center text-2xl'>
            footer
        </footer>
    )
}