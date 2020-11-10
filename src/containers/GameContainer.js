import React, { Component } from 'react';
import OverworldContainer from './OverworldContainer'
import BattleContainer from './BattleContainer'

export default class GameContainer extends Component {

    state = {
        gameState: "overworld",
        battlingTrainer: null
    }

    enterBattle = (trainer) => {
        this.setState({
            gameState: "battle",
            battlingTrainer: trainer
        })
    }

    exitBattle = () => {
        this.setState({
            gameState: "overworld",
            battlingTrainer: null
        })
    }

    render() {
        return (
            <>
                {this.state.gameState === "overworld" ? <OverworldContainer enterBattle={this.enterBattle}/> : <BattleContainer enemyTrainer={this.state.battlingTrainer} exitBattle={this.exitBattle}/>}
            </>
        )
    }

}