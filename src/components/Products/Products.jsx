import React, { useEffect, useState } from 'react'
import styles from './Products.module.css'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function Products() {
    let {isLoading, data, isError} = useQuery({
        queryKey: ['Route'],
        queryFn: getProducts,
    })
    function getProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }
    console.log("data => ", data);
    console.log("isLoading => ", isLoading);

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div>
            product
        </div>
    )
}
