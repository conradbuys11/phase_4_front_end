import React, { Component } from 'react';

export default class PlayerSprite extends Component {

    render() {
        return (
            <div
                className="player-sprite"
                style={{marginTop: this.props.top, marginLeft: this.props.left}}
            >
                ASH
            </div>
        )
    }
}