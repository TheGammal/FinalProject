import React, { useEffect, useState } from 'react'
import styles from './Brands.module.css'
import axios from 'axios'
import { HashLoader } from 'react-spinners'

export default function Brands() {
    let [brands, setBrands] = useState([])
    let [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

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

    const openModal = (brand) => {
        setSelectedBrand(brand);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBrand(null);
    }

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
                        <div 
                            key={brand._id} 
                            className="cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                            onClick={() => openModal(brand)}
                        >
                            <img src={brand.image} className="w-full h-64 object-cover mb-2 rounded-md" alt={brand.name} />
                            <h2 className="text-center font-semibold text-lg">{brand.name}</h2>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && selectedBrand && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg relative w-96">
                        <button 
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                            onClick={closeModal}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedBrand.name}</h2>
                        <img src={selectedBrand.image} className="w-full h-32 object-cover mb-4" alt={selectedBrand.name} />
                        <p className="text-gray-600">{selectedBrand.name}</p>
                    </div>
                </div>
            )}
        </div>
    )
}
