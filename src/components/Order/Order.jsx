import React, { useContext, useEffect, useState } from 'react'
import styles from './Order.module.css'
import { CartContext } from '../../Context/CartContext'
import { UserTokenContext } from '../../Context/UserTokenContext'
import { Accordion } from 'flowbite-react'
import CartItem from '../CartItem/CartItem'

export default function Order() {
    let [orders, setOrders] = useState([])
    let {getOrders} = useContext(CartContext)
    let {userId} = useContext(UserTokenContext)

    useEffect(() => {
        if (userId) getAllOrders()
    }, [userId])
    
    async function getAllOrders() {
        let x = await getOrders(userId)
        console.log("x ===> ", x);
        setOrders(x)
        
    }

    return (
        <div className='container mx-auto'>
        <Accordion>
            
            {orders.data?.map((order) => (
            <Accordion.Panel key={order.id}>
                <Accordion.Title className={order.isPaid ? 'bg-gray-300' : 'bg-red-300'}>{order.paymentMethodType} {order.isDelivered.toString()}</Accordion.Title>
                <Accordion.Content>
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
                        </tr>
                    </thead>
                    <tbody>
                        {order?.cartItems.map(product => <CartItem product={product} showAction={false} />)}                    
                    </tbody>
                </table>
                </Accordion.Content>
            </Accordion.Panel>))}
            
        </Accordion>
    </div>
    )
}
