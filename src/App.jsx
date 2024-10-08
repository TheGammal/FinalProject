import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import LayOut from './components/LayOut/LayOut'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import About from './components/About/About'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Products from './components/Products/Products'
import NotFound from './components/NotFound/NotFound'
import CounterContextProvider, { CounterContext } from './Context/CounterContext'
import UserTokenContextProvider from './Context/UserTokenContext'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ProtectedRoutesAuth from './components/ProtectedRoutesAuth/ProtectedRoutesAuth'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider, { CartContext } from './Context/CartContext'
import toast, { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout'
import Order from './components/Order/Order'
import Wishlist from './components/Wishlist/Wishlist'
import ForgetPass from './components/ForgetPass/ForgetPass'
import CategoriesPage from './components/CategoriesPage/CategoriesPage'
import ResetCode from './components/ResetCode/ResetCode'
import NewPassword from './components/NewPassword/NewPassword'


let query = new QueryClient()


function App() {
  const [count, setCount] = useState(0)

  let {getCart, setNumOfItems} = useContext(CartContext)

  const routes = createBrowserRouter([
    {path:"", element: <LayOut />, children: [
      {path:"register", element: <ProtectedRoutesAuth><Register /></ProtectedRoutesAuth> },
      {path:"login", element: <ProtectedRoutesAuth><Login /></ProtectedRoutesAuth>},
      {path:"forgetPassword", element: <ProtectedRoutesAuth><ForgetPass /></ProtectedRoutesAuth>},
      {path:"resetCode", element: <ProtectedRoutesAuth><ResetCode /></ProtectedRoutesAuth>},
      {path:"newPassword", element: <ProtectedRoutesAuth><NewPassword /></ProtectedRoutesAuth>},
      {index:true, element: <ProtectedRoutes><Home /></ProtectedRoutes> },
      {path:"cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes>},
      {path:"about", element: <ProtectedRoutes><About /></ProtectedRoutes>},
      {path:"categories", element: <ProtectedRoutes><CategoriesPage /></ProtectedRoutes>},
      {path:"brands", element: <ProtectedRoutes><Brands /></ProtectedRoutes>},
      {path:"products", element: <ProtectedRoutes><Products /></ProtectedRoutes>},
      {path:"productDetails/:id/:category", element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes>},
      {path:"checkout/:cartId", element: <ProtectedRoutes><Checkout /></ProtectedRoutes>},
      {path:"allorders", element: <ProtectedRoutes><Order /></ProtectedRoutes>},
      {path:"wishlist", element: <ProtectedRoutes><Wishlist /></ProtectedRoutes>},

      {path:"*", element: <NotFound />},
    ]}
  ])

  useEffect(() => {
    getCartInfo()
  }, [])

  async function getCartInfo() { //To Refresh Cart Icon from any place
    let data = await getCart()
    setNumOfItems(data.data.numOfCartItems)
  } 

  return (
  <>
    <QueryClientProvider client={query}>
      <UserTokenContextProvider>
        <CounterContextProvider>

            <RouterProvider router={routes}></RouterProvider>
          <Toaster />

    <ReactQueryDevtools />
        </CounterContextProvider>
      </UserTokenContextProvider>
    </QueryClientProvider>
  </>
  )
}

export default App