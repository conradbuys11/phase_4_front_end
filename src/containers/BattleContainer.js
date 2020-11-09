import React, {useState, useEffect} from 'react'
import MoveButton from '../components/MoveButton'
import PokemonText from '../components/PokemonText'

import { Divider } from 'semantic-ui-react'

import pokeballIcon from "../assets/pokeball.png"

function BattleContainer(props){
    const [player, setPlayer] = useState(undefined)
    const [opponent, setOpponent] = useState(undefined)
    const [playerPokemon, setPlayerPokemon] = useState(undefined)
    const [opponentPokemon, setOpponentPokemon] = useState(undefined)
    const [battleState, setBattleState] = useState('')

    const battleStates = ['chooseMove', 'moveBeingUsed', 'choosePokemon', 'victory']



    //this is componentDidMount
    useEffect(() => {
        
        fetch('http://localhost:3000/trainers/')
        .then(rsp => rsp.json())
        .then(trainers => {
            setPlayer(trainers[0])
            setOpponent(trainers[1])
        })
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
        //setBattleState(battleStates[0]) //chooseMove state
    }, [])
    //the empty array thing here basically tells this to only run once
    //otherwise it'd also run useEffect on componentDidUpdate

    const battleLogicHolder = (playerPokemon, opponentPokemon, playerMove) => {
        let firstMon;
        let secondMon;                       //JS doesn't have array sample, so instead we have to write out this garbage
        let opponentMove = opponentPokemon.moves[Math.floor(Math.random() * opponentPokemon.moves.length)]
        let firstMove;
        let secondMove;
        // console.log(`Player mon speed: ${playerPokemon.species.spe_base}`)
        // console.log(`Opponent mon speed: ${opponentPokemon.species.spe_base}`)

        if(playerPokemon.species.spe_base > opponentPokemon.species.spe_base){
            firstMon = playerPokemon
            secondMon = opponentPokemon
            firstMove = playerMove
            secondMove = opponentMove
        }
        else if(playerPokemon.species.spe_base < opponentPokemon.species.spe_base){
            firstMon = opponentPokemon
            secondMon = playerPokemon
            firstMove = opponentMove
            secondMove = playerMove
        }
        else if(playerPokemon.species.spe_base === opponentPokemon.species.spe_base){
            if(Math.random() <= 0.49){
                firstMon = playerPokemon
                secondMon = opponentPokemon
                firstMove = playerMove
                secondMove = opponentMove
            }
            else{
                firstMon = opponentPokemon
                secondMon = playerPokemon
                firstMove = opponentMove
                secondMove = playerMove
            }
        }
        else{
            console.log('There was an error in comparing pokemon speed.')
            setBattleState(battleStates[0])
            return
        }
        //debugger
        checkBeforeDamage(firstMon, secondMon, firstMove)
        if(secondMon.current_hp > 0){
            checkBeforeDamage(secondMon, firstMon, secondMove)
        }
        setPlayerPokemon(playerPokemon)
        setOpponentPokemon(opponentPokemon)
        setBattleState(battleStates[0])
    }

    const checkBeforeDamage = (attackingMon, defendingMon, move) => {
         //don't run the function if we don't have
         if(!attackingMon || !defendingMon || !move) return 


         //confusion, paralysis, and sleep check (and freeze later)
         if(attackingMon.status_effect.name === 'confusion' || attackingMon.status_effect.name === 'sleep' || attackingMon.status_effect.name === 'paralysis'){
             if(attackingMon.status_effect.name === 'confusion'){
                 console.log(`${attackingMon.species.name} is confused!`)
                 if(Math.random() * 100 < attackingMon.status_effect.accuracy){
                     console.log(`It hurt itself in its confusion!`)
                     if(attackingMon.current_hp - attackingMon.current_hp * (1 / attackingMon.status_effect.power) > 0){
                         attackingMon.current_hp -= attackingMon.current_hp * (1 / attackingMon.status_effect.power)
                     }
                     else{
                         attackingMon.current_hp = 0
                     }
                 }
                 else{
                    calculateDamage(attackingMon, defendingMon, move)
                 }
             }
             else if(attackingMon.status_effect.name === 'paralysis'){
                 if(Math.random() * 100 < attackingMon.status_effect.accuracy){
                     console.log(`${attackingMon.species.name} is fully paralyzed! It can't move!`)
                 }
                 else{
                    calculateDamage(attackingMon, defendingMon, move)
                 }
             }
             else{
                 //implement sleep logic here
                 //consider switching to an accuracy system for waking up
             }
         }
         else{
             calculateDamage(attackingMon, defendingMon, move)
         }
    }

    const calculateDamage = (attackingMon, defendingMon, move) => {
       
        console.log(`${attackingMon.species.name} used ${move.name}!`)
        //check to see if move hits first. 101 accuracy is our way of programming a move w 100% chance to hit
        //Math.random is from 0.00 to 0.99 & our move accuracy is currently an int from 0 to 100
        if(move.accuracy === 101 || Math.random() * 100 < move.accuracy){
            //now check to see if we're using a damaging move
            if(move.category === 'physical' || move.category === 'special'){
                let damage;
                if(move.category === 'physical'){
                    //source on this calculation: https://bulbapedia.bulbagarden.net/wiki/Damage
                    //usually the first 22 would be (2 * level / 5) + 2, but since we're assuming level 50 rn, the math is already done for us.
                    //***TODO:*** figure out when we have to floor/round the decimals 
                    //AFTER EVERY MULTIPLICATION -- TODO, PUT THE FLOORS IN
                    damage = Math.floor(((22) * move.power *  attackingMon.species.atk_base / defendingMon.species.def_base / 50) + 2)
                }
                else{
                    damage = Math.floor(((22) * move.power *  attackingMon.species.spa_base / defendingMon.species.spd_base / 50) + 2)
                }

                let modifier = 1
                //debugger

                //bitwise operations on type advantage
                if((move.type.double_against & defendingMon.species.types[0].value) > 0){
                    modifier *= 2
                }
                else if((move.type.half_against & defendingMon.species.types[0].value) > 0){
                    modifier *= 0.5
                }
                else if((move.type.immune_against & defendingMon.species.types[0].value) > 0){
                    modifier *= 0
                }

                if(defendingMon.species.types.length > 1){
                    if((move.type.double_against & defendingMon.species.types[1].value) > 0){
                        modifier *= 2
                    }
                    else if((move.type.half_against & defendingMon.species.types[1].value) > 0){
                        modifier *= 0.5
                    }
                    else if((move.type.immune_against & defendingMon.species.types[1].value) > 0){
                        modifier *= 0
                    }
                }

                if(modifier >= 2){
                    console.log("It's super effective!")
                }
                else if(modifier <= 0.5){
                    console.log("It's not very effective...")
                }

                //STAB
                if(move.type.id === attackingMon.species.types[0].id){
                    modifier *= 1.5
                }
                else if(attackingMon.species.types.length > 1 && move.type.id === attackingMon.species.types[1].id){
                    modifier *= 1.5
                }

                //burn on physical attack
                if(move.category === 'physical' && attackingMon.status_effect.name === 'burn'){
                    modifier *= 0.5
                }

                damage = Math.floor(damage * modifier)
                console.log(`${attackingMon.species.name} did ${damage} damage to ${defendingMon.species.name}`)

                //if this attack doesn't kill
                if(defendingMon.current_hp - damage > 0){
                    defendingMon.current_hp -= damage
                }
                //0 is the lowest we want hp to go, no negatives
                else{
                    defendingMon.current_hp = 0
                    console.log(`${defendingMon.species.name} fainted!`)
                }
            }
            //after we've done damage, we check to see if defender is still alive, & doesn't have a status condition.
            //if they are, we can apply any potential effects (status conditions)
            //obv if they're dead, they don't need a status condition
            if(defendingMon.current_hp > 0 && defendingMon.status_effect.name === 'none' && move.move_status_effects.length > 0){
                move.move_status_effects.forEach(mse => {
                    if(defendingMon.status_effect.name === 'none' && Math.random() * 100 < mse.accuracy){
                        console.log(`${defendingMon.species.name} got ${mse.status_effect.name}`)
                        defendingMon.status_effect = mse.status_effect
                    }
                })
            }
            console.log(``)
            if(defendingMon.id === playerPokemon.id){
                setPlayerPokemon(defendingMon)
            }
            else if(defendingMon.id === opponentPokemon.id){
                setOpponentPokemon(defendingMon)
            }
            //***TODO:*** LOGIC ON NEXT POKEMON OUT
        }
        else{
            console.log(`${attackingMon.species.name} missed with ${move.name}!`)
        }
    }

    const useMove = move => {
        setBattleState(battleStates[1]) //moveBeingUsed state
        battleLogicHolder(playerPokemon, opponentPokemon, move) //go to damage calculation
    }

    const sendOutNextMon = opponent => {
        opponent.pokemons.forEach(pokemon => {
            if(pokemon.current_hp > 0){
                setOpponentPokemon(pokemon)
                console.log(`${opponent.name} sent out ${pokemon.species.name}!`)
                setBattleState(battleStates[1])
                return
            }
        }
        )
        //if we run through this whole loop & get nothing, that means all pokemon fainted
        //set state to defeat!
        setBattleState(battleStates[2])
    }

    const endOfBattleCleanup = () => {
        
    }

    const renderController = () => {
        if(battleState === ''){
            if(playerPokemon !== undefined && opponentPokemon !== undefined){
                setBattleState(battleStates[0])
            }
            else if(player !== undefined && opponent !== undefined){
                setPlayerPokemon(player.pokemons[0])
                setOpponentPokemon(opponent.pokemons[2])
            }
            return <div>loLOADING...ading...</div>
        }
        else if(battleState === battleStates[0]){
            if(opponentPokemon.current_hp <= 0){
                sendOutNextMon(opponent)
            }
            return(
                <div id="battle-screen">
                    <div id="battle-contents">
                        <div id="battle-area">
                            <div className={'player-pokemon-text'}>
                                <PokemonText
                                    pokemon={playerPokemon} 
                                    sprite={playerPokemon.species.sprite_back}
                                    imgHeight="400px"
                                />
                            </div>
                            <div className={'opponent-pokemon-text'}>
                                <PokemonText 
                                    pokemon={opponentPokemon} 
                                    sprite={opponentPokemon.species.sprite_front}
                                    imgHeight="250px"
                                />
                            </div>
                        </div>
                        <Divider horizontal>
                            <img
                                src={pokeballIcon}
                                height="15px" 
                                width="15px"
                                style={{
                                    marginBottom: "-3px"
                                }}
                            />
                        </Divider>
                        <div id="ui-area">
                            <div className={'move-buttons'}>
                                <MoveButton move={playerPokemon.moves[0]} useMove={useMove}/>
                                <MoveButton move={playerPokemon.moves[1]} useMove={useMove}/>
                                <MoveButton move={playerPokemon.moves[2]} useMove={useMove}/>
                                <MoveButton move={playerPokemon.moves[3]} useMove={useMove}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else if(battleState === battleStates[1]){
            return <div>damage in progress! stand by!</div>
        }
        else if(battleState === battleStates[2]){
            return <div>you beat the guy! well done!</div>
        }
        else{
            return <div>oop</div>
        }
    }

    return(  
        renderController()
    )
}

export default BattleContainer