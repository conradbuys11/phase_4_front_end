import React, { Component } from 'react';
import Boundary from '../components/Boundary'
import PlayerSprite from '../components/PlayerSprite'

const MOVESPEED = 10

export default class GameContainer extends Component {

    loadedAt

    constructor() {
        super()
        this.state = {
            top: 0,
            left: 0,
            timer: new Date(),
            vertInertia: 0,
            horizInertia: 0,
            w: false,
            a: false,
            s: false,
            d: false,
            lastInput: "",
            lastInputheld: false,
            currentSprite: ""
        }
        this.loadedAt = new Date()
    }

    componentDidMount() {
        this.timerID = setInterval(      
            () => this.tick(),
            10   
        );
    }

    tick = () => {
        let newTop = this.state.top
        let newLeft = this.state.left

        if(this.state.lastInputheld) {
            if(this.state.w && !this.state.s && this.state.lastInput === "w") {
                newTop -= MOVESPEED
            }
            else if(this.state.s && !this.state.w && this.state.lastInput === "s") {
                newTop += MOVESPEED 
            }
            else if(this.state.d && !this.state.a && this.state.lastInput === "d") {
                newLeft += MOVESPEED
            }
            else if(this.state.a && !this.state.d && this.state.lastInput === "a") {
                newLeft -= MOVESPEED 
            }
        }
        else {
            if(this.state.w && !this.state.s) {
                newTop -= MOVESPEED
            }
            else if(this.state.s && !this.state.w) {
                newTop += MOVESPEED 
            }
            else if(this.state.d && !this.state.a) {
                newLeft += MOVESPEED
            }
            else if(this.state.a && !this.state.d) {
                newLeft -= MOVESPEED 
            }
        }

        this.setState({      
            timer: new Date(),
            top: newTop,
            left: newLeft 
        }); 
    }

    moveSprite = (event) => {
        switch(event.code) {
            case "KeyW":
                this.setState({
                    w: true,
                    lastInput: "w",
                    lastInputHeld: true
                })
                break;
            case "KeyS":
                this.setState({
                    s: true,
                    lastInput: "s",
                    lastInputHeld: true
                })
                break;
            case "KeyA":
                this.setState({
                    a: true,
                    lastInput: "a",
                    lastInputHeld: true
                })
                break;
            case "KeyD":
                this.setState({
                    d: true,
                    lastInput: "d",
                    lastInputHeld: true
                })
                break;
            default:
                console.log(event.code)
                break;
        }
    }

    stopSprite = (event) => {
        let held = true
        switch(event.code) {
            case "KeyW":
                if(this.state.lastInput === "w") {
                    held = false
                }
                this.setState({
                    w: false,
                    lastInputheld: held
                })
                break;
            case "KeyS":
                if(this.state.lastInput === "s") {
                    held = false
                }
                this.setState({
                    s: false,
                    lastInputheld: held
                })
                break;
            case "KeyA":
                if(this.state.lastInput === "a") {
                    held = false
                }
                this.setState({
                    a: false,
                    lastInputheld: held
                })
                break;
            case "KeyD":
                if(this.state.lastInput === "d") {
                    held = false
                }
                this.setState({
                    d: false,
                    lastInputheld: held
                })
                break;
            default:
                console.log(event.timeStamp)
                break;
        }
    }

    pause = (e) => {
        this.setState({
            w: false,
            a: false,
            s: false,
            d: false
        })
    }

    render() {
        return (
            <div className="playable-area"
                onKeyDown={this.moveSprite}
                onKeyUp={this.stopSprite}
                tabIndex="0"
                onBlur={this.pause}
            >
                <Boundary orientation="horizontal" location="top"/>
                <Boundary orientation="vertical" location="left"/>
                <Boundary orientation="vertical" location="right"/>
                <Boundary orientation="horizontal" location="bottom"/>
                <PlayerSprite 
                    top={this.state.top} 
                    left={this.state.left}
                />
            </div>
        )
    }
}