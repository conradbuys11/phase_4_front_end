import React from 'react'

const PokemonText = props => {
    return(
        <div className={'pokemon-text'}>
            <div className="pokemon-name-text">{props.pokemon.species.name.toUpperCase()}</div>
            <div 
                className="max-hp-bar"
            >
                <div 
                    className="current-hp-bar" 
                    style={{
                        // width: props.pokemon.current_hp / props.pokemon.hp_base * 100 + "px"
                        width: 200 * (props.pokemon.current_hp / props.pokemon.species.hp_base) + "px"
                    }}
                >
                </div>
            </div>
            <p className={'hp'}>
                {props.pokemon.current_hp} / {props.pokemon.species.hp_base} HP
            </p>
            <img src={props.sprite} alt={'oops'} height={props.imgHeight}></img>
        </div>
    )
}

export default PokemonText