import React, {useEffect, useState} from 'react'
import BattleContainer from '../containers/BattleContainer'

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

    const handleClick = () => {
        console.log('click')
        // console.log(currentText)
        // console.log(props.text)
        // console.log(currentText === props.text)
        console.log(props)
        if(props.text === currentText){
            props.callbackFunction(props.params)
        }
    }

    useEffect(() => {
        setIndication('')
        addNextLetter(props.text)
    },[props.text])

    return(
    <div onClick={handleClick}>{currentText}           {indication}</div>
    )
}

export default BattleTextBox