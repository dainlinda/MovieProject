import React, { useState, useEffect } from 'react'
import Layout from "../components/Layout";
import seriesStyles from '../styles/series.module.css';
import {Bar, Pie} from 'react-chartjs-2';
import axios from 'axios';
import url from '../../config/config'

import seriesCharacterData from '../public/Data/series_character.json'
import seriesSpellData from '../public/Data/series_spell.json'

function Series({ charaterData, spellsData }) {

    const [top5List, setTop5List] = useState([])
    const [idList, setIdList] = useState([])
    const [nameList, setNameList] = useState([])
    const [cntList, setCntList] = useState([])

    const [allSeriesNameList, setAllSeriesNameList] = useState([])
    const [allSeriesCntList, setAllSeriesCntList] = useState([])
    const [seriesList, setSeriesList] = useState([])
    
    const stickColor = ["rgba(193, 246, 237, 0.4)", "rgba(2, 53, 60, 0.4)", "rgba(68, 147, 36, 0.4)", "rgba(46, 175, 125, 0.4)", "rgba(63, 208, 201, 0.4)"]
    const hoverStickColor = ["rgba(193, 246, 237, 1)", "rgba(2, 53, 60, 1)", "rgba(68, 147, 36, 1)", "rgba(46, 175, 125, 1)", "rgba(63, 208, 201, 1)"]

    function repeat(arr, len) {
        while (arr.length < len) arr = arr.concat(arr.slice(0, len-arr.length));
        return arr;
    }

    useEffect(() => {
        
        setTop5List(charaterData.top5)

        charaterData.character.map(function(character){
            setIdList(idList => [...idList, character['id']])
            setNameList(nameList => [...nameList, character['name']])
            setCntList(cntList => [...cntList, character['speech_cnt']])
        });

        setAllSeriesNameList(Object.keys(spellsData.allseries))
        setAllSeriesCntList(Object.values(spellsData.allseries))

        setSeriesList(spellsData.series)

    }, [])

    const data = {
        labels: nameList,
        datasets: [{
            label: '각 캐릭터의 대사수',
            data: cntList,
            backgroundColor: repeat(stickColor, cntList.length),
            borderColor: repeat(stickColor, cntList.length),
            borderWidth: 1
        }]
    }

    const top5 = top5List.sort().map(function(top5) {
        return(
            <p className="pageTitle" key={top5[0]}>
                <a href="/character" className={seriesStyles.a}>{top5[0]}. {top5[1]}</a>
            </p>
        );
    });

    const allSpellsData = {
        labels: allSeriesNameList,
        datasets: [{
            label: '전시리즈의 주문수',
            data: allSeriesCntList,
            backgroundColor: repeat(stickColor, allSeriesCntList.length),
            borderColor: repeat(hoverStickColor, allSeriesCntList.length),
            borderWidth: 1
        }]
    }

    const seriesSpell = seriesList.map(function(series, idx) {
        
        const piedata = {
            labels: Object.keys(series.spell),
            datasets: [{
                data: Object.values(series.spell),
                backgroundColor: repeat(stickColor, Object.values(series.spell).length),
                hoverOffset: 30,
                borderColor: false
            }]
        };
        return(
            <div className="col-4" key={idx}>
                <p style={{ marginTop: "2rem", marginBottom: "1rem" }} >{series.title}</p>
                <div>
                    <Pie
                        data={piedata}
                        width={200}
                        height={200}
                        options={{
                            legend: { 
                                display: true, 
                                position: "top",
                                labels: {
                                    fontColor: "white",
                                } },
                            datalabels: {
                                display: true,
                                color: "white",
                            },
                        }}
                    />
                </div>
            </div>
        );
    });
    

    return (
        <Layout>
            <div className="container v-100">
                <div className="container v-100" style={{ marginTop: '40px'}}>
                    
                    <p className={seriesStyles.pageTitle}>전체 대사량 그래프</p><br/>
                    <div className="row">
                        <div className="col-8">
                            <div>
                                <Bar
                                data={data}
                                width={400}
                                height={200}
                                options={{
                                    maintainAspectRatio: true,
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true,
                                                fontColor : "white"
                                            }
                                        }],
                                        xAxes: [{
                                            ticks:{
                                                fontColor : 'white',
                                            }
                                            
                                        }]
                                    },
                                }}
                                />
                            </div>
                        </div>
                        <div className="col-4" style={{ lineHeight: '2.5em' }}>
                            {top5}
                            캐릭터명을 선택하면 캐릭터 분석 페이지로 이동합니다.
                        </div>
                    </div>

                    <p className={seriesStyles.pageTitle}>전체 시리즈 사용 주문 그래프</p><br/>
                    <div className="row" >
                        <Bar
                            data={allSpellsData}
                            width={400}
                            height={200}
                            options={{
                                maintainAspectRatio: true,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                            fontColor : "white"
                                        }
                                    }],
                                    xAxes: [{
                                        ticks:{
                                            fontColor : 'white',
                                        }
                                        
                                    }]
                                },
                            }}
                        />
                    </div>

                    <p className={seriesStyles.pageTitle}>각 시리즈별 가장 많이 사용된 주문</p><br/>
                    <div className="row"  style={{ paddingBottom: '2em' }}>
                        {seriesSpell}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps(context) {
    
    const charaterData = seriesCharacterData
    const spellsData = seriesSpellData

    return {
        props: { charaterData, spellsData }, // will be passed to the page component as props
    }
}

export default Series;

