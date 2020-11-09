import React from 'react'

const PokemonText = props => {
    return(
        <div className={'pokemon-text'}>
            <div className="pokemon-name-text">{props.pokemon.species.name}</div>
            <img src={props.sprite} alt={'oops'} height="250px"></img>
            <p className={'hp'}>
                {props.pokemon.current_hp} / {props.pokemon.species.hp_base} HP
            </p>
        </div>
    )
}

export default PokemonText