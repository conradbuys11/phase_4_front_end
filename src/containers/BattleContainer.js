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
            setOpponent(trainers[props.enemyTrainer])
        })
        if(props.player != null){
            setPlayer(copyOf(props.player))
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
        // firstMon = playerPokemon
        // secondMon = opponentPokemon
        // firstMove = playerMove
        // secondMove = opponentMove
        //DELETE ABOVE, THIS IS JUST FOR DEBUG PURPOSES

        checkStatus({attackingMon: firstMon, defendingMon: secondMon, move: firstMove, defendingMove: secondMove, isFirstAttacker: true})
    }

    const checkStatus = (params) => {
        //params: attackingMon, defendingMon, move, defendingMove, isFirstAttacker
        //don't run the function if we don't have
        if(!params.attackingMon || !params.defendingMon || !params.move) return
        let attackingMonCopy = copyOf(params.attackingMon)
        switch(params.attackingMon.status_effect.name) {
            case "confusion":
                if(attackingMonCopy.statusCounter === undefined || params.attackingMon.statusCounter - 1 <= 0){
                    attackingMonCopy.statusCounter = undefined
                    attackingMonCopy.status_effect = noStatusEffect
                    createTextBox(`${attackingMonCopy.species.name} snapped out of confusion!`, usingAttack, {...params, attackingMon: attackingMonCopy}, 'snapped-out')
                }
                else{
                    attackingMonCopy.statusCounter -= 1
                    createTextBox(`${attackingMonCopy.species.name} is confused!`, checkConfusion, {...params, attackingMon: attackingMonCopy}, "is-confused")
                }
                attackingMonCopy.id === playerPokemon.id ? setPlayerPokemon(attackingMonCopy) : setOpponentPokemon(attackingMonCopy)
                return
            case "paralysis":
                // if(Math.random() * 100 < attackingMon.status_effect.accuracy){
                //     console.log(`${attackingMon.species.name} is fully paralyzed! It can't move!`)
                //     return [false, null]
                // }
                // else{
                //     return [true, null]
                // }
                checkParalysis(params)
                return
            case "sleep":
                //implement sleep logic here
                //consider switching to an accuracy system for waking up
                if(attackingMonCopy.statusCounter === undefined || params.attackingMon.statusCounter - 1 <= 0){
                    attackingMonCopy.statusCounter = undefined
                    attackingMonCopy.status_effect = noStatusEffect
                    createTextBox(`${attackingMonCopy.species.name} woke up!`, usingAttack, {...params, attackingMon: attackingMonCopy}, 'woke-up')
                }
                else{
                    attackingMonCopy.statusCounter -= 1
                    createTextBox(`${attackingMonCopy.species.name} is fast asleep.`, napTime, {...params, attackingMon: attackingMonCopy}, "is-asleep")
                }
                attackingMonCopy.id === playerPokemon.id ? setPlayerPokemon(attackingMonCopy) : setOpponentPokemon(attackingMonCopy)
                return
            case "freeze":
                //implement freeze logic here
                //consider switching to an accuracy system for unfreezing
                break;
            default:
                usingAttack(params)
                break;
         } 
    }

    const napTime = params => {
        if(params.isFirstAttacker){
            //let second attacker go by reversing everything
            checkStatus({attackingMon: params.defendingMon, defendingMon: params.attackingMon, move: params.defendingMove, defendingMove: params.move, isFirstAttacker: false})
        }
        else{
            //go to cleanup
            let newParams = params.attackingMon.id === playerPokemon.id ? {playerMon: params.attackingMon, opponentMon: params.defendingMon, isFirst: true} : {playerMon: params.defendingMon, opponentMon: params.attackingMon, isFirst: true}
            endOfTurnCleanup(newParams)
        }
    }

    const usingAttack = params => {
        //params: attackingMon, defendingMon, move, defendingMove, isFirstAttacker
        createTextBox(`${params.attackingMon.species.name} used ${params.move.name}!`, calculateDamage, params, "using-move")
    }

    const checkConfusion = params => {
        //params: attackingMon, defendingMon, move, defendingMove, isFirstAttacker
        if(Math.random() * 100 < 33){
            createTextBox(`It hurt itself in its confusion!`, calculateConfusionDamage, params, "confusion-dmg")
        }
        else{
            usingAttack(params)
        }
    }

    const checkParalysis = params => {
        let isPlayer = (params.attackingMon.id === playerPokemon.id)
        if(Math.random() * 100 < 26){
            if(params.isFirstAttacker){
                createTextBox(`${params.attackingMon.species.name} is fully paralyzed! It can't move!`, checkStatus, {attackingMon: params.defendingMon, defendingMon: params.attackingMon, move: params.defendingMove, defendingMove: params.move, isFirstAttacker: false}, 'paralysis-freeze')
            }
            else{
                let newParams = isPlayer ? {playerMon: params.attackingMon, opponentMon: params.defendingMon, isFirst: true} : {playerMon: params.defendingMon, opponentMon: params.attackingMon, isFirst: true}
                createTextBox(`${params.attackingMon.species.name} is fully paralyzed! It can't move!`, endOfTurnCleanup, newParams, 'paralysis-freeze')
            }
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
        let attackingMonCopy = copyOf(params.attackingMon)
        let isPlayer = (attackingMonCopy.id === playerPokemon.id) //boolean
        if(params.attackingMon.current_hp - Math.floor(params.attackingMon.species.hp_base * (1 / params.attackingMon.status_effect.power)) > 0){
            attackingMonCopy.current_hp = params.attackingMon.species.hp_base - Math.floor(params.attackingMon.current_hp * (1 / params.attackingMon.status_effect.power))
        }
        else{
            attackingMonCopy.current_hp = 0
            isPlayer ? setPlayerPokemon(attackingMonCopy) : setOpponentPokemon(attackingMonCopy)
            let newParams = isPlayer ? {playerMon: attackingMonCopy, opponentMon: params.defendingMon, isFirst: true} : {playerMon: params.defendingMon, opponentMon: attackingMonCopy, isFirst: true}
            endOfTurnCleanup(newParams)
        }
        if(attackingMonCopy.current_hp <= 0) return
        isPlayer ? setPlayerPokemon(attackingMonCopy) : setOpponentPokemon(attackingMonCopy)
        if(params.isFirstAttacker){
            //let second attacker go by reversing everything
            checkStatus({attackingMon: params.defendingMon, defendingMon: attackingMonCopy, move: params.defendingMove, defendingMove: params.move, isFirstAttacker: false})
        }
        else{
            //go to cleanup
            let newParams = isPlayer ? {playerMon: attackingMonCopy, opponentMon: params.defendingMon, isFirst: true} : {playerMon: params.defendingMon, opponentMon: attackingMonCopy, isFirst: true}
            endOfTurnCleanup(newParams)
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
                    damage = Math.floor(Math.floor(22 * params.move.power *  params.attackingMon.species.atk_base / params.defendingMon.species.def_base) / 50) + 2
                }
                else{
                    damage = Math.floor(Math.floor(22 * params.move.power *  params.attackingMon.species.spa_base / params.defendingMon.species.spd_base) / 50) + 2
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
                else if(modifier <= 0.5 && modifier > 0){
                    effectiveness = "It's not very effective..."
                }
                else if(modifier === 0){
                    if(params.isFirstAttacker){
                        //let second attacker go by reversing everything
                        createTextBox(`It doesn't effect ${params.defendingMon.species.name}...`, checkStatus, {attackingMon: params.defendingMon, defendingMon: params.attackingMon, move: params.defendingMove, defendingMove: params.move, isFirstAttacker: false}, "immune")
                    }
                    else{
                        let newParams = params.attackingMon.id === playerPokemon.id ? {playerMon: params.attackingMon, opponentMon: params.defendingMon, isFirst: true} : {playerMon: params.defendingMon, opponentMon: params.defendingMon, isFirst: true}
                        createTextBox(`It doesn't effect ${params.defendingMon.species.name}...`, endOfTurnCleanup, newParams, 'immune')
                    }
                }
                if(modifier === 0) return
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

                modifier *= (Math.random() * (1 - 0.85) + 0.85)

                damage = Math.floor(damage * modifier)
                let newParams = {effectiveness, ...params, damage, effectiveness}
                dealDamage(newParams)
                // createTextBox(effectiveness, calculateDamage, newParams)
                //console.log(`${attackingMon.species.name} did ${damage} damage to ${defendingMon.species.name}.`)
            }
            else{
                //we get here if this is a status move

                //if they're immune
                if((params.move.type.immune_against & params.defendingMon.species.types[0].value) > 0){
                    if(params.isFirstAttacker){
                        //let second attacker go by reversing everything
                        createTextBox(`It doesn't effect ${params.defendingMon.species.name}...`, checkStatus, {attackingMon: params.defendingMon, defendingMon: params.attackingMon, move: params.defendingMove, defendingMove: params.move, isFirstAttacker: false}, "immune")
                    }
                    else{
                        let newParams = params.attackingMon.id === playerPokemon.id ? {playerMon: params.attackingMon, opponentMon: params.defendingMon, isFirst: true} : {playerMon: params.defendingMon, opponentMon: params.defendingMon, isFirst: true}
                        createTextBox(`It doesn't effect ${params.defendingMon.species.name}...`, endOfTurnCleanup, newParams, 'immune')
                    }
                }
                else{
                    checkMoveStatusEffect(params)
                }
            }
        }
        else{
            //attack missed. reverse roles
            if(params.isFirstAttacker){
                createTextBox(`${params.attackingMon.species.name}'s attack missed!`, checkStatus, {attackingMon: params.defendingMon, defendingMon: params.attackingMon, move: params.defendingMove, defendingMove: params.move, isFirstAttacker: false}, "miss")
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
            //return
        }
        if(defendingMonCopy.id === playerPokemon.id){
            setPlayerPokemon(defendingMonCopy)
        }
        else if (defendingMonCopy.id === opponentPokemon.id){
            setOpponentPokemon(defendingMonCopy)
        }
        let newParams = {...params, defendingMon: defendingMonCopy}
        if(params.effectiveness != ''){
            createTextBox(params.effectiveness, checkMoveStatusEffect, newParams, "effectiveness")
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
        let defendingMonCopy = copyOf(params.defendingMon)
        if(defendingMonCopy.current_hp > 0 && defendingMonCopy.status_effect.name === 'none' && params.move.move_status_effects.length > 0){
            params.move.move_status_effects.forEach(mse => {
                if(defendingMonCopy.status_effect.name === 'none' && Math.random() * 100 < mse.accuracy){
                    defendingMonCopy.status_effect = mse.status_effect
                    if(mse.status_effect.name === 'confusion'){
                        // function getRandomInt(min, max) {
                        //     min = Math.ceil(min);
                        //     max = Math.floor(max);
                        //     return Math.floor(Math.random() * (max - min + 1)) + min;
                        // }
                        defendingMonCopy.statusCounter = Math.round((Math.random() * 4) + 2)
                    }
                    else if(mse.status_effect.name === 'sleep'){
                        defendingMonCopy.statusCounter = Math.round((Math.random() * 3) + 2)
                    }
                    console.log(defendingMonCopy.status_effect)
                    //debugger
                    defendingMonCopy.id === playerPokemon.id ? setPlayerPokemon(defendingMonCopy) : setOpponentPokemon(defendingMonCopy)
                    if(params.isFirstAttacker){
                        createTextBox(`${defendingMonCopy.species.name} got ${mse.status_effect.name}.`, checkStatus, {attackingMon: defendingMonCopy, defendingMon: params.attackingMon, move: params.defendingMove, defendingMove: params.move, isFirstAttacker: false}, "status-effect-applied")
                    }
                    else{
                        let newParams = defendingMonCopy.id === playerPokemon.id ? {playerMon: defendingMonCopy, opponentMon: params.attackingMon, isFirst: true} : {playerMon: params.attackingMon, opponentMon: defendingMonCopy, isFirst: true}
                        createTextBox(`${defendingMonCopy.species.name} got ${mse.status_effect.name}.`, endOfTurnCleanup, newParams, "status-effect-applied")
                    }
                }
            })
            if(defendingMonCopy.status_effect.name !== 'none') return
            if(params.isFirstAttacker){
                checkStatus({attackingMon: defendingMonCopy, defendingMon: params.attackingMon, move: params.defendingMove, defendingMove: params.move, isFirstAttacker: false})
            }
            else{
                let newParams = defendingMonCopy.id === playerPokemon.id ? {playerMon: defendingMonCopy, opponentMon: params.attackingMon, isFirst: true} : {playerMon: params.attackingMon, opponentMon: defendingMonCopy, isFirst: true}
                endOfTurnCleanup(newParams)
            }
        }
        else if(defendingMonCopy.current_hp <= 0){
            if(defendingMonCopy.id === playerPokemon.id){
                let newPlayerPokemons = player.pokemons.map(pokemon => pokemon.id === defendingMonCopy.id ? defendingMonCopy : pokemon)
                setPlayer({...player, pokemons: newPlayerPokemons})
                setPlayerPokemon(defendingMonCopy)
                endOfTurnCleanup({playerMon: defendingMonCopy, opponentMon: params.attackingMon, isFirst: true})
            }
            else{
                let newOpponentPokemons = opponent.pokemons.map(pokemon => pokemon.id === defendingMonCopy.id ? defendingMonCopy : pokemon)
                setOpponent({...opponent, pokemons: newOpponentPokemons})
                setOpponentPokemon(defendingMonCopy)
                endOfTurnCleanup({playerMon: params.attackingMon, opponentMon: defendingMonCopy, isFirst: true})   
            }
        }
        else if(defendingMonCopy.status_effect.name !== 'none' && params.move.move_status_effects[0].accuracy === 100){
            if(params.isFirstAttacker){
                createTextBox(`${defendingMonCopy.species.name} is already ${defendingMonCopy.status_effect.name}'d!`, checkStatus, {attackingMon: defendingMonCopy, defendingMon: params.attackingMon, move: params.defendingMove, defendingMove: params.move, isFirstAttacker: false}, 'idk')
            }
            else{
                let newParams = defendingMonCopy.id === playerPokemon.id ? {playerMon: defendingMonCopy, opponentMon: params.attackingMon, isFirst: true} : {playerMon: params.attackingMon, opponentMon: defendingMonCopy, isFirst: true}
                createTextBox(`${defendingMonCopy.species.name} is already ${defendingMonCopy.status_effect.name}'d!`, endOfTurnCleanup, newParams, 'w/e')
            }
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
                createTextBox(`${params.playerMon.species.name} is hurt by ${params.playerMon.status_effect.name}!`, dealBurnPoisonDmg, {...params}, "status-effect-dmg")
            }
            else{
                endOfTurnCleanup({...params, isFirst: false})
            }
        }
        else{
            if(params.opponentMon.current_hp > 0 && (params.opponentMon.status_effect.name == 'poison' || params.opponentMon.status_effect.name == 'burn')){
                createTextBox(`${params.opponentMon.species.name} is hurt by ${params.opponentMon.status_effect.name}!`, dealBurnPoisonDmg, {...params}, "status-effect-dmg")
            }
            else{
                checkIfFainted({...params, isFirst: true})
            }
        }
    }

    const dealBurnPoisonDmg = params => {
        //params: playerMon, opponentMon, isFirst
        //debugger
        let pokeCopy = params.isFirst ? copyOf(params.playerMon) : copyOf(params.opponentMon)
        if(pokeCopy.current_hp - Math.floor((pokeCopy.status_effect.power * pokeCopy.species.hp_base / 100)) > 0){
            pokeCopy.current_hp -= Math.floor((pokeCopy.status_effect.power * pokeCopy.species.hp_base / 100))
            if(params.isFirst){
                let newPlayerPokemons = player.pokemons.map(pokemon => pokemon.id === pokeCopy.id ? pokeCopy : pokemon)
                setPlayer({...player, pokemons: newPlayerPokemons})
                setPlayerPokemon(pokeCopy)
                endOfTurnCleanup({playerMon: pokeCopy, opponentMon: params.opponentMon, isFirst: false})
            }
            else{
                let newOpponentPokemons = opponent.pokemons.map(pokemon => pokemon.id === pokeCopy.id ? pokeCopy : pokemon)
                setOpponent({...opponent, pokemons: newOpponentPokemons})
                setOpponentPokemon(pokeCopy)
                checkIfFainted({playerMon: params.playerMon, opponentMon: pokeCopy, isFirst: true})
            }
        }
        else{
            pokeCopy.current_hp = 0
            pokeCopy.status_effect = noStatusEffect

            if(params.isFirst){
                let newPlayerPokemons = player.pokemons.map(pokemon => pokemon.id === pokeCopy.id ? pokeCopy : pokemon)
                setPlayer({...player, pokemons: newPlayerPokemons})
                setPlayerPokemon(pokeCopy)
                endOfTurnCleanup({playerMon: pokeCopy, opponentMon: params.opponentMon, isFirst: false})
            }
            else{
                let newOpponentPokemons = opponent.pokemons.map(pokemon => pokemon.id === pokeCopy.id ? pokeCopy : pokemon)
                setOpponent({...opponent, pokemons: newOpponentPokemons})
                setOpponentPokemon(pokeCopy)
                checkIfFainted({playerMon: params.playerMon, opponentMon: pokeCopy, isFirst: true})
            }
        }
    }
    
    const checkIfFainted = params => {
        //params: playerMon, opponentMon, isFirst
        if(params.isFirst){
            if(params.playerMon.current_hp <= 0){
                createTextBox(`${params.playerMon.species.name} fainted!`, checkNextMon, params, "fainted")
            }
            else{
                checkIfFainted({...params, isFirst: false})
            }
        }
        else{
            if(params.opponentMon.current_hp <= 0){
                createTextBox(`${params.opponentMon.species.name} fainted!`, checkNextMon, params, "fainted")
            }
            else{
                setBattleState(battleStates[0])
            }
        }
    }

    const checkNextMon = params => {
        //params: playerMon, opponentMon, isFirst
        //isFirst = player pokemon fainted, otherwise opponent pokemon fainted
        //debugger
        if(params.isFirst){
            let newPlayerPokemons = player.pokemons.map(pokemon => pokemon.id === params.playerMon.id ? params.playerMon : pokemon)
            setPlayer({...player, pokemons: newPlayerPokemons})
            let nextMon = player.pokemons.find(pokemon => pokemon.id !== params.playerMon.id && pokemon.current_hp > 0)
            if(nextMon){
                setPlayerPokemon(nextMon)
                createTextBox(`${player.trainer_category.name} ${player.name} sent out ${nextMon.species.name}!`, checkIfFainted, {...params, playerMon: nextMon, isFirst: false}, "sent-out")
            }
            else{
                //this means all pokemon fainted
                //set state to defeat!
                createTextBox(`${player.trainer_category.name} ${player.name} whited out!`, setBattleStateByIndex, 4, "defeat")
            }
        }
        else{
            let nextMon = opponent.pokemons.find(pokemon => pokemon.id !== params.opponentMon.id && pokemon.current_hp > 0)
            if(nextMon){
                setOpponentPokemon(nextMon)
                createTextBox(`${opponent.trainer_category.name} ${opponent.name} sent out ${nextMon.species.name}!`, setBattleStateByIndex, 0, "sent-out")
            }
            else{
                //this means all pokemon fainted
                //set state to defeat!
                let pCopy = copyOf(playerPokemon)
                if(playerPokemon.status_effect.name === 'confusion'){
                    pCopy.statusCounter = undefined
                    pCopy.status_effect = noStatusEffect
                }
                let newPlayerPokemons = player.pokemons.map(pokemon => pokemon.id === pCopy.id ? pCopy : pokemon)
                createTextBox(`You beat ${opponent.trainer_category.name} ${opponent.name}!`, props.exitBattle, {...player, pokemons: newPlayerPokemons}, "victory")
            }
        }
    }

    const setBattleStateByIndex = index => {
        setBattleState(battleStates[index])
    }

    const copyOf = pokemon => {
        return JSON.parse(JSON.stringify(pokemon))
    }

    const useMove = move => {
        setBattleState(battleStates[1]) //moveBeingUsed state
        battleLogicStart(playerPokemon, opponentPokemon, move) //go to damage calculation
    }

    const createTextBox = (text, callbackFunction, params, msgType) => {
        //something like <BattleTextBox text={text}/>
        //while that text box's currentText != text, do nothing
        //basically, we want to stop JS from doing anything else for the time being
        //then after, call the callbackFunction
        setTextBox(<BattleTextBox text={text} callbackFunction={() => callbackFunction(params)} params={params} msgType={msgType}/>)
        return
    }

    const playerFirstPokemon = () => {
        return player.pokemons.find(pokemon => pokemon.current_hp > 0)
    }

    const renderController = () => {
        if(battleState === ''){
            if(playerPokemon !== undefined && opponentPokemon !== undefined){
                setBattleState('intro')
                createTextBox(`${opponent.trainer_category.name} ${opponent.name} wants to battle!`, setBattleStateByIndex, 0, "wants-to-battle")
            }
            else if(player !== undefined && opponent !== undefined){
                setPlayerPokemon(playerFirstPokemon())
                setOpponentPokemon(opponent.pokemons[0])
            }
            return <div>loLOADING...ading...</div>
        }
        // only uncomment if we're gonna add player sprites before sending out pokemon
        // otherwise, taken care of by battleState[1] render
        // else if(battleState === 'intro'){
        //     return(
        //         <div id="battle-screen">
        //             <div id="battle-contents">
        //                 <div id="battle-area">
        //                     <div className={'player-pokemon-text'}>
        //                         <PokemonText
        //                             pokemon={playerPokemon} 
        //                             sprite={playerPokemon.species.sprite_back}
        //                             imgHeight="400px"
        //                         />
        //                     </div>
        //                     <div className={'opponent-pokemon-text'}>
        //                         <PokemonText 
        //                             pokemon={opponentPokemon} 
        //                             sprite={opponentPokemon.species.sprite_front}
        //                             imgHeight="250px"
        //                         />
        //                     </div>
        //                 </div>
        //                 <Divider horizontal>
        //                     <img
        //                         src={pokeballIcon}
        //                         height="15px" 
        //                         width="15px"
        //                         style={{
        //                             marginBottom: "-3px"
        //                         }}
        //                     />
        //                 </Divider>
        //             </div>
        //         </div>
        //     )
        // }
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
        else if(battleState === battleStates[1] || battleState === 'intro'){
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