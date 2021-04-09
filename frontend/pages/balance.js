import React, { useState, useEffect, useM } from 'react'
import Layout from "../components/Layout";
import Image from 'next/image'
import balanceStyle from '../styles/balance.module.css'
import axios from 'axios'
import balanceData from '../public/Data/balance_get.json'
import balance_res_Data from '../public/Data/balance_post.json'
import { Button } from 'react-bootstrap';

function Character(data) {
    const [balancegames, setBalancegames] = useState([])
    const [number, setNumber] = useState(0);
    const [result, setResult] = useState([])
    const onClickNextHandler = (e) => {
        console.log(number);
        if(number < 3){
            setNumber(number+1);
        }
        else{
            setNumber(0)
        }
        console.log(number);
        setResult([])
    }

    const onClickLeftHandler = () => {
        setResult(balance_res_Data)
    }

    const onClickRightHandler = () => {
        setResult(balance_res_Data)
    }

    
    return (
    <Layout>
        <h1>🧙‍♂️ Balance Game 🧛‍♂️</h1>
        <div className={balanceStyle.container}>
            <div style={{marginTop:200}}>
                <div className="row" >
                    <div className="col-5" onClick={onClickLeftHandler}>
                        <h1>{data.balance.balance[number].option1}</h1>
                    </div>
                    <div className="col-2">
                        <h1>vs</h1>
                    </div>
                    <div className="col-5" onClick={onClickRightHandler}>
                    <h1>{data.balance.balance[number].option2}</h1>
                    </div>
                </div>
                <div>
                    <Button onClick={onClickNextHandler}>Next</Button>
                </div>
                {result && <div>{result.total}
                {result.left}{result.right}
                </div>}
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