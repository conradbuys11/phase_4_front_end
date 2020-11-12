import React, {useEffect, useState} from 'react'
import BattleContainer from '../containers/BattleContainer'

import pokeballIcon from "../assets/pokeball.png"

const BattleTextBox = props => {
    const [currentText, setCurrentText] = useState('')
    const [indication, setIndication] = useState('')
    let displayText = ''

    const addNextLetter = text => {
        if(props.text !== displayText){
            //this will get the first letter we have not displayed yet
            //aka, every however many seconds we display one more letter
            //console.log(props.text.replace(currentText,'')[0])
            let letterToAdd = text.slice(0, 1)
            displayText += letterToAdd
            setCurrentText(displayText)
            setTimeout(() => addNextLetter(text.substring(1)), 25)
        }
        else{
            setIndication('CLICK')
        }
    }

    const handleClick = e => {
        // console.log(currentText)
        // console.log(props.text)
        // console.log(currentText === props.text)
        if( e === 'nice' || e.code == 'Space'){
            // console.log(`${typeof(props.text)}`)
            // console.log(`${typeof(currentText)}`)
            // console.log(`${props.text.length}`)
            // console.log(`${typeof(currentText) + " " + currentText.length}`)
            // if(props.text === currentText){
                console.log("we need to go deeper")
                props.callbackFunction(props.params)
            // }
        }
    }

    // this almost works
    useEffect(() => {
        setIndication('')
        addNextLetter(props.text)
        document.body.addEventListener('keydown', handleClick)
        return () => document.body.removeEventListener('keydown', handleClick)
    },[props.text])

    return(
        <div 
            // className={"ui grid animated list battle-text-box " + props.msgType + "-text-box"}
            // id="battle-text-box"
            className={"battle-text-box " + props.msgType + "-text-box"}
            onClick={() => handleClick('nice')}
        >
            {currentText}
            {/* <div className="item click-text"> */}
                <img
                    src={pokeballIcon}
                    className="click-img"
                />
            {/* </div> */}
        </div>
    )
}

export default BattleTextBox