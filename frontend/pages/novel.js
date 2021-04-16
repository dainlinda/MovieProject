import React, { useState, useEffect } from 'react'
import Layout from "../components/Layout";
import Image from 'next/image'
import styles from '../styles/novel.module.css'
import url from '../../config/config'
import axios from 'axios';
import { useMediaQuery } from "react-responsive"
import { Container, Row, Col} from 'react-bootstrap';

function Novel({ novelData }) {

    const isPc = useMediaQuery({
        query : "(min-width:1025px)"
    });
    const isTablet = useMediaQuery({
        query : "(min-width:769px) and (max-width:1024px)"
    });
    const isTablet2 = useMediaQuery({
        query : "(min-width:426px) and (max-width:768px)"
    });
      const isMobile = useMediaQuery({
        query : "(max-width:425px)"
    });

    const [novelList, setNovelList] = useState([])

    useEffect(() => {
        
        setNovelList(novelData.novel.split("space"))

    }, [])

    const onClickNovelCallHandler = (e) => {
        
        axios.get(url + `/random/novels`).then((res) => {
            setNovelList(res.data.novel.split("space"))
        }).catch((error) => {
            alert(error)
        })
    }
    
    {/* Todo : component 찢기 */}
    return (
    <Layout>
        <Container>
        {isPc && 
            <>
            <Row>
                <Col>
                    <div className={styles.pdtb}>
                        <h2 className={styles.pageTitle}>당신이 마법세계에 간다면 어떤 일이 일어날까?</h2>
                    </div>
                </Col>
            </Row>
            <Row >
                <Image
                    priority
                    src="/images/sheet.png"
                    width={1100}
                    height={600}
                />
                <div className={styles.caption}>
                    {novelList.map((novel, idx) => (
                        <h3 key={idx}>{novel}</h3>
                    ))}
                </div>

            </Row>
            <Row style={{ cursor: "pointer"}}>
                <Col>
                <p onClick={onClickNovelCallHandler}>부엉이에게 새로운 편지 부탁하기</p>
                </Col>
            </Row>
        </>}
        {isTablet && 
        <>
            <Row>
                <Col>
                    <div className={styles.pdtb}>
                        <h2 className={styles.pageTitle}>당신이 마법세계에 간다면 어떤 일이 일어날까?</h2>
                    </div>
                </Col>
            </Row>
            <Row >
                <Image
                    priority
                    src="/images/sheet.png"
                    width={1100}
                    height={600}
                />
                <div className={styles.caption}>
                    {novelList.map((novel, idx) => (
                        <h3 key={idx}>{novel}</h3>
                    ))}
                </div>

            </Row>
            <Row style={{ cursor: "pointer"}}>
                <Col>
                    <p onClick={onClickNovelCallHandler}>부엉이에게 새로운 편지 부탁하기</p>
                </Col>
            </Row>
        </>}
        {isTablet2 && 
        <>
            <Row>
                <Col>
                    <div className={styles.pdtb}>
                        <h2 className={styles.pageTitle}>당신이 마법세계에 간다면 어떤 일이 일어날까?</h2>
                    </div>
                </Col>
            </Row>
            <Row >
                <Col style={{ height: "400px"}}>
                    <Image
                        priority
                        src="/images/sheet.png"
                        width={1100}
                        height={600}
                        layout="responsive"
                    />
                    <div className={styles.caption}>
                        {novelList.map((novel, idx) => (
                            <h3 key={idx}>{novel}</h3>
                        ))}
                    </div>
                </Col>
            </Row>
            <Row style={{ cursor: "pointer"}}>
                <Col>
                    <p onClick={onClickNovelCallHandler}>부엉이에게 새로운 편지 부탁하기</p>
                </Col>
            </Row>
        </>}
        {isMobile && 
        <>
            <Row>
                <Col >
                    <div className={styles.pdtb}>
                        <h2 className={styles.pageTitle}>당신이 마법세계에 간다면 어떤 일이 일어날까?</h2>
                    </div>
                </Col>
            </Row>
            <Row >
                <Col style={{ height: "500px"}}>
                    <Image
                        priority
                        src="/images/sheet.png"
                        width={400}
                        height={500}
                    />
                    <div className={styles.caption}>
                        {novelList.map((novel, idx) => (
                            <p key={idx}>{novel}</p>
                        ))}
                    </div>
                </Col>
            </Row>
            <Row style={{ cursor: "pointer"}}>
                <Col>
                <p onClick={onClickNovelCallHandler}>부엉이에게 새로운 편지 부탁하기</p>
                </Col>
            </Row>
        </>
        }
        </Container>
    </Layout>
    )
}


export async function getServerSideProps(context) {
    const res = await axios.get( url + `/random/novels` )
    const novelData = res.data

    return {
        props: { novelData },
    }
}

export default Novel;