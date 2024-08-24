import React, { useContext, useEffect, useState } from 'react'
import styles from './RecommendedProducts.module.css'
import axios from 'axios'
import ProductItem from '../ProductItem/ProductItem'
import { useQuery } from '@tanstack/react-query'
import { PacmanLoader } from 'react-spinners'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';

export default function RecommendedProducts() {
    let {addProductToCart} = useContext(CartContext)
    const [currentIds, setCurrentIds] = useState([])

    let [isLoadingBtn, setIsLoadingBtn] = useState(false)
    // let [products, setProducts] = useState([])

    // useEffect(() => {
    //     getProducts()
    // }, [])

    // function getProducts() {
    //     axios.get('https://ecommerce.routemisr.com/api/v1/products')
    //         .then(res => {
    //             console.log(res.data)
    //             setProducts(res.data.data)
    //         })
    //         .catch(err => console.log(err))
    // }
    // USE REACT QUERY ..
    function getProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }
    let {isLoading, data, isError} = useQuery({
        queryKey: ['Products'],
        queryFn: getProducts,
        // staleTime: 5000,
        // retry: 20, //By default => '3' || You Can Put => 'Infinity'
        // retryDelay: 2000,
        // refetchInterval: 3000
        // refetchOnWindowFocus: true,
        // refetchIntervalInBackground: 1000,
    })
    // console.log("data => ", data); Clear Console
    // console.log("isLoading => ", isLoading); Clear Console
    
    async function addToCartItem(id) {
        setIsLoadingBtn(true)

        let x = structuredClone(currentIds)
        x[id] = true
        setCurrentIds(x)

        let bl7 = await addProductToCart(id);
        console.log("bl7", bl7);
        if (bl7.data.status == "success") {
            toast.success(bl7.data.message);
        } else {
            toast.error(bl7.response.data.message)
        }

        x[id] = false
        setCurrentIds(x) //To prevent "Loading" after pressing any button after that

        setIsLoadingBtn(false)
    }

    if (isLoading) {
        return <div className="flex w-full justify-center">
            <PacmanLoader />
        </div>
    }
    if (isError) {
        return <div className="flex w-full justify-center">
            <p>Error !!</p>
        </div>
    }

    return (
        <div>
            <div className="container mx-auto row pt-5">
                {data?.data.data.map(product => <ProductItem key={product.id} currentIds={currentIds} isLoadingBtn={isLoadingBtn} addCart={addToCartItem} product={product} /> )}
            </div>
        </div>
    )
}