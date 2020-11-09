import React from 'react'

const MoveButton = props => {

    //TODO: write some logic about being able to use based on PP
    //oh sike we don't have pp
    //i would say write logic about only being able to be used on certain phase
    //but battlecontainer will handle that

    return(
        <button move={props.move} onClick={() => props.useMove(props.move)} key={props.move.id}>{props.move.name}</button>
    )
}

export default MoveButton