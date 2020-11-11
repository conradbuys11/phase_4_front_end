import React, {useState, useEffect} from 'react'
import MoveButton from '../components/MoveButton'
import PokemonText from '../components/PokemonText'
import BattleTextBox from '../components/BattleTextBox'

import { Divider } from 'semantic-ui-react'

import pokeballIcon from "../assets/pokeball.png"

function BattleContainer(props){
    const [player, setPlayer] = useState(undefined)
    const [opponent, setOpponent] = useState(undefined)
    const [playerPokemon, setPlayerPokemon] = useState(undefined)
    const [opponentPokemon, setOpponentPokemon] = useState(undefined)
    const [battleState, setBattleState] = useState('')
    const [noStatusEffect, setNoStatusEffect] = useState(undefined)
    const [currentTextBox, setTextBox] = useState(<div>no text</div>)

    const battleStates = ['chooseMove', 'moveBeingUsed', 'choosePokemon', 'victory', 'failure']

    //this is componentDidMount
    useEffect(() => {
        fetch('http://localhost:3000/status_effects/1')
        .then(rsp => rsp.json())
        .then(se => setNoStatusEffect(se))
        
        fetch('http://localhost:3000/trainers/')
        .then(rsp => rsp.json())
        .then(trainers => {
            setPlayer(trainers[0])
            setOpponent(trainers[props.enemyTrainer])
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

    const battleLogicStart = (playerPokemon, opponentPokemon, playerMove) => {
        let firstMon;
        let secondMon;                       //JS doesn't have array sample, so instead we have to write out this garbage
        let opponentMove = opponentPokemon.moves[Math.floor(Math.random() * opponentPokemon.moves.length)]
        let firstMove;
        let secondMove;
        // console.log(`Player mon speed: ${playerPokemon.species.spe_base}`)
        // console.log(`Opponent mon speed: ${opponentPokemon.species.spe_base}`)
        //createTextBox('Let us test this shit the fuck out!')
        //stop until text box is over!
        let playerSpe = playerPokemon.status_effect.name === 'paralysis' ? Math.floor(playerPokemon.species.spe_base / 2) : playerPokemon.species.spe_base
        let opponentSpe = opponentPokemon.status_effect.name === 'paralysis' ? Math.floor(opponentPokemon.species.spe_base / 2) : opponentPokemon.species.spe_base

        if(playerSpe > opponentSpe){
            firstMon = playerPokemon
            secondMon = opponentPokemon
            firstMove = playerMove
            secondMove = opponentMove
        }
        else if(playerSpe < opponentSpe){
            firstMon = opponentPokemon
            secondMon = playerPokemon
            firstMove = opponentMove
            secondMove = playerMove
        }
        else if(playerSpe === opponentSpe){
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

        //DELETE BELOW, THIS IS JUST FOR DEBUG PURPOSES
        firstMon = playerPokemon
        secondMon = opponentPokemon
        firstMove = playerMove
        //DELETE ABOVE, THIS IS JUST FOR DEBUG PURPOSES

        checkStatus({attackingMon: firstMon, defendingMon: secondMon, move: firstMove, defendingMove: secondMove, isFirstAttacker: true})
    }

    const checkStatus = (params) => {
        //params: attackingMon, defendingMon, move, defendingMove, isFirstAttacker
        //don't run the function if we don't have
        if(!params.attackingMon || !params.defendingMon || !params.move) return
        switch(params.attackingMon.status_effect.name) {
            case "confusion":
                createTextBox(`${params.attackingMon.species.name} is confused!`, checkConfusion, params)
                return
            case "paralysis":
                // if(Math.random() * 100 < attackingMon.status_effect.accuracy){
                //     console.log(`${attackingMon.species.name} is fully paralyzed! It can't move!`)
                //     return [false, null]
                // }
                // else{
                //     return [true, null]
                // }
            case "sleep":
                //implement sleep logic here
                //consider switching to an accuracy system for waking up
                break;
            case "freeze":
                //implement freeze logic here
                //consider switching to an accuracy system for unfreezing
                break;
            default:
                usingAttack(params)
                break;
         } 
    }

    const usingAttack = params => {
        //params: attackingMon, defendingMon, move, defendingMove, isFirstAttacker
        createTextBox(`${params.attackingMon.species.name} used ${params.move.name}!`, calculateDamage, params)
    }

    const checkConfusion = params => {
        //params: attackingMon, defendingMon, move, defendingMove, isFirstAttacker
        if(Math.random() * 100 < 50){
            createTextBox(`It hurt itself in its confusion!`, calculateConfusionDamage, params)
        }
        else{
            usingAttack(params)
        }
    }

    const doNothing = (params) => {
        return
    }

    const calculateConfusionDamage = (params) => {
        //params: attackingMon, defendingMon, move, defendingMove, isFirstAttacker
        let returnHP
        if(params.attackingMon.current_hp - Math.floor(params.attackingMon.current_hp * (1 / params.attackingMon.status_effect.power)) > 0){
            params.attackingMon.current_hp -= Math.floor(params.attackingMon.current_hp * (1 / params.attackingMon.status_effect.power))
        }
        else{
            params.attackingMon.current_hp = 0
        }
        if(params.isFirstAttacker){
            //let second attacker go by reversing everything
            checkStatus({attackingMon: params.defendingMon, defendingMon: params.attackingMon, move: params.defendingMove, defendingMove: params.move, isFirstAttacker: false})
        }
        else{
            //go to cleanup
        }
    }


    
    const calculateDamage = params => {
        //params: attackingMon, defendingMon, move, defendingMove, isFirstAttacker
        let defendingMonCopy = copyOf(params.defendingMon)
        if(params.move.accuracy === null || Math.random() * 100 < params.move.accuracy){
            //now check to see if we're using a damaging move
            if(params.move.category === 'physical' || params.move.category === 'special'){
                let damage;
                if(params.move.category === 'physical'){
                    //source on this calculation: https://bulbapedia.bulbagarden.net/wiki/Damage
                    //usually the first 22 would be (2 * level / 5) + 2, but since we're assuming level 50 rn, the math is already done for us.
                    //***TODO:*** figure out when we have to floor/round the decimals 
                    //AFTER EVERY MULTIPLICATION -- TODO, PUT THE FLOORS IN
                    damage = Math.floor(((22) * params.move.power *  params.attackingMon.species.atk_base / params.defendingMon.species.def_base / 50) + 2)
                }
                else{
                    damage = Math.floor(((22) * params.move.power *  params.attackingMon.species.spa_base / params.defendingMon.species.spd_base / 50) + 2)
                }

                let modifier = 1
                //debugger

                //bitwise operations on type advantage
                if((params.move.type.double_against & params.defendingMon.species.types[0].value) > 0){
                    modifier *= 2
                }
                else if((params.move.type.half_against & params.defendingMon.species.types[0].value) > 0){
                    modifier *= 0.5
                }
                else if((params.move.type.immune_against & params.defendingMon.species.types[0].value) > 0){
                    modifier *= 0
                }

                if(params.defendingMon.species.types.length > 1){
                    if((params.move.type.double_against & params.defendingMon.species.types[1].value) > 0){
                        modifier *= 2
                    }
                    else if((params.move.type.half_against & params.defendingMon.species.types[1].value) > 0){
                        modifier *= 0.5
                    }
                    else if((params.move.type.immune_against & params.defendingMon.species.types[1].value) > 0){
                        modifier *= 0
                    }
                }

                //going to save this text box for later - but if the move has no effect, skip everything else
                let effectiveness = ''
                if(modifier >= 2){
                    effectiveness = "It's super effective!"
                }
                else if(modifier <= 0.5){
                    effectiveness = "It's not very effective..."
                }
                else if(modifier === 0){
                    if(params.isFirstAttacker){
                        //let second attacker go by reversing everything
                        createTextBox(`It doesn't effect ${params.defendingMon.species.name}...`, checkStatus, {attackingMon: params.defendingMon, defendingMon: params.attackingMon, move: params.defendingMove, defendingMove: params.move, isFirstAttacker: false})
                        return
                    }
                    else{
                        //go to cleanup
                        //createTextBox(`It doesn't effect ${params.defendingMon.species.name}...`, cleanupfunctionorwhatever)
                        return
                    }
                }

                //STAB
                if(params.move.type.id === params.attackingMon.species.types[0].id){
                    modifier *= 1.5
                }
                else if(params.attackingMon.species.types.length > 1 && params.move.type.id === params.attackingMon.species.types[1].id){
                    modifier *= 1.5
                }

                //burn on physical attack
                if(params.move.category === 'physical' && params.attackingMon.status_effect.name === 'burn'){
                    modifier *= 0.5
                }

                damage = Math.floor(damage * modifier)
                let newParams = {...params, damage, effectiveness}
                dealDamage(newParams)
                // createTextBox(effectiveness, calculateDamage, newParams)
                //console.log(`${attackingMon.species.name} did ${damage} damage to ${defendingMon.species.name}.`)
            }
            else{
                //we get here if this is a status move
                checkMoveStatusEffect(params)
            }
        }
        else{
            //attack missed. reverse roles
            if(params.isFirstAttacker){
                createTextBox(`${params.attackingMon.species.name}'s attack missed!`, checkStatus, {attackingMon: params.defendingMon, defendingMon: params.attackingMon, move: params.defendingMove, defendingMove: params.move, isFirstAttacker: false})
            }
            else{
                //createTextBox(`${params.attackingMon.species.name}'s attack missed!`, cleanup function)
            }
        }
    }

    const dealDamage = params => {
        //params: attackingMon, defendingMon, move, defendingMove, isFirstAttacker, damage, effectiveness
        let defendingMonCopy = copyOf(params.defendingMon)

        //if the attack doesn't kill
        if(defendingMonCopy.current_hp - params.damage > 0){
            defendingMonCopy.current_hp -= params.damage
        }
        //0 is the lowest we want hp to go, no negatives
        else{
            defendingMonCopy.current_hp = 0
            defendingMonCopy.status_effect = noStatusEffect
            //createTextBox(`${defendingMonCopy.species.name} fainted!`, cleanup function)
        }
        if(defendingMonCopy.id === playerPokemon.id){
            setPlayerPokemon(defendingMonCopy)
        }
        else if (defendingMonCopy.id === opponentPokemon.id){
            setOpponentPokemon(defendingMonCopy)
        }
        let newParams = {...params, defendingMon: defendingMonCopy}
        if(params.effectiveness != ''){
            createTextBox(params.effectiveness, checkMoveStatusEffect, newParams)
        }
        else{
            checkMoveStatusEffect(newParams)
        }
    }

    const checkMoveStatusEffect = params => {
        //params: attackingMon, defendingMon, move, defendingMove, isFirstAttacker, damage, effectiveness
        //after we've done damage, we check to see if defender is still alive, & doesn't have a status condition.
        //if they are, we can apply any potential effects (status conditions)
        //obv if they're dead, they don't need a status condition
        debugger
        let defendingMonCopy = copyOf(params.defendingMon)
        if(defendingMonCopy.current_hp > 0 && defendingMonCopy.status_effect.name === 'none' && params.move.move_status_effects.length > 0){
            params.move.move_status_effects.forEach(mse => {
                if(defendingMonCopy.status_effect.name === 'none' && Math.random() * 100 < mse.accuracy){
                    defendingMonCopy.status_effect = mse.status_effect
                    if(params.isFirstAttacker){
                        createTextBox(`${defendingMonCopy.species.name} got ${mse.status_effect.name}.`, checkStatus, {attackingMon: defendingMonCopy, defendingMon: params.attackingMon, move: params.defendingMove, defendingMove: params.move, isFirstAttacker: false})
                    }
                    else{
                        let newParams = defendingMonCopy.id === playerPokemon.id ? {playerMon: defendingMonCopy, opponentMon: params.attackingMon} : {playerMon: params.attackingMon, opponentMon: defendingMonCopy}
                        createTextBox(`${defendingMonCopy.species.name} got ${mse.status_effect.name}.`, endOfTurnCleanup, newParams)
                    }
                    return
                }
            })
        }
        else{
            if(params.isFirstAttacker){
                checkStatus({attackingMon: defendingMonCopy, defendingMon: params.attackingMon, move: params.defendingMove, defendingMove: params.move, isFirstAttacker: false})
            }
            else{
                let newParams = defendingMonCopy.id === playerPokemon.id ? {playerMon: defendingMonCopy, opponentMon: params.attackingMon, isFirst: true} : {playerMon: params.attackingMon, opponentMon: defendingMonCopy, isFirst: true}
                endOfTurnCleanup(newParams)
            }
        }
    }

    const endOfTurnCleanup = params => {
        //params: playerMon, opponentMon, isFirst
        //first, we do burn/poison damage
        console.log('we got here!')
        if(params.isFirst){
            if(params.playerMon.current_hp > 0 && (params.playerMon.status_effect.name == 'poison' || params.playerMon.status_effect.name == 'burn')){
                createTextBox(`${params.playerMon.species.name} is hurt by ${params.playerMon.status_effect.name}!`, dealBurnPoisonDmg, {firstMon: params.playerMon, secondMon: params.opponentMon, isFirst: params.isFirst})
            }
            else{
                endOfTurnCleanup({...params, isFirst: false})
            }
        }
        else{
            if(params.opponentMon.current_hp > 0 && (params.opponentMon.status_effect.name == 'poison' || params.opponentMon.status_effect.name == 'burn')){
                createTextBox(`${params.opponentMon.species.name} is hurt by ${params.opponentMon.status_effect.name}!`, dealBurnPoisonDmg, {firstMon: params.opponentMon, secondMon: params.playerMon, isFirst: params.isFirst})
            }
            else{
                //next step
            }
        }
    }

    const dealBurnPoisonDmg = params => {
        //params: firstMon, secondMon, isFirst
        let firstMonCopy = copyOf(params.firstMon)
        if(firstMonCopy.current_hp - Math.floor((firstMonCopy.status_effect.power * firstMonCopy.species.hp_base / 100)) > 0){
            firstMonCopy.current_hp -= Math.floor((firstMonCopy.status_effect.power * firstMonCopy.species.hp_base / 100))
            if(params.isFirst){
                let newPlayerPokemons = player.pokemons.map(pokemon => pokemon.id === firstMonCopy.id ? firstMonCopy : pokemon)
                setPlayer({...player, pokemons: newPlayerPokemons})
                setPlayerPokemon(firstMonCopy)
                endOfTurnCleanup({playerMon: firstMonCopy, opponentMon: params.secondMon, isFirst: false})
            }
            else{
                let newOpponentPokemons = opponent.pokemons.map(pokemon => pokemon.id === firstMonCopy.id ? firstMonCopy : pokemon)
                setOpponent({...opponent, pokemons: newOpponentPokemons})
                setOpponentPokemon(firstMonCopy)
                checkIfFainted({firstMon: params.secondMon, secondMon: firstMonCopy, isFirst: true})
            }
        }
        else{
            firstMonCopy.current_hp = 0
            firstMonCopy.status_effect = noStatusEffect

            if(params.isFirst){
                let newPlayerPokemons = player.pokemons.map(pokemon => pokemon.id === firstMonCopy.id ? firstMonCopy : pokemon)
                setPlayer({...player, pokemons: newPlayerPokemons})
                setPlayerPokemon(firstMonCopy)
                createTextBox(`${firstMonCopy.species.name} fainted!`, endOfTurnCleanup, {playerMon: firstMonCopy, opponentMon: params.secondMon, isFirst: false})
            }
            else{
                let newOpponentPokemons = opponent.pokemons.map(pokemon => pokemon.id === firstMonCopy.id ? firstMonCopy : pokemon)
                setOpponent({...opponent, pokemons: newOpponentPokemons})
                setOpponentPokemon(firstMonCopy)
                createTextBox(`${firstMonCopy.species.name} fainted!`, checkIfFainted, {firstMon: params.secondMon, secondMon: firstMonCopy, isFirst: true})
            }
        }
    }
    
    const checkIfFainted = params => {
        //params: firstMon, secondMon, isFirst
        if(params.isFirst){
            if(params.firstMon.current_hp <= 0){
                createTextBox(`${params.firstMon.species.name} fainted!`, checkNextMon, params)
            }
            else{
                checkIfFainted({...params, isFirst: false})
            }
        }
        else{
            if(params.firstMon.current_hp <= 0){
                createTextBox(`${params.secondMon.species.name} fainted!`, checkNextMon, params)
            }
            else{
                setBattleState(battleStates[0])
            }
        }
    }

    const checkNextMon = params => {
        //params: firstMon, secondMon, isFirst
        //isFirst = player pokemon fainted, otherwise opponent pokemon fainted
        if(params.isFirst){
            let nextMon = player.pokemons.find(pokemon => pokemon.id !== params.firstMon.id && pokemon.current_hp > 0)
            if(nextMon){
                setPlayerPokemon(nextMon)
                createTextBox(`${player.trainer_category.name} ${player.name} sent out ${nextMon.species.name}!`, checkIfFainted, {...params, firstMon: nextMon, isFirst: false})
            }
            else{
                //this means all pokemon fainted
                //set state to defeat!
                createTextBox(`${player.trainer_category} ${player.name} whited out!`, doNothing, null)
            }
        }
        else{
            let nextMon = opponent.pokemons.find(pokemon => pokemon.id !== params.secondMon.id && pokemon.current_hp > 0)
            if(nextMon){
                setOpponentPokemon(nextMon)
                createTextBox(`${opponent.trainer_category.name} ${opponent.name} sent out ${nextMon.species.name}!`, setBattleState, battleStates[0])
            }
            else{
                //this means all pokemon fainted
                //set state to defeat!
                createTextBox(`You beat ${opponent.trainer_category.name} ${opponent.name}!`, props.exitBattle, null)
            }
        }
    }

    const copyOf = pokemon => {
        return JSON.parse(JSON.stringify(pokemon))
    }

    // const calculateDamage = (attackingMon, defendingMon, move) => {
    //     //let attackingMonCopy = copyOf(attackingMon)
    //     let defendingMonCopy = copyOf(defendingMon)
    //     console.log(attackingMon.species.name + " used " + move.name + "!")

    //     //check to see if move hits first. 101 accuracy is our way of programming a move w 100% chance to hit
    //     //Math.random is from 0.00 to 0.99 & our move accuracy is currently an int from 0 to 100
    //     if(move.accuracy === null || Math.random() * 100 < move.accuracy){
    //         //now check to see if we're using a damaging move
    //         if(move.category === 'physical' || move.category === 'special'){
    //             let damage;
    //             if(move.category === 'physical'){
    //                 //source on this calculation: https://bulbapedia.bulbagarden.net/wiki/Damage
    //                 //usually the first 22 would be (2 * level / 5) + 2, but since we're assuming level 50 rn, the math is already done for us.
    //                 //***TODO:*** figure out when we have to floor/round the decimals 
    //                 //AFTER EVERY MULTIPLICATION -- TODO, PUT THE FLOORS IN
    //                 damage = Math.floor(((22) * move.power *  attackingMon.species.atk_base / defendingMon.species.def_base / 50) + 2)
    //             }
    //             else{
    //                 damage = Math.floor(((22) * move.power *  attackingMon.species.spa_base / defendingMon.species.spd_base / 50) + 2)
    //             }

    //             let modifier = 1
    //             //debugger

    //             //bitwise operations on type advantage
    //             if((move.type.double_against & defendingMon.species.types[0].value) > 0){
    //                 modifier *= 2
    //             }
    //             else if((move.type.half_against & defendingMon.species.types[0].value) > 0){
    //                 modifier *= 0.5
    //             }
    //             else if((move.type.immune_against & defendingMon.species.types[0].value) > 0){
    //                 modifier *= 0
    //             }

    //             if(defendingMon.species.types.length > 1){
    //                 if((move.type.double_against & defendingMon.species.types[1].value) > 0){
    //                     modifier *= 2
    //                 }
    //                 else if((move.type.half_against & defendingMon.species.types[1].value) > 0){
    //                     modifier *= 0.5
    //                 }
    //                 else if((move.type.immune_against & defendingMon.species.types[1].value) > 0){
    //                     modifier *= 0
    //                 }
    //             }

    //             let effectiveness = ''
    //             if(modifier >= 2){
    //                 effectiveness = "It's super effective!"
    //             }
    //             else if(modifier <= 0.5){
    //                 effectiveness = "It's not very effective..."
    //             }
    //             else if(modifier === 0){
    //                 createTextBox('It had no effect...', checkStatus, )
    //                 return
    //             }

    //             //STAB
    //             if(move.type.id === attackingMon.species.types[0].id){
    //                 modifier *= 1.5
    //             }
    //             else if(attackingMon.species.types.length > 1 && move.type.id === attackingMon.species.types[1].id){
    //                 modifier *= 1.5
    //             }

    //             //burn on physical attack
    //             if(move.category === 'physical' && attackingMon.status_effect.name === 'burn'){
    //                 modifier *= 0.5
    //             }

    //             damage = Math.floor(damage * modifier)
    //             console.log(`${attackingMon.species.name} did ${damage} damage to ${defendingMon.species.name}.`)

    //             //if this attack doesn't kill
    //             if(defendingMonCopy.current_hp - damage > 0){
    //                 defendingMonCopy.current_hp -= damage
    //             }
    //             //0 is the lowest we want hp to go, no negatives
    //             else{
    //                 defendingMonCopy.current_hp = 0
    //                 defendingMonCopy.status_effect = noStatusEffect
    //                 console.log(`${defendingMonCopy.species.name} fainted!`)
    //             }
    //         }
    //         //after we've done damage, we check to see if defender is still alive, & doesn't have a status condition.
    //         //if they are, we can apply any potential effects (status conditions)
    //         //obv if they're dead, they don't need a status condition
    //         if(defendingMonCopy.current_hp > 0 && defendingMonCopy.status_effect.name === 'none' && move.move_status_effects.length > 0){
    //             move.move_status_effects.forEach(mse => {
    //                 if(defendingMonCopy.status_effect.name === 'none' && Math.random() * 100 < mse.accuracy){
    //                     console.log(`${defendingMonCopy.species.name} got ${mse.status_effect.name}.`)
    //                     defendingMonCopy.status_effect = mse.status_effect
    //                 }
    //             })
    //         }
    //     }
    //     else{
    //         console.log(`${attackingMon.species.name}'s attack missed!`)
    //     }
    //     // if(defendingMonCopy.id === playerPokemon.id){
    //     //     setPlayerPokemon(defendingMonCopy)
    //     // }
    //     // else if(defendingMonCopy.id === opponentPokemon.id){
    //     //     setOpponentPokemon(defendingMonCopy)
    //     // }
    //     return defendingMonCopy
    // }

    const useMove = move => {
        setBattleState(battleStates[1]) //moveBeingUsed state
        battleLogicStart(playerPokemon, opponentPokemon, move) //go to damage calculation
    }

    // const sendOutNextMon = faintedPokemon => {
    //     let nextMon = opponent.pokemons.find(pokemon => pokemon.id !== faintedPokemon.id && pokemon.current_hp > 0)
    //     if(nextMon){
    //         setOpponentPokemon(nextMon)
    //         console.log(`${opponent.name} sent out ${nextMon.species.name}!`)
    //         return true
    //     }
    //     else{
    //         //this means all pokemon fainted
    //         //set state to defeat!
    //         return false
    //     }
    // }

    // const playerNextMonTemp = faintedPokemon => {
    //     let nextMon = player.pokemons.find(pokemon => pokemon.id !== faintedPokemon.id && pokemon.current_hp > 0)
    //     if(nextMon){
    //         setPlayerPokemon(nextMon)
    //         console.log(`${player.name} sent out ${nextMon.species.name}!`)
    //         return true

    //     }
    //     else{
    //         //this means all pokemon fainted
    //         //set state to defeat!
    //         return false
    //     }
    // }

    // const endOfTurnCleanup = (playerCopy, opponentCopy) => {
    //     //first, we do burn/poison dmg
    //     //console.log(playerPokemon.current_hp)
    //     let playerPokemonCopy = playerCopy
    //     let opponentPokemonCopy = opponentCopy
    //     if(playerPokemonCopy.current_hp > 0 && (playerPokemonCopy.status_effect.name == 'poison' || playerPokemonCopy.status_effect.name == 'burn')){
    //         console.log(`${playerPokemonCopy.species.name} is hurt by ${playerPokemonCopy.status_effect.name}!`)
    //         if(playerPokemonCopy.current_hp - Math.floor((playerPokemonCopy.status_effect.power * playerPokemonCopy.species.hp_base / 100)) > 0){
    //             playerPokemonCopy.current_hp -= Math.floor((playerPokemonCopy.status_effect.power * playerPokemonCopy.species.hp_base / 100))
    //         }
    //         else{
    //             playerPokemonCopy.current_hp = 0
    //             playerPokemonCopy.status_effect = noStatusEffect
    //             console.log(`${playerPokemonCopy.species.name} fainted!`)
    //         }
    //     }
    //     let newPlayerPokemons = player.pokemons.map(pokemon => pokemon.id === playerPokemonCopy.id ? playerPokemonCopy : pokemon)
    //     setPlayer({...player, pokemons: newPlayerPokemons})
    //     setPlayerPokemon(playerPokemonCopy)
    //     //debugger
    //     if(opponentPokemonCopy.current_hp > 0 && (opponentPokemonCopy.status_effect.name == 'poison' || opponentPokemonCopy.status_effect.name == 'burn')){
    //         console.log(`${opponentPokemonCopy.species.name} is hurt by ${opponentPokemonCopy.status_effect.name}!`)
    //         if(opponentPokemonCopy.current_hp - Math.floor((opponentPokemonCopy.status_effect.power * opponentPokemonCopy.species.hp_base / 100)) > 0){
    //             opponentPokemonCopy.current_hp -= Math.floor((opponentPokemonCopy.status_effect.power * opponentPokemonCopy.species.hp_base / 100))
    //         }
    //         else{
    //             opponentPokemonCopy.current_hp = 0
    //             opponentPokemonCopy.status_effect = noStatusEffect
    //             console.log(`${opponentPokemonCopy.species.name} fainted!`)
    //         }
    //     }
    //     let newOpponentPokemons = opponent.pokemons.map(pokemon => pokemon.id === opponentPokemonCopy.id ? opponentPokemonCopy : pokemon)
    //     setOpponent({...opponent, pokemons: newOpponentPokemons})
    //     setOpponentPokemon(opponentPokemonCopy)

    //     if(playerPokemonCopy.current_hp <= 0){
    //         if(playerNextMonTemp(playerPokemonCopy)){
    //             setBattleState(battleStates[0])
    //         }
    //         else{
    //             setBattleState(battleStates[4])
    //             return
    //         }
    //     }
    //     if(opponentPokemonCopy.current_hp <= 0){
    //         if(sendOutNextMon(opponentPokemonCopy)){
    //             setBattleState(battleStates[0])
    //         }
    //         else{
    //             props.exitBattle()
    //             // setBattleState(battleStates[3])
    //             return
    //         }
    //     }
        
    //     setBattleState(battleStates[0])
    // }

    const createTextBox = (text, callbackFunction, params) => {
        //something like <BattleTextBox text={text}/>
        //while that text box's currentText != text, do nothing
        //basically, we want to stop JS from doing anything else for the time being
        //then after, call the callbackFunction
        setTextBox(<BattleTextBox text={text} callbackFunction={() => callbackFunction(params)} params={params} />)
        return
    }

    const renderController = () => {
        if(battleState === ''){
            if(playerPokemon !== undefined && opponentPokemon !== undefined){
                setBattleState(battleStates[0])
            }
            else if(player !== undefined && opponent !== undefined){
                setPlayerPokemon(player.pokemons[0])
                setOpponentPokemon(opponent.pokemons[0])
            }
            return <div>loLOADING...ading...</div>
        }
        else if(battleState === battleStates[0]){
            // if(opponentPokemon.current_hp <= 0){
            //     sendOutNextMon(opponent)
            // }
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
                                {playerPokemon.moves[0] != null ? <MoveButton move={playerPokemon.moves[0]} useMove={useMove}/> : null}
                                {playerPokemon.moves[1] != null ? <MoveButton move={playerPokemon.moves[1]} useMove={useMove}/> : null}
                                {playerPokemon.moves[2] != null ? <MoveButton move={playerPokemon.moves[2]} useMove={useMove}/> : null}
                                {playerPokemon.moves[3] != null ? <MoveButton move={playerPokemon.moves[3]} useMove={useMove}/> : null}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else if(battleState === battleStates[1]){
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
                                {currentTextBox}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else if(battleState === battleStates[2]){
            return <div>****WIP: CHOOSE NEXT POKEMON****</div>
        }
        else if(battleState === battleStates[3]){
            // props.exitBattle()
            // return
            return <div>you beat the guy! well done!</div>
        }
        else if(battleState === battleStates[4]){
            return <div>YOU LOST, AMATEUR</div>
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