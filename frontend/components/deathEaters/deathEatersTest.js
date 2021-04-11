import React, { useState, useEffect } from 'react'
import { Button,ProgressBar } from 'react-bootstrap';
import styles from '../../styles/deatheater.module.css'

function DeathEatersTest( questionData ) {

    const [allList, setAllList] = useState([])
    const [index, setIndex] = useState(-1)
    const [count, setCount] = useState(0)
    const [resultView, setResultView] = useState(false);


    useEffect(() => {
        
        setAllList(questionData.props)

    }, [])

    const onClickPointHandler = (e) => {
        
        e.preventDefault();
        setCount(e.currentTarget.value)
        setIndex(index + 1)

    }

    function CallAnswers() {
        
        let now = ((index+1) / allList.length) * 100
        const questionText = allList[index].question.split("* ");

        return (
            <>
                <div style={{ margin: "50px auto", width: '70%' }}>
                    <ProgressBar variant="success" animated now={now} />
                </div>
                <div>
                    {questionText.map((text, idx) => (
                        <h4 key={idx}>
                            {text}
                        </h4>
                    ))}
                </div>
                <div style={{ marginTop: "50px" }}>
                    <div className={styles.deContainer}>
                    {allList[index].answers.map((answer, idx) => (
                        <a href="#" key={idx} className={styles.debtn} data-value={answer["score"]} onClick={onClickPointHandler}>{answer["text"]}</a>
                    ))}
                    </div>

                </div>
            </>
        )
    }

    function CallResult() {
        
        if (count < 3) {
            return (
                <>
                    <div style={{ marginTop: "100px" }}>
                        <p>당신과 죽음을 먹는 자는 물과 기름의 관계이군요. </p>
                        <p>조심하세요! 죽음을 먹는 자가 당신을 노릴 수 있습니다.</p>
                    </div>
                    <div >
                        <Button variant="outline-light" style={{ marginTop: "50px" }} onClick={onClickResultHandler}>다시하기</Button>
                    </div>
                </>
            )
        } else if (count < 5) {
            return (
                <>
                    <div style={{ marginTop: "100px" }}>
                    <p>당신은 예비 죽음을 먹는 자입니다.</p><p>조금만 더 노력하면 완벽한 죽음을 먹는 자가 될 수 있겠어요</p><p>벨라트릭스를 보며 배워볼까요?</p>
                    </div>
                    <div >
                        <Button variant="outline-light" style={{ marginTop: "50px" }} onClick={onClickResultHandler}>다시하기</Button>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div style={{ marginTop: "100px" }}>
                        <p>당신은 찐찐찐찐 찐 죽음을 먹는 자이군요. </p>
                        <p>볼드모트의 총애를 받을 상입니다. </p>
                    </div>
                    <div >
                        <Button variant="outline-light" style={{ marginTop: "50px" }} onClick={onClickResultHandler}>다시하기</Button>
                    </div>
                </>
            )
        }
    }

    const onClickResultHandler = (e) => {
        setResultView(false)
        setIndex(-1)
        setCount(0)
    }

    if (index < 0) {
        return <Button variant="outline-light" style={{ marginTop: "100px" }} onClick={(e) => setIndex(0)}>시작하기</Button>

    } else if (index < allList.length) {
        return <CallAnswers />

    } else if (index >= allList.length) {
        return (
            <>
                { resultView ? (
                    <CallResult />
                ) : (
                    <Button variant="outline-light" style={{ marginTop: "100px" }} onClick={(e) => setResultView(true)}>결과보기</Button>
                )}
            </>
        )
    }

}

export default DeathEatersTest;