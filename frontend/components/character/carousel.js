import React, { Component, useState } from "react";
import Slider from "react-slick";
import Image from 'next/image'
import {Button} from 'react-bootstrap'
import Carouselstyle from '../../styles/carousel.module.css'
import Link from 'next/link'

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={Carouselstyle.nextArrow}
      style={{ ...style, display: "block"}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={Carouselstyle.prevArrow}
      style={{ ...style, display: "block"}}
      onClick={onClick}
    />
  );
}

function Carousel(props) {
  const settings = {
    infinite: true,
    speed: 600,   
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    waitForAnimate: false,
  };
  return (
    <div>
      <Slider className={Carouselstyle.slider} {...settings}>
        {props.characters.map(function(data, idx){
          const src = "/images/characters/"+data.image
          return (
                  <div key={idx} style={{display:"flex", flexDirection:"column"}} >
                    <Link href={`/character/${data.id}`}>
                      <Button variant="outline-light" className={Carouselstyle.carousel}>
                        <Image className={Carouselstyle.img}
                          priority
                          width={105}
                          height={105}
                          src={src}/>
                        <br/>
                        <p className={Carouselstyle.name}>{data.name}</p>
                      </Button>
                    </Link>
                  </div>
                )
        })}
      </Slider>
    </div>
  );
}
export default Carousel;