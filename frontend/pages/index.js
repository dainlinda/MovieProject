import React, { useState, useEffect } from 'react'
import Layout from "../components/Layout";
import indexStyles from '../styles/index.module.css'
import Image from 'next/image'

import { Container, Row, Col } from 'react-bootstrap';

import axios from 'axios';
import url from '../../config/config'

function Index({ letterData }) {
    
    const [letterList, setLetterList] = useState([])
    const [modal, setModal] = useState(false)
    
    useEffect(() => {
        setLetterList(letterData.letter.split("space"))
    }, [])

    const onClickModalHandler = (e) => {
        setModal(true)
    }

    
    return (
    <Layout>
        <Container>
            <Row>
                <Col>
                    <div className={indexStyles.pageCaption}>
                        <h1 className={indexStyles.pageTitle}>편지가 도착했습니다.</h1>
                    </div>
                </Col>
            </Row>
        </Container>
        <div >
            <Image
                priority
                src="/images/owlletter.png"
                width={600}
                height={504}
                onClick={onClickModalHandler}
                className={indexStyles.mainImg}
            />
        </div>
        {modal ? (
            <div className={indexStyles.modal} onClick={() => setModal(false)} >
                <Image className={indexStyles.modalImg} priority src="/images/letter.png" width={600} height={750} />
                <div className={indexStyles.caption}>
                    {letterList.map((letter, idx) => (
                        <p key={idx}>{letter}</p>
                    ))}
                </div>

            </div>
        ) : (
            ""
        )}
    </Layout>
    )
}

export async function getStaticProps(context) {
    
    const res = await axios.get(url + `/random/letters`)
    const letterData = res.data;

    return {
        props: { letterData },
    }
}

export default Index;