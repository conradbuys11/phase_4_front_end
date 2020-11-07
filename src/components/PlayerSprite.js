import React, { Component } from 'react';

export default class PlayerSprite extends Component {

    render() {
        return (
            <img
                //src={require(`../assets/poke-girl-1/down1.png`)}
                src={this.props.sprite}
                className="player-sprite"
                style={{
                    marginTop: this.props.top,
                    marginLeft: this.props.left,
                    height: this.props.size,
                    width: this.props.size
                }}
            />
        )
    }
}