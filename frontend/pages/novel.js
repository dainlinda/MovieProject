import React, { useState, useEffect } from 'react'
import Layout from "../components/Layout";
import Image from 'next/image'
import indexStyles from '../styles/index.module.css'
import url from './config'
import axios from 'axios';
import fakeData from '../public/Data/random_novel_copy.json'

// todo : 반응형 작업
function Novel({ novelData }) {

    const [character1, setCharacter1] = useState("")
    const [character2, setCharacter2] = useState("")
    const [place, setPlace] = useState("")
    const [spell, setSpell] = useState("")
    const [item, setItem] = useState("")

    useEffect(() => {
        
        console.log(novelData)

        setCharacter1(novelData.novel.character1)
        setCharacter2(novelData.novel.character2)
        setPlace(novelData.novel.place)
        setSpell(novelData.novel.spell)
        setItem(novelData.novel.item)

    }, [])

    const onClicNovelCallHandler = (e) => {
        
        setCharacter1(fakeData.character1)
        setCharacter2(fakeData.character2)
        setPlace(fakeData.place)
        setSpell(fakeData.spell)
        setItem(fakeData.item)
    }

    return (
    <Layout>
        <div className="page-header" >
            <div className="container">
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div style={{ paddingTop: "100px" }}>
                            <h2 className={indexStyles.pageTitle}>당신이 마법세계에 간다면 어떤 일이 일어날까?</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <br/>
        <div >
            <Image
                priority
                src="/images/sheet.png"
                width={1100}
                height={600}
                // onClick={onClickModalHandler}
            />
            <div style={{ position: "absolute", left: '50%', top: '52%', transform: 'translate(-50%,-50%)', color: "black"}}>
                <h2>당신은 어느날 우연히 {place}을/를 방문했다가 {character1}을/를 만나게 됩니다.</h2><br/>
                <h3>그 곳에서 당신은 {character1}이/가 "{spell}"라고 주문을 말하는 것을 보게됩니다.</h3>
                <h3>그 후 밖을 나온 당신은 {character2}를 만나게 됩니다.</h3>
                <h3>당신은 {character2}에게 {item}을/를 받고 그 댓가로 당신이 들은 말을 전해줍니다.</h3>
            </div>

        </div>
        <div style={{ cursor: "pointer"}}>
            <p onClick={onClicNovelCallHandler}>부엉이에게 새로운 편지 부탁하기</p>
        </div>
    </Layout>
    )
}


export async function getServerSideProps(context) {
    const res = await axios.get( url + `/api/novel` )
    const novelData = res.data
    console.log("novelData ", novelData)

    return {
        props: { novelData }, // will be passed to the page component as props
    }
}

export default Novel;