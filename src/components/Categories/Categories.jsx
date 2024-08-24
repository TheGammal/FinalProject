import React, { useEffect, useState } from 'react'
import styles from './Categories.module.css'
import Slider from 'react-slick';
import axios from 'axios';

export default function Categories() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
    };

    let [categories, setCategories] = useState([])

    function getCategories() {
        axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            .then(({data}) => {
                // console.log(data.data); Clear Console
                setCategories(data.data)
            })
            .catch(err => console.log(err))
    }
    
    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className='container mx-auto'>
            
            <Slider {...settings}>
                {categories.map(category => <div key={category._id}>
                    <img src={category.image} className='h-[260px]' alt="" />
                    <h2>{category.name}</h2>
                </div>)}
            </Slider>
        </div>
    )
}
