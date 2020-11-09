import React, {useEffect, useState} from 'react'
import BattleContainer from '../containers/BattleContainer'

const BattleTextBox = props => {
    const [currentText, setCurrentText] = useState('')
    let displayText = ''

    const addNextLetter = text => {
        //debugger
        if(props.text !== displayText){
            //this will get the first letter we have not displayed yet
            //aka, every however many seconds we display one more letter
            //console.log(props.text.replace(currentText,'')[0])
            let letterToAdd = text.slice(0, 1)
            displayText += letterToAdd
            setCurrentText(displayText)
            setTimeout(() => addNextLetter(text.substring(1)), 50)
        }
    }

    useEffect(() => {
        addNextLetter(props.text)
    },[])

    return(
        <div>{currentText}</div>
    )
}

export default BattleTextBox