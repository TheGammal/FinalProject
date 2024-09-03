import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import ProductItem from '../ProductItem/ProductItem';
import Slider from 'react-slick';
import { PacmanLoader } from 'react-spinners';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    let {id, category} = useParams();
    // console.log(id); Clear Console

    let {addProductToCart, setNumOfItems} = useContext(CartContext)
    
    const [currentIds, setCurrentIds] = useState([])

    async function addToCartItem(id) {
        setIsLoadingBtn(true)

        let x = structuredClone(currentIds)
        x[id] = true
        setCurrentIds(x)

        let data = await addProductToCart(id);
        console.log("btee5", data);

        // toast('Hello From The Other Side.');
        // toast.success('Hello From The Other Side.');
        if (data.data.status == "success") {
            setNumOfItems(data.data.numOfCartItems)
                        
            toast.success(data.data.message);
        } else {
            toast.error(data.response.data.message)
        }

        x[id] = false
        setCurrentIds(x) //To prevent "Loading" after pressing any button after that

        setIsLoadingBtn(false)
    }
    
    let [productDetails, setProductDetails] = useState(0)
    let [relatedProducts, setRelatedProducts] = useState([])
    let [isLoading, setIsLoading] = useState(true)

    let [isLoadingBtn, setIsLoadingBtn] = useState(false)
    
    // useEffect(() => {
    //     getProductDetails(id)
    //     getRelatedProducts()
    // }, [id])
    // Not Best Practice

    useEffect(() => {
        getProductDetails(id)
    }, [id])

    useEffect(() => {
        getRelatedProducts()
    })

    function getProductDetails(id) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then(({data}) => {
                // console.log(data.data) Clear Console
                setProductDetails(data.data)
                setIsLoading(false)

                if (relatedProducts) {
                    mapData(relatedProducts)
                }
            })
            .catch(err => console.log(err))
    }
    
    function getRelatedProducts() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then(({data}) => {
                // console.log(data.data); Clear Console

                // let x = data.data.filter((ele) => ele.category._id == category && ele.id != id) // {&& ele.id != id} To Remove the Selected Product from the recommended Products
                // console.log(x, "Related Products");
                // setRelatedProducts(x)
                mapData(data.data)
            })
            .catch(err => console.log(err))
    }

    function mapData(data) {
        let x = data.filter((ele) => ele.category._id == category && ele.id != id) // {&& ele.id != id} To Remove the Selected Product from the recommended Products
        // console.log(x, "Related Products"); Clear Console
        setRelatedProducts(x)
    }

    return (
    <>
        {isLoading && <div className="flex w-full justify-center">
            <PacmanLoader />
        </div>}
        {!isLoading && <> 
        <div className='container mx-auto flex items-center'>
            <div className='w-2/4'>
                <Slider {...settings}>
                    {productDetails.images?.map((img, i) => <img key={i} src={img} className='w-full' alt="" />)}
                </Slider>
            </div>
            <div className="w-2/4">
                <h1 className='font-bold text-3xl text-slate-800'>{productDetails.title}</h1>
                <p className='mb-6 text-gray-500'>{productDetails.description}</p>
                <span className='mb-4 block'>{productDetails.category?.name}</span>
                <div className="flex justify-between">
                    <span>{productDetails.price} EGP</span>
                    <span>{productDetails.ratingsAverage} <i className='fa fa-star text-yellow-300'></i></span>
                </div>
                <button disabled={isLoadingBtn} className='btn' onClick={() => addToCartItem(productDetails?.id)}>
                    {isLoadingBtn && currentIds[productDetails.id] ? <i className='fa fa-spinner fa-spin'></i> : <span>Add to cart</span> }
                </button>
            </div>
        </div>
        <div className="container mx-auto row pt-5">
            <h2 className='text-gray-950 font-extrabold text-3xl w-full my-9'>Related Products</h2>
            {relatedProducts.map(product => <ProductItem key={product.id} currentIds={currentIds} isLoadingBtn={isLoadingBtn} addCart={addToCartItem} product={product} /> )}
        </div>
        </> }
    </>
    )
}
