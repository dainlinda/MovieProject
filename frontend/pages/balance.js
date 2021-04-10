import React, { useState, useEffect, useM } from 'react'
import Layout from "../components/Layout";
import balanceStyle from '../styles/balance.module.css'
import axios from 'axios'
import { Button } from 'react-bootstrap';
import {HorizontalBar, Bar} from 'react-chartjs-2';

function Character(props) {
    const [number, setNumber] = useState(0);
    const [result, setResult] = useState([])
    console.log(result.left)
    const res_data = {
        labels: [props.balance.balance[number].option1,props.balance.balance[number].option2],
        datasets: [{
            axis: 'y',
            label: 'Random Games',
            data: [result.left, result.right],
            // fill: false,
            backgroundColor: [
            'rgba(75, 192, 192, 0.4)',
            'rgba(255, 206, 86, 0.4)'
            ],
            borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)'
            ],
            color: '#666',
            borderWidth: 1
        }]
    };
    const options = {
        legend: {
            display: false, // label 숨기기
        },
        scales: {
            xAxes: [{
                ticks: { 
                    min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
                    stepSize: 10, // 스케일에 대한 사용자 고정 정의 값
                }
            }]
        },
        maintainAspectRatio: false // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
    }
    const onClickNextHandler = (e) => {
        console.log(number);
        if(number < props.balance.balance.length-1){
            setNumber(number+1);
        }
        else{
            setNumber(0)
        }
        console.log(number);
        setResult([])
    }
    
    const onClicktHandler = () => {
        axios.post('https://mca-back-api.herokuapp.com/api/balance').then(response => {
            console.log(response);
            setResult(response.data.balance_result);
            console.log(result);
        });
    }

    return (
    <Layout>
        <h1 style={{padding:30}}>🧙‍♂️ Balance Game 🧛‍♂️</h1>
        <div className={balanceStyle.container}>
            <div style={{marginTop:80}}>
                <div className="row" style={{height:100}} >
                    <div className="col-5" onClick={onClicktHandler}>
                        <h1>{props.balance.balance[number].option1}</h1>
                    </div>
                    <div className="col-2">
                        <h1>vs</h1>
                    </div>
                    <div className="col-5" onClick={onClicktHandler}>
                        <h1>{props.balance.balance[number].option2}</h1>
                    </div>
                </div>
                <div style={{marginTop:80}}>
                    <Button onClick={onClickNextHandler}>Next</Button>
                </div>
                <div className="row" style={{width:"100%", padding: 50}}>
                {result && <HorizontalBar
                    data={res_data}
                    options={options}
                    width={400}
                    height={150}
                    />
                }
                </div>
            </div>
        </div>
    </Layout>
    )
}
Character.getInitialProps = async function() {
    const {data: balance} = await axios.get('https://mca-back-api.herokuapp.com/api/balance');
    return {
      balance
    };
  }
export default Character;