import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import React from "react";

export default function Emotion(props) {

    const gColor = ["rgba(189, 31, 0, 0.4)", "rgba(255, 69, 0, 0.4)", "rgba(210, 105, 30, 0.4)", "rgba(255, 215, 0, 0.4)", "rgba(210, 180, 140, 0.4)"]
    const rColor = ["rgba(0, 0, 139, 0.4)", "rgba(65, 105, 225, 0.4)", "rgba(135, 206, 250, 0.4)", "rgba(173, 216, 230, 0.4)", "rgba(119, 136, 153, 0.4)"]
    const sColor = ["rgba(193, 246, 237, 0.4)", "rgba(2, 53, 60, 0.4)", "rgba(68, 147, 36, 0.4)", "rgba(46, 175, 125, 0.4)", "rgba(63, 208, 201, 0.4)"]
    const stickColor =  props.props.dorm == "Gryffindor" ? gColor : props.props.dorm == "Slytherin" ? sColor : rColor
    const key = Object.keys(props.props.emotions)
    const value = Object.values(props.props.emotions)

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
