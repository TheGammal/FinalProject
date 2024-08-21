import React, { useEffect, useState } from 'react'
import styles from './ProtectedRoutesAuth.module.css'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoutesAuth({children}) {
    let [count, setCount] = useState(0)
    useEffect(() => {}, [])

    if (!localStorage.getItem("token")) {
        return children
    } else {
        return <Navigate to={'/'} />
    }

    // return (
    //     <div>
    //         protectedRoutesAuth
    //     </div>
    // )
}
