import React, { useState, useEffect } from 'react'
import Layout from "../components/Layout";
import Image from 'next/image'
import balanceStyle from '../styles/balance.module.css'

function Character() {
    const [balancedata, setbalancedata] = useState([])
    
    return (
    <Layout>
        <h1>🧙‍♂️ Balance Game 🧛‍♂️</h1>
        <div className={balanceStyle.container}>
            <div style={{marginTop:200}}>
                <div className="row" >
                    <div className="col-5">
                        <h1>현푸</h1>
                    </div>
                    <div className="col-2">
                        <h1>vs</h1>
                    </div>
                    <div className="col-5">
                        <h1>혼혈왕자</h1>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
    )
}

export default Character;