import React from 'react'

const MoveButton = props => {

    //TODO: write some logic about being able to use based on PP
    //oh sike we don't have pp
    //i would say write logic about only being able to be used on certain phase
    //but battlecontainer will handle that

    return(
    <button move={props.move} useMove={props.useMove}>{props.move.name} key={props.move.id}</button>
    )
}

export default MoveButton