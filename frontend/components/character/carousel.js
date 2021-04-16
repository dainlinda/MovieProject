import React, { Component, useState } from "react";
import Slider from "react-slick";
import Image from 'next/image'
import {Button} from 'react-bootstrap'
import Carouselstyle from '../../styles/carousel.module.css'
import Link from 'next/link'
import { useMediaQuery } from "react-responsive";

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
  const isPc = useMediaQuery({
      query : "(min-width:426px)"
  });
    const isMobile = useMediaQuery({
      query : "(max-width:425px)"
  });
  const settings = {
    infinite: true,
    speed: 600,   
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    waitForAnimate: false,
  };
  const m_settings = {
    infinite: true,
    speed: 600,   
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    waitForAnimate: false,
  };
  return (
    <>
      {isPc && <>
        <Slider className={Carouselstyle.slider} {...settings}>
          {props.characters.map(function(data, idx){
            const src = "/images/characters/"+data.image
            return (
                    <div key={idx}>
                      <Link href={`/character/${data.id}`}>
                        <button type="button"  className={Carouselstyle.carousel}>
                          <Image className={Carouselstyle.img}
                            priority
                            width={105}
                            height={105}
                            src={src}/>
                          <br/>
                          <p className={Carouselstyle.name}>{data.name}</p>
                        </button>
                      </Link>
                    </div>
                  )
          })}
      </Slider>
      </>}
      {isMobile && <>
        <Slider className={Carouselstyle.slider} {...m_settings}>
          {props.characters.map(function(data, idx){
            const src = "/images/characters/"+data.image
            return (
                    <div key={idx}>
                      <Link href={`/character/${data.id}`}>
                        <button type="button" className={Carouselstyle.carousel}>
                          <Image className={Carouselstyle.img}
                            priority
                            width={60}
                            height={60}
                            src={src}/>
                          <br/>
                          <p className={Carouselstyle.name}>{data.name}</p>
                        </button>
                      </Link>
                    </div>
                  )
          })}
        </Slider>
      </>}
    </>
  );
}
export default Carousel;