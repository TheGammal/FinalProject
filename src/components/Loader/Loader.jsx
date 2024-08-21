import React, { useEffect, useState } from 'react'
import styles from './Loader.module.css'

export default function Loader() {
    let [count, setCount] = useState(0)
    useEffect(() => {}, [])
    return (
        <div>
            loader
        </div>
    )
}
