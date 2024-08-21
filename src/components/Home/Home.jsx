import React, { useContext, useEffect, useState } from 'react'
import styles from './Home.module.css'
import axios from 'axios'


export default function Home() {
    let [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    function getProducts() {
        axios.get('https://ecommerce.routemisr.com/api/v1/products')
            .then(res => {
                console.log(res.data)
                setProducts(res.data.data)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div className="container mx-auto row pt-5">
                {products.map(product => <div key={product.id} className='w-1/6 p-1 border border-spacing-3'>
                    <div className='product'>
                        <img src={product.imageCover} alt="" />
                        <span className='text-green-600'>{product.category?.name}</span>
                        <h2 className='font-bold mb-3'>{product.title}</h2>
                        <div className="flex justify-between">
                            <span>{product.price} EGP</span>
                            <span>{product.ratingsAverage}</span>
                        </div>
                        <button className='btn'>Add to cart</button>
                    </div>
                </div>)}
            </div>
        </div>
    )
}
