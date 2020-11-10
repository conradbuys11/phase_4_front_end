import React, { Component } from 'react';
import OverworldContainer from './OverworldContainer'
import BattleContainer from './BattleContainer'

export default class GameContainer extends Component {

    state = {
        gameState: "overworld",
        battlingTrainer: null,
        top: 0,
        left: 0,
        facing: "Down",
        defeatedTrainers: []
    }

    enterBattle = (trainer, top, left, facing, defeatedTrainers) => {
        this.setState({
            gameState: "battle",
            battlingTrainer: trainer,
            top: top,
            left: left,
            facing: facing,
            defeatedTrainers: defeatedTrainers
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
                {this.state.gameState === "overworld"
                    ?
                        <OverworldContainer
                            enterBattle={this.enterBattle}
                            top={this.state.top}
                            left={this.state.left}
                            facing={this.state.facing}
                            defeatedTrainers={this.state.defeatedTrainers}
                        />
                    :
                        <BattleContainer 
                            enemyTrainer={this.state.battlingTrainer} 
                            exitBattle={this.exitBattle}
                        />
                }
            </>
        )
    }

}