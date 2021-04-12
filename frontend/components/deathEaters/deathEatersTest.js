import React, { useState, useEffect } from 'react'
import { ToggleButton, Button, ButtonGroup } from 'react-bootstrap';



function DeathEatersTest( questionData ) {

    const [allList, setAllList] = useState([])
    
    const [index, setIndex] = useState(-1)
    const [count, setCount] = useState(0)
    const [radioValue, setRadioValue] = useState(1);

    useEffect(() => {
        
        setAllList(questionData.props)

    }, [])

    const onClickPointHandler = (e) => {
        
        e.preventDefault();

        setRadioValue(e.currentTarget.value)
        setCount(e.currentTarget.value)
        console.log(e.currentTarget.value)

        setIndex(index + 1)
    }

    useEffect(() => {
        
        console.log(index)

    }, [index])

    function CallAnswers() {
        
        return (
            <>
                <div >
                    <h4>{allList[index].question}</h4>
                </div>
                <div style={{ marginTop: "30px" }}>
                    <ButtonGroup toggle size="lg">
                        {allList[index].answers.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            type="radio"
                            variant="light"
                            name="radio"
                            value={radio["score"]}
                            checked={radioValue === radio["score"]}
                            onClick={onClickPointHandler} 
                        >
                            {radio["text"]}
                        </ToggleButton>
                        ))}
                    </ButtonGroup>
                </div>
            </>
        )
    }

    function Callresult() {
        
        return (
            <>
                <div >
                    당신은 찐찐찐찐 찐 죽음을 먹는 자이군요. 
                    볼드모트의 총애를 받을 상입니다. 
                </div>
                <div >
                    <Button variant="light" onClick={(e) => setIndex(-1)}>다시하기</Button>
                </div>
            </>
        )
    }


    if (index < 0) {
        
        return (
           <Button variant="light" onClick={(e) => setIndex(0)}>시작하기</Button>
        )

    } else if (index < allList.length) {

        return (
            <CallAnswers />
        )

    } else if (index >= allList.length) {
        
        return (
            <Callresult />
        )
    }

}

export default DeathEatersTest;