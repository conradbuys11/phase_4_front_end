import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

import OverworldContainer from './OverworldContainer'
import BattleContainer from './BattleContainer'
import Start from '../components/Start'

export default class GameContainer extends Component {

    componentDidMount(){
        fetch('http://localhost:3000/trainers/')
        .then(rsp => rsp.json())
        .then(trainers => {
            this.setState({
                player: trainers[0]
            })
        })
        console.log('nice')
    }

    state = {
        player: undefined,
        gameState: "overworld",
        battlingTrainer: null,
        top: 0,
        left: 0,
        facing: "Up",
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

    exitBattle = player => {
        this.setState({
            gameState: "overworld",
            player: player,
            battlingTrainer: null
        })
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => {
                        return <Link to="/game">
                            <Start />
                        </Link>
                    }}/>
                    <Route exact path="/game" render={() => this.state.gameState === "overworld"
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
                            player={this.state.player} 
                            enemyTrainer={this.state.battlingTrainer} 
                            exitBattle={this.exitBattle}
                        />
                    }
                    />
                </Switch>
            </BrowserRouter>
        )
    }

}