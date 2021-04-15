import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import React from "react";

export default function Emotion(props) {

  const stickColor = ["rgba(193, 246, 237, 0.4)", "rgba(2, 53, 60, 0.4)", "rgba(68, 147, 36, 0.4)", "rgba(46, 175, 125, 0.4)", "rgba(63, 208, 201, 0.4)"]
  const key = Object.keys(props.props)
  const value = Object.values(props.props)
  
  function repeat(arr, len) {
    while (arr.length < len) arr = arr.concat(arr.slice(0, len-arr.length));
    return arr;
}

  const res_data = {
    labels: key,
    datasets: [{
        label: '감정 분석',
        data: value,
        // fill: false,
        backgroundColor: repeat(stickColor,value.length) ,
        borderColor: repeat(stickColor,value.length),
        borderWidth: 2
    }]
};
const options = {
legend: {
    display: false, // label 숨기기
},
scales: {
    xAxes: [{
        ticks: { 
            fontColor: "white"
        }
    }],
    yAxes: [{
        ticks: {
            min: 0,
            stepSize: 5,
            fontColor : "white"
        }
    }],
},
maintainAspectRatio: false // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
}
return (
<div>
  <Bar
            data={res_data}
            options={options}
            width={400}
            height={200}
      />
</div>
)
}
