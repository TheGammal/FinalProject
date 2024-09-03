import React, { useContext, useEffect, useState } from 'react'
import styles from './Wishlist.module.css'
import { CartContext } from '../../Context/CartContext'
import { HashLoader } from 'react-spinners'

export default function Wishlist() {
    let [wishlist, setWishlist] = useState(0)
    let [isLoading, setIsLoading] = useState(true)

    let[apiError, setApiError] = useState(false)

    let {getWish, setWishlistId, deleteWishProduct} = useContext(CartContext)

    useEffect(() => {
        getWishItems()
    }, [])

    async function getWishItems() {
        let data = await getWish();
        console.log(data);

        if (data.data.data) {
            setWishlistId(data.data.data._id)
            setWishlist(data)
        } else {
            setApiError(true)
        }
        setIsLoading(false)
    }

    async function deleteWishProducts(productId) {
        let data = await deleteWishProduct(productId)
        setWishlist(data)
    }
    
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-gray-500 mt-5">Your Wishlist</h1>
            {isLoading ? <div>
                <HashLoader />
            </div> : <>
            {wishlist.data.data.length ? <>
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
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {wishlist?.data?.data.map(product => (
                        <tr key={product._id} className="bg-white border-b">
                            <td className="p-4">
                                <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" />
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                {product.title}
                            </td>
                            <td className="px-6 py-4">
                                {product.price} $
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => deleteWishProducts(product._id)}
                                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-1">
                                    -
                                </button>
                                <button
                                    onClick={() => deleteWishProducts(product._id)}
                                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Add Cart
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </> : <div className='p-5 text-center'> <h2>Your Wishlist Is Empty !!</h2> </div>}
            </> }
            
        </div>
    )
}
