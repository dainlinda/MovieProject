import React, { useState } from 'react'
import Layout from "../../components/Layout";
import characterStyle from '../../styles/character.module.css'
import Carousel from '../../components/character/carousel'
import WordCloud from '../../components/character/wordcloud'
import Spell from '../../components/character/spell';
import Emotion from '../../components/character/emotion';
import axios from 'axios';
import url from '../../../config/config';
import { useRouter } from 'next/router'

export async function getStaticPaths() {
    const res = await axios.get(url+'/characters');
    const characters = await res.data.characters
    const paths = characters.map((character) =>({
        params: {id : character.id.toString()}
    }))
    return { paths, fallback: false }
}


export async function getStaticProps({params}) {
    const res_character = await axios.get(url+'/characters');
    const characterData = res_character.data

    const detail_data = await axios.get(url+`/characters/${params.id}/info`);
    const data = detail_data.data
    return {
      props: {characterData,data}
    }
}

export default function Detail({characterData,data,props}){
    const router = useRouter()
    const id =router.query.id - 1
    return(
        <Layout>
        <div className="container">
            <div className="row" style={{justifyContent:"center"}}>
            <Carousel characters={characterData.characters}/>
            </div>
            <div className="row">
                <div className="col-6">
                    <h3 className={characterStyle.title}>wordcloud</h3>
                    <WordCloud props = {data.wordcloud}/>
                </div>
                <div className="col-6">
                    <h3 className={characterStyle.title2}>가장 많이 사용한 주문</h3>    
                    <Spell props = {data}/>
                </div>
            </div>
            <div className="row">
                <div className="col-12 mt-5 py-md-5">
                    <h3 className={characterStyle.title2}>{data.name}의 정서분석!</h3>
                    <Emotion props = {data}/>
                </div>
            </div>
        </div>
    </Layout>
    );
}