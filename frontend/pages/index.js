import React, { useState, useEffect } from 'react'
import Layout from "../components/Layout";
import indexStyles from '../styles/index.module.css'
import Image from 'next/image'
import letterData from '../public/Data/random_letter.json'

function Index() {
    
    const [character, setCharacter] = useState("")
    const [place, setPlace] = useState("")
    const [food, setFood] = useState("")
    const [creature, setCreature] = useState("")

    const [modal, setModal] = useState(false)
    
    useEffect(() => {
        setCharacter(letterData.data.character)
        setPlace(letterData.data.place)
        setFood(letterData.data.food)
        setCreature(letterData.data.creature)
    }, [])

    const onClickModalHandler = (e) => {
        setModal(true)
    }

    
    return (
    <Layout>
        <div className="page-header" >
            <div className="container">
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className={indexStyles.pageCaption}>
                            <h1 className={indexStyles.pageTitle}>편지가 도착했습니다.</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <div className={indexStyles.mainImg}>
            <Image
                priority
                src="/images/owlletter.png"
                width={600}
                height={504}
                onClick={onClickModalHandler}
            />
        </div>
        {modal ? (
            <div className={indexStyles.modal} onClick={() => setModal(false)}>
                {/* <span className="close" >&times;</span> */}
                <Image className={indexStyles.modalImg} priority src="/images/letter.png" width={600} height={750} />
                <div className={indexStyles.caption}>
                    <h3>안녕?</h3><br/>
                    <p>난 {character}야!</p>
                    <p>내가 편지를 보냈다는 걸 아무도 알아선 안돼.</p>
                    <p>내일 저녁 6시 {place}(으)로 가.</p>
                    <p>거기서 {food}을/를 먹고 있는 자를 찾아.</p>
                    <p>그가 너에게 무엇을 해야할지 알려줄거야. </p>
                    <p>가는 길에 {creature}을/를 조심해!</p>
                </div>

            </div>
        ) : (
            ""
        )}
    </Layout>
    )
}

export default Index;