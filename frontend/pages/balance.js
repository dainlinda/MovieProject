import React, { useState, useEffect, useM } from 'react'
import Layout from "../components/Layout";
import Image from 'next/image'
import balanceStyle from '../styles/balance.module.css'
import axios from 'axios'
import balanceData from '../public/Data/balance_get.json'
import balance_res_Data from '../public/Data/balance_post.json'
import { Button } from 'react-bootstrap';

function Character(props) {
    const [balancegames, setBalancegames] = useState([])
    const [number, setNumber] = useState(0);
    const data = balanceData.balance;

    const onClickNextHandler = (e) => {
        console.log(number);
        setNumber(number+1);
        console.log(number);
    }

    useEffect(() => {
        setBalancegames(data); 
        
        console.log(balancegames)
    }, [])
    
    return (
    <Layout>
        <h1>🧙‍♂️ Balance Game 🧛‍♂️</h1>
        <div className={balanceStyle.container}>
            <div style={{marginTop:200}}>
                <div className="row" >
                    <div className="col-5">
                        <h1></h1>
                    </div>
                    <div className="col-2">
                        <h1>vs</h1>
                    </div>
                    <div className="col-5">
                        {/* <h1>{balancegames[1][option2]}</h1> */}
                    </div>
                </div>
                <div>
                    <Button onClick={onClickNextHandler}>Next</Button>
                </div>
            </div>
        </div>
    </Layout>
    )
}

export default Character;