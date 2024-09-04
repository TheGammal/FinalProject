import React, { useEffect, useState } from 'react'
import styles from './CategoriesPage.module.css'
import axios from 'axios'
import { HashLoader } from 'react-spinners'

export default function CategoriesPage() {
    let [categories, setCategories] = useState([])
    let [isLoading, setIsLoading] = useState(true)

    function getCategories() {
        axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            .then(({data}) => {
                // console.log(data.data); Clear Console
                setCategories(data.data)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }
    
    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-gray-500 mt-5">Our Categories</h1>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <HashLoader />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-3">
                    {categories.map((category) => (
                    <div key={category._id} className="cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                        <img src={category.image} className="w-full h-64 object-cover mb-2 rounded-md" alt={category.name} />
                        <h2 className="text-center font-semibold text-lg">{category.name}</h2>
                    </div>
                    ))}
                </div>
            )}
        </div>
    )
}