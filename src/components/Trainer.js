import React, { Component } from 'react';

export default class Trainer extends Component {

    render() {
        return (
            <img
                src={this.props.sprite}
                className="trainer-sprite"
                style={{
                    height: this.props.size,
                    width: this.props.size,
                    marginTop: this.props.y + this.props.top,
                    marginLeft: this.props.x + this.props.left,
                }}
            />
        )
    }
}