import React, {useState, useEffect} from 'react'

function BattleContainer(props){
    const [player, setPlayer] = useState(undefined)
    const [opponent, setOpponent] = useState(undefined)
    const [playerPokemon, setPlayerPokemon] = useState(undefined)
    const [opponentPokemon, setOpponentPokemon] = useState(undefined)
    const [battleState, setBattleState] = useState('')

    //this is componentDidMount
    useEffect(() => {
        if(props.player != null){
            //setPlayer(props.player)
            //for each pokemon the player has,
            //check if pokemon is fainted. if it is, keep going
            //else setPlayerPokemon(that pokemon)
        }
        if(props.opponent != null){
            //setOpponent(props.opponent)
            //setOpponentPokemon(props.opponent's first pokemon)
        }
    }, [])
    //the empty array thing here basically tells this to only run once
    //otherwise it'd also run useEffect on componentDidUpdate


    const calculateDamage = (attackingMon, defendingMon, move) => {
        //don't run the function if we don't have
        if(!attackingMon || !defendingMon || !move) return 

        //check to see if move hits first. 101 accuracy is our way of programming a move w 100% chance to hit
        //Math.random is from 0.00 to 0.99 & our move accuracy is currently an int from 0 to 100
        if(move.accuracy == 101 || Math.random() * 100 < move.accuracy){
            //now check to see if we're using a damaging move
            if(move.category == 'physical' || move.category == 'special'){
                if(move.category == 'physical'){
                    //source on this calculation: https://bulbapedia.bulbagarden.net/wiki/Damage
                    //usually the first 22 would be (2 * level / 5) + 2, but since we're assuming level 50 rn, the math is already done for us.
                    //***TODO:*** figure out when we have to floor/round the decimals 
                    let damage = ((22) * move.power *  attackingMon.species.base_atk / defendingMon.species.base_def / 50) + 2
                }
                else{
                    let damage = ((22) * move.power *  attackingMon.species.base_spa / defendingMon.species.base_spd / 50) + 2
                }

                let modifier = 1
                //***TODO:*** MODIFIER CALCULATIONS. PRIORITY IS TYPE ADVANTAGE > STAB > EVERYTHING ELSE

                damage *= modifier

                //if this attack doesn't
                if(defendingMon.current_hp - damage > 0)
            }
            //after we've done damage, we check to see if defender is still alive.
            //if they are, we can apply any potential effects (status conditions)
            //obv if they're dead, they don't need a status condition
            if()
        }
    }
}

export default BattleContainer