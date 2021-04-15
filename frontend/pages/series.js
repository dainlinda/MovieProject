import React, { useState, useEffect } from 'react'
import Layout from "../components/Layout";
import seriesStyles from '../styles/series.module.css';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import url from '../config/config'
import { Container, Row, Col } from 'react-bootstrap';
import { useMediaQuery } from "react-responsive"

// todo component 찢기
function Series({ charaterData, spellsData }) {

    const isPc = useMediaQuery({
        query : "(min-width:1024px)"
    });
      const isTablet = useMediaQuery({
        query : "(min-width:426px) and (max-width:1023px)"
    });
      const isMobile = useMediaQuery({
        query : "(max-width:425px)"
    });

    const [top4List, setTop4List] = useState([])
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

        setTop4List(charaterData.top4)

        charaterData.top20.map(function(character){
            setIdList(idList => [...idList, character['characters_id']])
            setNameList(nameList => [...nameList, character['character_name']])
            setCntList(cntList => [...cntList, character['speech_count']])
        });

        setAllSeriesNameList(Object.keys(spellsData.all_series))
        setAllSeriesCntList(Object.values(spellsData.all_series))

        setSeriesList(spellsData.series)

    }, [])

    const data = {
        labels: nameList,
        datasets: [{
            label: '각 캐릭터의 대사수',
            data: cntList,
            backgroundColor: repeat(stickColor, cntList.length),
            borderColor: repeat(hoverStickColor, cntList.length),
            borderWidth: 1
        }]
    }

    const top4 = top4List.sort().map(function(top4, idx) {
        return(
            <p className="pageTitle" key={idx}>
                <a href={"/character/" + top4['characters_id']} className={seriesStyles.a}>{idx+1}. {top4['character_name']}</a>
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
            <Col key={idx}>
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
                                    // color: 'white',
                                    fontColor: "white",

                                } },
                            datalabels: {
                              display: true,
                              color: "white",
                            },
                        }}
                    />
                </div>
            </Col>
        );
    });
    

    return (
        <Layout>
            <Container style={{ marginTop: '40px' }}>
            {/* Todo : component 로 찢기 */}
            {isPc && 
            <>
                <p className={seriesStyles.pageTitle}>전체 시리즈 대사량 그래프</p><br/>
                <Row>
                    <Col sm={8} >
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
                    </Col>
                    <Col sm={4} style={{lineHeight: '2.5'}}>
                        {top4}
                        캐릭터명을 선택하면 캐릭터 분석 페이지로 이동합니다.
                    </Col>
                </Row>

                <p className={seriesStyles.pageTitle}>전체 시리즈 사용 주문 그래프</p>
                <Row>
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
                </Row>

                <p className={seriesStyles.pageTitle}>각 시리즈별 가장 많이 사용된 주문</p><br/>
                <Row xs={1} md={3} style={{ paddingBottom: '2em' }}>
                    {seriesSpell}

                </Row>
            </>
            }
            {isTablet && 
                <>
                <p className={seriesStyles.pageTitle}>전체 시리즈 대사량 그래프</p><br/>
                <Row>
                    <Col sm={8}>
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
                    </Col>
                    <Col sm={4}>
                        {top4}
                        캐릭터명을 선택하면 캐릭터 분석 페이지 이동합니다.
                    </Col>
                </Row>

                <p className={seriesStyles.pageTitle}>전체 시리즈 사용 주문 그래프</p>
                <Row>
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
                </Row>

                <p className={seriesStyles.pageTitle}>각 시리즈별 가장 많이 사용된 주문</p><br/>
                <Row xs={1} md={2} style={{ paddingBottom: '2em' }}>
                    {seriesSpell}

                </Row>
            </>
            }
            {isMobile && 
                <>
                <p className={seriesStyles.pageTitle}>전체 시리즈 대사량 그래프</p><br/>
                <Row>
                    <Col sm={8}>
                        <div>
                            <Bar
                            data={data}
                            width={400}
                            height={200}
                            options={{
                                maintainAspectRatio: false,
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
                    </Col>
                    <Col sm={4}>
                        {top4}
                        캐릭터명을 선택하면 캐릭터 분석 페이지 이동합니다.
                    </Col>
                </Row>

                <p className={seriesStyles.pageTitle}>전체 시리즈 사용 주문 그래프</p>
                <Row>
                    <Bar
                        data={allSpellsData}
                        width={400}
                        height={200}
                        options={{
                            maintainAspectRatio: false,
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
                </Row>

                <p className={seriesStyles.pageTitle}>각 시리즈별 가장 많이 사용된 주문</p><br/>
                <Row xs={1} md={3} style={{ paddingBottom: '2em' }}>
                    {seriesSpell}
                </Row>

                </>}
            </Container>
        </Layout>
    )
}

export async function getStaticProps(context) {
    
    const res = await axios.get( url + `/series/speech` )
    const charaterData = res.data;

    const spellsRes = await axios.get( url + `/series/spell` )
    const spellsData = spellsRes.data;

    return {
        props: { charaterData, spellsData }
    }
}

export default Series;