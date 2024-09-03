import React, { useContext, useEffect, useState } from 'react'
import styles from './Order.module.css'
import { CartContext } from '../../Context/CartContext'
import { UserTokenContext } from '../../Context/UserTokenContext'
import { Accordion } from 'flowbite-react'

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
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons,
                    dropdowns, modals, navbars, and more.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                    Check out this guide to learn how to&nbsp;
                    <a
                    href="https://flowbite.com/docs/getting-started/introduction/"
                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                    get started&nbsp;
                    </a>
                    and start developing websites even faster with components on top of Tailwind CSS.
                </p>
                </Accordion.Content>
            </Accordion.Panel>))}
            
        </Accordion>
    </div>
    )
}
