import React, { Component } from 'react';
import LineOfSight from './LineOfSight'

import aggro from "../assets/aggro.png"

export default class Trainer extends Component {

    aggroCheck = () => {
        if(this.props.aggro === this.props.id) {
            return true
        }
        return false
    }

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
                {this.aggroCheck()
                    ?
                        <img
                            src={aggro}
                            className="aggro"
                            style={{
                                height: this.props.size,
                                width: this.props.size,
                                marginTop: -this.props.size * 2,
                            }}
                        />
                    :
                        null
                }
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