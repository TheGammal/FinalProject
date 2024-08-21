import { useState } from 'react'
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


function App() {
  const [count, setCount] = useState(0)
  const routes = createBrowserRouter([
    {path:"", element: <LayOut />, children: [
      {path:"register", element: <ProtectedRoutesAuth><Register /></ProtectedRoutesAuth> },
      {path:"login", element: <ProtectedRoutesAuth><Login /></ProtectedRoutesAuth>},
      {index:true, element: <ProtectedRoutes><Home /></ProtectedRoutes> },
      {path:"cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes>},
      {path:"about", element: <ProtectedRoutes><About /></ProtectedRoutes>},
      {path:"categories", element: <ProtectedRoutes><Categories /></ProtectedRoutes>},
      {path:"brands", element: <ProtectedRoutes><Brands /></ProtectedRoutes>},
      {path:"products", element: <ProtectedRoutes><Products /></ProtectedRoutes>},

      {path:"*", element: <NotFound />},
    ]}
  ])
  // const routes = createBrowserRouter([
  //   {path:"", element: <LayOut />, children: [
  //     {index:true, element: <ProtectedRoutesAuth><Register /></ProtectedRoutesAuth> },
  //     {path:"login", element: <ProtectedRoutesAuth><Login /></ProtectedRoutesAuth>},
  //     {path:"home", element: <ProtectedRoutes><Home /></ProtectedRoutes> },
  //     {path:"cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes>},
  //     {path:"about", element: <ProtectedRoutes><About /></ProtectedRoutes>},
  //     {path:"categories", element: <ProtectedRoutes><Categories /></ProtectedRoutes>},
  //     {path:"brands", element: <ProtectedRoutes><Brands /></ProtectedRoutes>},
  //     {path:"products", element: <ProtectedRoutes><Products /></ProtectedRoutes>},

  //     {path:"*", element: <NotFound />},
  //   ]}
  // ])

  return (
    <UserTokenContextProvider>
      <CounterContextProvider>
        <RouterProvider router={routes}></RouterProvider>
      </CounterContextProvider>
    </UserTokenContextProvider>
    
  )
}

export default App