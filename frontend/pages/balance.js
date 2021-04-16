import React, { useState} from 'react'
import Layout from "../components/Layout";
import balanceStyle from '../styles/balance.module.css'
import axios from 'axios'
import { Button } from 'react-bootstrap';
import { HorizontalBar } from 'react-chartjs-2';
import url from '../../config/config'

function Balance(props) {
    const [number, setNumber] = useState(0);
    const [result, setResult] = useState([])
    const res_data = {
        labels: [props.balance.options[number].option1,props.balance.options[number].option2],
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
            }],
            yAxes: [{
                ticks: {
                    fontColor : "white"
                }
            }],
        },
        maintainAspectRatio: false // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
    }
    const onClickNextHandler = (e) => {
        console.log(number);
        if(number < props.balance.options.length-1){
            setNumber(number+1);
        }
        else{
            setNumber(0)
        }
        setResult([])
    }
    
    const onClickLeftHandler = () => {
        const data ={"left":1, "right":0}
        const choose = number + 1;
        axios.post(url+'/games/balance/response/'+choose,data).then(response => {
            setResult(response.data);
        });
    }

    const onClickRightHandler = () => {
        const data ={"left":0, "right":1}
        const choose = number + 1;
        console.log(choose);
        axios.post(url+'/games/balance/response/'+choose,data).then(response => {
            console.log(response.data);
            setResult(response.data);
        });
    }
    return (
        <Layout>
        <div className="container">
            <div className="row" style={{justifyContent:"center"}}>
                <h1 className={balanceStyle.title}>🧙‍♂️ Balance Game 🧛‍♂️</h1>
                <div className={balanceStyle.btn-container}>
                    <span className={balanceStyle.mas}>MASK1</span>
                    <button id={balanceStyle.work} type="button" name="hover">MASK1</button>
                </div>
            </div>
            <div className="row">
                <div className="col-5" onClick={onClickLeftHandler}>
                    <Button variant="outline-light" className={balanceStyle.btn}>
                        <h2>{props.balance.options[number].option1}</h2></Button>
                </div>
                <div className="col-2">
                    <h1 className={balanceStyle.vs}>vs</h1>
                </div>
                <div className="col-5" onClick={onClickRightHandler}>
                    <Button variant="outline-light" className={balanceStyle.btn}>
                        <h2>{props.balance.options[number].option2}</h2></Button>
                </div>
            </div>
            <div className="row" style={{justifyContent:"center"}}>
                <Button className={balanceStyle.nextbtn} variant="outline-light"  onClick={onClickNextHandler}>Next</Button>
            </div>
            <div className="row" style={{width:"100%", padding: 50}}>
            { (result.left > 0 || result.right > 0 ) && <HorizontalBar
                data={res_data}
                options={options}
                width={400}
                height={150}
                />
            }
            </div>
        </div>
    </Layout>
    )
}
Balance.getInitialProps = async function() {
    const {data: balance} = await axios.get(url+'/games/balance/option');
    return {
      balance
    };
}
export default Balance;