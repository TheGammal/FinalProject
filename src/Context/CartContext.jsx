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

export default function CartContextProvider({children}) {
    return <CartContext.Provider value={{addProductToCart, getCart}} >
        {children}
    </CartContext.Provider>
}