import React from 'react'

const PokemonSprite = props => {
    //props: pokemon, switchPokemon(), canBeClicked
    const clickHandler = () => {
        props.switchPokemon(props.pokemon)
    }

    return(
        <img className={props.canBeClicked ? 'clickable-sprite' : 'unclickable-sprite'} src={props.pokemon.species.icon}  onClick={props.canBeClicked ? clickHandler : null}></img>
    )
}

export default PokemonSprite