import React, { Component } from 'react';
import LineOfSight from './LineOfSight'

import aggro from "../assets/aggro.png"

export default class Trainer extends Component {

    naniCheck = () => {
        if(this.props.aggro === this.props.id && this.props.nani > 0) {
            return true
        }
        return false
    }

    move = () => {
        if(this.props.aggro === this.props.id && this.props.nani === 0) {
            let top = this.props.top
            let left = this.props.left
            // if(this.props.orientation === "down" || this.props.orientation === "left") {
            //     top = top * -1
            //     left = left * -1
            // }
            return {
                top: top,
                left: left
            }
        }
        else {
            return {
                top: 0,
                left: 0
            }
        }
    }

    render() {
        return (
            <div
                className="trainer-sprite"
                id={"trainer-" + this.props.id}
                style={{
                    marginTop: this.props.y + this.move().top,
                    marginLeft: this.props.x + this.move().left,
                    height: this.props.size,
                    width: this.props.size,
                }}
            >
                {this.naniCheck()
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