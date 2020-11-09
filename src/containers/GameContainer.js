import React, { Component } from 'react';
import OverworldContainer from './OverworldContainer'
import BattleContainer from './BattleContainer'

export default class GameContainer extends Component {

    state = {
        gameState: "overworld"
    }

    swap = (newGameState) => {
        this.setState({
            gameState: newGameState
        })
    }

    render() {
        return (
            <>
                {this.state.gameState === "overworld" ? <OverworldContainer swap={this.swap}/> : <BattleContainer swap={this.swap}/>}
            </>
        )
    }

}