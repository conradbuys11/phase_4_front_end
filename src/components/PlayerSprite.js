import React, { Component } from 'react';

export default class PlayerSprite extends Component {

    constructor() {
        super()
        this.state = {
            loaded: false,
            top: 0,
            left: 0
        }
    }

    componentDidMount() {
        this.setState({
            loaded: true
        })
    }

    moveSprite = (event) => {
        let vert = 0;
        let horiz = 0;
        switch(event.code) {
            case "KeyW":
                vert = -5;
                break;
            default:
                console.log(event.code)
                break;
        }
        this.setState({
            top: this.state.top + vert,
            left: this.state.left + horiz
        })
    }

    render() {
        let margin = `margin-top: ${this.state.top}px`
        return (
            <div
                className="player-sprite"
                onKeyDown={this.moveSprite}
                tabIndex="0"
                style={{margin}}
            >
            </div>
        )
    }
}