import React, { Component } from "react";
import Slider from "react-slick";
import Image from 'next/image'
import {Button} from 'react-bootstrap'

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block"}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", fontSize: 30}}
      onClick={onClick}
    />
  );
}

export default class Carousel extends Component {
  render() {
    const {setCharacters} = this.props;


    const settings = {
      infinite: true,
      speed: 500,   
      slidesToShow: 5,
      slidesToScroll: 3,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      waitForAnimate: false,
    };
    const data = [
        {"id": 1, "name": "해리포터", "url": "/images/character/harry.png"},
        {"id": 2, "name": "헤르미온느", "url": "/images/character/Hermione.png"},
        {"id": 3, "name": "지니", "url": "/images/character/jinny.png"},
        {"id": 4, "name": "루나", "url": "/images/character/luna.png"},
        {"id": 5, "name": "말포이", "url": "/images/character/malfoy.png"},
        {"id": 6, "name": "론", "url": "/images/character/rone.png"},
        {"id": 7, "name": "해리포터", "url": "/images/character/harry.png"},
        {"id": 8, "name": "헤르미온느", "url": "/images/character/Hermione.png"},
        {"id": 9, "name": "지니", "url": "/images/character/jinny.png"},
        {"id": 10, "name": "루나", "url": "/images/character/luna.png"},
        {"id": 11, "name": "말포이", "url": "/images/character/malfoy.png"},
        {"id": 12, "name": "론", "url": "/images/character/rone.png"}
    ]
    return (
      <div>
        <Slider style={{width:800}} {...settings}>
          {data.map(function(character, idx){
            return (
                    <div key={idx} style={{display:"flex", flexDirection:"column"}} >
                      <Button variant="dark" onClick={() => setCharacters(character.id)}>
                        <Image
                          priority
                          src={character.url}
                          width={100}
                          height={100}/>
                        <br/>
                        {character.name}
                      </Button>
                    </div>
                  )
          })}
        </Slider>
      </div>
    );
  }
}
