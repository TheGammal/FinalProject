import React, { useEffect, useState } from 'react'
import styles from './Categories.module.css'

export default function Categories(props) {
    let [count, setCount] = useState(0)
    console.log(props);
    
    useEffect(() => {}, [])
    return (
        <div>
            categories
            {props.children}
        </div>
    )
}
