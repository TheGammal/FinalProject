import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { HashLoader } from 'react-spinners'
import { Link } from 'react-router-dom'

export default function Cart() {
    let [cart, setCart] = useState(0)
    let [isLoading, setIsLoading] = useState(true)
    let [noCartInfo, setNoCartInfo] = useState('')
    let {getCart, deleteSpecificProduct, updateProductCount, clearCart} = useContext(CartContext)

    useEffect(() => {
        getCartItems()
    }, [])

    async function getCartItems() {
        let data = await getCart();
        // console.log(data);
        setCart(data)
        setIsLoading(false)
    }

    async function deleteProduct(productId) {
        let data = await deleteSpecificProduct(productId)
        setCart(data)
    }
    
    async function deleteAllProducts() {
        let {data} = await clearCart()
        console.log(data);
        if (data.message == "success") {
            setNoCartInfo("No Item To Show !!")
        }
        // setCart(data)
    }
    
    async function updateProduct(productId, count) {
        let data = await updateProductCount(productId, count)
        // console.log(data);
        setCart(data)
    }

    return ( 
        <div className="relative container mx-auto my-5 px-5 overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className='text-4xl text-center font-bold'>Shopping Cart</h1>
            {isLoading ? <div>
                <HashLoader />
            </div> : <>
            {noCartInfo ? noCartInfo : <>
            <h2 className='text-3xl text-center font-bold'>Total: {cart?.data?.numOfCartItems}</h2>
            {cart?.data?.data.products.length ? 
            <>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-16 py-3">
                            <span className="sr-only">Image</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Qty
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {cart?.data?.data.products.map(product => <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="p-4">
                            <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {product.product.title}
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <button onClick={() => updateProduct(product.product.id, product.count -1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                    <span className="sr-only">Quantity button</span>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                                    </svg>
                                </button>
                                <div>
                                    <span>{product.count}</span>
                                </div>
                                <button onClick={() => updateProduct(product.product.id, product.count +1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                    <span className="sr-only">Quantity button</span>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                                    </svg>
                                </button>
                            </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {product.price} $
                        </td>
                        <td className="px-6 py-4">
                            <button onClick={() => deleteProduct(product.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                        </td>
                    </tr>)}                    
                </tbody>
            </table>
            <div className='p-4 flex justify-between'>
                <button onClick={deleteAllProducts} className='bg-red-700 hover:bg-red-900 px-4 py-2 rounded-md text-white'>Clear</button>
                <Link to={`/checkout/${cart.data.data._id}`} className='bg-red-700 hover:bg-red-900 px-4 py-2 rounded-md text-white'>Continue to pay</Link>
            </div>
            </> : <div className='p-5 text-center'><h2>Shopping Cart Is Empty !!</h2></div> }
            </>}
            </>}
            
            
        </div>
    )
}
