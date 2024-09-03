import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { HashLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import CartItem from '../CartItem/CartItem'

export default function Cart() {
    let [cart, setCart] = useState(0)
    let [isLoading, setIsLoading] = useState(true)
    let [noCartInfo, setNoCartInfo] = useState('')

    let[apiError, setApiError] = useState(false)

    let {setCartId, getCart, deleteSpecificProduct, updateProductCount, clearCart, setNumOfItems} = useContext(CartContext)

    useEffect(() => {
        getCartItems()
    }, [])

    async function getCartItems() {
        let data = await getCart();
        console.log(data);

        if (data.data.data) {
            setCartId(data.data.data._id)            
            setCart(data)
            setNumOfItems(data.data.numOfCartItems)
            // console.log(data.data.numOfCartItems);

        } else {
            setApiError(true)
        }
        
        setIsLoading(false)
    }

    async function deleteProduct(productId) {
        let data = await deleteSpecificProduct(productId)
        setCart(data)
        setNumOfItems(data.data.numOfCartItems)
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
                    {cart?.data?.data.products.map(product => <CartItem product={product} updateProduct={updateProduct} deleteProduct={deleteProduct} />)}                    
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
