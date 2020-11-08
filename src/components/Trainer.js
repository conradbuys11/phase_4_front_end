import React, { Component } from 'react';
import LineOfSight from './LineOfSight'

export default class Trainer extends Component {

    render() {
        return (
            <div
                className="trainer-sprite"
                style={{
                    marginTop: this.props.y + this.props.top,
                    marginLeft: this.props.x + this.props.left,
                    height: this.props.size,
                    width: this.props.size,
                }}
            >
                <img
                    src={this.props.sprite}
                    // className="trainer-sprite"
                    style={{
                        height: this.props.size,
                        width: this.props.size,
                    }}
                />
                <LineOfSight
                    orientation={this.props.orientation}
                    width={this.props.sightWidth}
                    height={this.props.sightHeight}
                    size={this.props.size}
                />
            </div>
        )
    }
}