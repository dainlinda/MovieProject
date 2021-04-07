import React, { Component } from "react";
import Slider from "react-slick";
import Image from 'next/image'
export default class SimpleSlider extends Component {
  render() {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 3,
    };
    const data = [
        {"id": 1, "name": "해리포터", "url": "/images/character/harry.png"},
        {"id": 2, "name": "헤르미온느", "url": "/images/character/Hermione.png"},
        {"id": 2, "name": "지니", "url": "/images/character/jinny.png"},
        {"id": 2, "name": "루나", "url": "/images/character/luna.png"},
        {"id": 2, "name": "말포이", "url": "/images/character/malfoy.png"},
        {"id": 2, "name": "론", "url": "/images/character/rone.png"}
    ];
    return (
      <div>
        <Slider style={{width:700}} {...settings}>
          <div>
          <Image
                            priority
                            src="/images/character/harry.png"
                            width={100}
                            height={100}
                    />
          </div>
          <div>
          <Image
                            priority
                            src="/images/character/harry.png"
                            width={100}
                            height={100}
                    />
          </div>
          <div>
          <Image
                            priority
                            src="/images/character/harry.png"
                            width={100}
                            height={100}
                    />
          </div>
          <div>
          <Image
                            priority
                            src="/images/character/harry.png"
                            width={100}
                            height={100}
                    />
          </div>
          <div>
          <Image
                            priority
                            src="/images/character/harry.png"
                            width={100}
                            height={100}
                    />
          </div>
          <div>
          <Image
                            priority
                            src="/images/character/harry.png"
                            width={100}
                            height={100}
                    />
          </div>
        </Slider>
        {data.map(function(d, idx){
         return (<li key={idx}>{d.name}</li>)
       })}
      </div>
    );
  }
}
