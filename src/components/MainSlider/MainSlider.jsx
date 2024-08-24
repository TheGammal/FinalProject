import React, { useEffect, useState } from 'react'
import styles from './MainSlider.module.css'
import Slider from 'react-slick'
import slider1 from '../../assets/images/slider-image-1.jpeg'
import slider2 from '../../assets/images/slider-image-2.jpeg'
import slider3 from '../../assets/images/slider-image-3.jpeg'

export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    let [count, setCount] = useState(0)
    useEffect(() => {}, [])
    return (
        <div className='container mx-auto flex'>
            <div className='w-3/4'>
                <Slider {...settings}>
                    <img src={slider1} className='h-[600px]' alt="" />
                    <img src={slider2} className='h-[600px]' alt="" />
                    <img src={slider3} className='h-[600px]' alt="" />
                </Slider>
            </div>
            <div className='w-1/4'>
                <img src={slider2} className='h-[300px] w-full' alt="" />
                <img src={slider3} className='h-[300px] w-full' alt="" />
            </div>
        </div>
    )
}
