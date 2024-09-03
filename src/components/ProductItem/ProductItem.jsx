import React, { useEffect, useState } from 'react'
import styles from './ProductItem.module.css'
import { Link } from 'react-router-dom'

export default function ProductItem({product, addCart, isLoadingBtn, currentIds, addWish}) {
    
    useEffect(() => {}, [])
    return (
        <div className='w-1/6 p-1 border border-spacing-3'>
            <div className='product'>
                <Link to={`/productDetails/${product.id}/${product.category._id}`} >
                    <img src={product.imageCover} alt="" />
                    <span className='text-green-600'>{product.category?.name}</span>
                    <h2 className='font-bold mb-3'>{product.title.split(' ').splice(0,2).join(" ")}</h2>
                    <div className="flex justify-between">
                        <span>{product.price} EGP</span>
                        <span>{product.ratingsAverage} <i className='fa fa-star text-yellow-300'></i></span>
                    </div>
                </Link>
                <button className='btn' onClick={() => {addCart(product.id); }}>
                    {isLoadingBtn && currentIds[product.id] ? <i className='fa fa-spinner fa-spin'></i> : <span>Add to cart</span> }
                </button>
                <button className='btn' onClick={() => {addWish(product.id); }}>
                    Add to wish-Test
                </button>
            </div>
        </div>
    )
}