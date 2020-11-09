import React from 'react'
import { Button } from 'semantic-ui-react'

const MoveButton = props => {

    //TODO: write some logic about being able to use based on PP
    //oh sike we don't have pp
    //i would say write logic about only being able to be used on certain phase
    //but battlecontainer will handle that

    const normal = ""
    const fire = "red"
    const water = "blue"
    const electric = "yellow"
    const grass = "green"
    const ice = "teal"
    const fighting = "orange"
    const poison = "purple"
    const ground = "lightbrown"
    const flying = "deepblue"
    const psychic = "salmon"
    const bug = "olive"
    const rock = "brown"
    const ghost = "lavender"
    const dragon = "violet"
    const dark = "black"
    const steel = "grey"
    const fairy = "pink"

    const colors = {
        normal,
        fire,
        water,
        electric,
        grass,
        ice,
        fighting,
        poison,
        ground,
        flying,
        psychic,
        bug,
        rock,
        ghost,
        dragon,
        dark,
        steel,
        fairy
    }

    // props.move.type.name

    return(
        <Button 
            move={props.move}
            onClick={() => props.useMove(props.move)}
            key={props.move.id}
            basic
            color={colors[props.move.type.name.toLowerCase()]}
            size="huge"
        >
            {props.move.name}
        </Button>
    )
}

export default MoveButton