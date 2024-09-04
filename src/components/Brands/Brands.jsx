import React, { useEffect, useState } from 'react'
import styles from './Brands.module.css'
import axios from 'axios'
import { HashLoader } from 'react-spinners'

export default function Brands() {
    let [brands, setBrands] = useState([])
    let [isLoading, setIsLoading] = useState(true)

    function getBrands() {
        axios.get('https://ecommerce.routemisr.com/api/v1/brands')
            .then(({data}) => {
                // console.log(data.data); Clear Console
                setBrands(data.data)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getBrands()
    }, [])

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-gray-500 mt-5">Our Brands</h1>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <HashLoader />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-3">
                    {brands.map((brand) => (
                    <div key={brand._id} className="cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                        <img src={brand.image} className="w-full h-64 object-cover mb-2 rounded-md" alt={brand.name} />
                        <h2 className="text-center font-semibold text-lg">{brand.name}</h2>
                    </div>
                    ))}
                </div>
            )}
        </div>
    )
}
