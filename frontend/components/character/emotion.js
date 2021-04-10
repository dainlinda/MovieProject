import axios from 'axios';
import Chart from "chart.js";
import React from "react";

export default function Emotion(props) {
  React.useEffect(() => {
    let config = {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
    };
    let ctx = document.getElementById("bar-charts").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, []);
  return (
    <>
          <div>
            <canvas id="bar-charts"></canvas>
          </div>
    </>
  );
}
  Emotion.getInitialProps = 
    async function() {
    const res = await axios.get('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.data
    console.log(data);
  
    return {
      data: data
    }
  }
