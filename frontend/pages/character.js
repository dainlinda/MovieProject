import React, { useState, useEffect } from 'react'
import Layout from "../components/Layout";
import Image from 'next/image'
import characterStyle from '../styles/character.module.css'
import Carousel from '../components/carousel'
import WordCloud from '../components/wordcloud'

function Character() {
    const [characters, setCharacters] = useState(1);
    const [analyses, setAnalyses] = useState([]);

    useEffect(() => {
        console.log(characters)
    }, [characters])
    
    return (
    <Layout>
        <div className={characterStyle.container}>
            <div className={characterStyle.imgwrap}>
            <Carousel setCharacters= {setCharacters}/>
            </div>
            <div>
                <WordCloud id={characters}/>
            </div>
            <div className="row" style={{marginTop:100}}>
                <div className="col" style={{marginRight:50}}>
                    <h3>wordcloud</h3>
                    <Image
                        priority
                        src="/images/wordcloud.jpg"
                        width={400}
                        height={400}
                    />
                </div>
                <div className="col">
                    <h3>가장 많이 사용한 주문</h3>    
                    <Image
                        priority
                        src="/images/chart.webp"
                        width={400}
                        height={400}
                    />
                </div>
            </div>
            <div className="row" style={{margin:"0 auto"}}>
                <div className="col-12" style={{marginTop:100}}>
                    <h3>해리포터의 정서분석!</h3>
                    <Image
                            priority
                            src="/images/chart.webp"
                            width={400}
                            height={400}
                        />
                </div>
            </div>
        </div>
    </Layout>
    )
}

export default Character;