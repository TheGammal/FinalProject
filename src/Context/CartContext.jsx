import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext();

const headers = {
    token: window.localStorage.getItem("token")
}

function addProductToCart(productId) {
    return axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart', 
        {productId: productId},
        {
            headers: headers
        }
    ).then(res => res).catch(err => err)
}

function getCart() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {headers})
    .then(res => res).catch(err => err)
}

function cachOnDel(cartId, shippingAddress) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {shippingAddress}, {headers})
    .then(res => res).catch(err => err)
}

function onlinePayment(cartId, shippingAddress) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`, {shippingAddress}, {headers})
    .then(res => res).catch(err => err)
}

function deleteSpecificProduct(productId) {
    return axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {headers}
    ).then(res => res).catch(err => err)
}

function clearCart() {
    return axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {headers}
    ).then(res => res).catch(err => err)
}

function updateProductCount(productId, count) {
    return axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {count},
        {headers}
    ).then(res => res).catch(err => err)
}

function getOrders(userId) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
    .then(res => res).catch(err => err)
}

export default function CartContextProvider({children}) {
    return <CartContext.Provider value={{addProductToCart, getCart, deleteSpecificProduct, updateProductCount, clearCart, cachOnDel, onlinePayment, getOrders}} >
        {children}
    </CartContext.Provider>
}