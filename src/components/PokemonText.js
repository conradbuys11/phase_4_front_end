import React from 'react'

const PokemonText = props => {
    return(
        <div className={'pokemon-text'}>
            <h3>{props.pokemon.species.name}</h3>
            <img src={props.sprite} alt={'oops'}></img>
            <p className={'hp'}>
                {props.pokemon.current_hp} / {props.pokemon.species.hp_base} HP
            </p>
        </div>
    )
}

export default PokemonText