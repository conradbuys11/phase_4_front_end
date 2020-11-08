import React, {useState, useEffect} from 'react'
import MoveButton from '../components/MoveButton'

function BattleContainer(props){
    const [player, setPlayer] = useState(undefined)
    const [opponent, setOpponent] = useState(undefined)
    const [playerPokemon, setPlayerPokemon] = useState(undefined)
    const [opponentPokemon, setOpponentPokemon] = useState(undefined)
    const [battleState, setBattleState] = useState('')

    const battleStates = ['chooseMove', 'moveBeingUsed', 'choosePokemon']

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
        setBattleState[battleStates[0]] //chooseMove state
    }, [])
    //the empty array thing here basically tells this to only run once
    //otherwise it'd also run useEffect on componentDidUpdate


    const calculateDamage = (attackingMon, defendingMon, move) => {
        //don't run the function if we don't have
        if(!attackingMon || !defendingMon || !move) return 

        //TODO: check who has faster speed

        //check to see if move hits first. 101 accuracy is our way of programming a move w 100% chance to hit
        //Math.random is from 0.00 to 0.99 & our move accuracy is currently an int from 0 to 100
        if(move.accuracy == 101 || Math.random() * 100 < move.accuracy){
            //now check to see if we're using a damaging move
            if(move.category == 'physical' || move.category == 'special'){
                let damage;
                if(move.category == 'physical'){
                    //source on this calculation: https://bulbapedia.bulbagarden.net/wiki/Damage
                    //usually the first 22 would be (2 * level / 5) + 2, but since we're assuming level 50 rn, the math is already done for us.
                    //***TODO:*** figure out when we have to floor/round the decimals 
                    damage = ((22) * move.power *  attackingMon.species.base_atk / defendingMon.species.base_def / 50) + 2
                }
                else{
                    damage = ((22) * move.power *  attackingMon.species.base_spa / defendingMon.species.base_spd / 50) + 2
                }

                let modifier = 1
                //***TODO:*** MODIFIER CALCULATIONS. PRIORITY IS TYPE ADVANTAGE > STAB > EVERYTHING ELSE

                damage *= modifier

                //if this attack doesn't kill
                if(defendingMon.current_hp - damage > 0){
                    defendingMon.current_hp -= damage
                }
                //0 is the lowest we want hp to go, no negatives
                else{
                    defendingMon.current_hp = 0
                }
            }
            //after we've done damage, we check to see if defender is still alive, & doesn't have a status condition.
            //if they are, we can apply any potential effects (status conditions)
            //obv if they're dead, they don't need a status condition
            if(defendingMon.current_hp > 0 && defendingMon.status_effect.name == 'none' && move.move_status_effects.length > 0){
                move.move_status_effects.forEach(mse => {
                    if(defendingMon.status_effect.name == 'none' && Math.random() * 100 < mse.accuracy){
                        defendingMon.status_effect = mse.status_effect
                    }
                })
            }

            //***TODO:*** LOGIC ON NEXT POKEMON OUT
        }
    }

    const useMove = move => {
        setBattleState(battleStates[1]) //moveBeingUsed state
        calculateDamage(playerPokemon, opponentPokemon, move) //go to damage calculation
    }

    const useMoveRender = () => {    
        return (<div>
            <MoveButton move={playerPokemon.moves[0]} useMove={useMove}/>
            <MoveButton move={playerPokemon.moves[1]} useMove={useMove}/>
            <MoveButton move={playerPokemon.moves[2]} useMove={useMove}/>
            <MoveButton move={playerPokemon.moves[3]} useMove={useMove}/>
        </div>)
    }

    

    return(  
        useMoveRender()
    )
}

export default BattleContainer