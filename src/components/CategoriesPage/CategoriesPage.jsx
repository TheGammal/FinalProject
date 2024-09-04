import React, { useEffect, useState } from 'react'
import styles from './CategoriesPage.module.css'
import axios from 'axios'
import { HashLoader } from 'react-spinners'

export default function CategoriesPage() {
    let [categories, setCategories] = useState([])
    let [isLoading, setIsLoading] = useState(true)
    let [subcategories, setSubcategories] = useState([])
    let [isSubLoading, setIsSubLoading] = useState(false)

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

    function getSubcategories(categoryId) {
        setIsSubLoading(true)
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`)
            .then(({ data }) => {
                setSubcategories(data.data)
                setIsSubLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsSubLoading(false)
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
                    <div key={category._id} className="cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-300" onClick={() => getSubcategories(category._id)}>
                        <img src={category.image} className="w-full h-64 object-cover mb-2 rounded-md" alt={category.name} />
                        <h2 className="text-center font-semibold text-lg">{category.name}</h2>
                    </div>
                    ))}
                </div>
            )}

            {/* subcategories */}
            {subcategories.length > 0 && (
                <div className="my-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-500">Subcategories</h2>
                    {isSubLoading ? (
                        <div className="flex justify-center items-center h-32">
                            <HashLoader />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {subcategories.map((subcategory) => (
                                <div key={subcategory._id} className="cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-300 p-4 rounded-md">
                                    <h3 className="text-center font-semibold text-lg">{subcategory.name}</h3>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

        </div>
    )
}