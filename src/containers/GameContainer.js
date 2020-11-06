import React, { Component } from 'react';

import Boundary from '../components/Boundary'
import PlayerSprite from '../components/PlayerSprite'

import down1 from "../assets/poke-girl-1/down1.png"
import down2 from "../assets/poke-girl-1/down2.png"
import down3 from "../assets/poke-girl-1/down3.png"
import left1 from "../assets/poke-girl-1/left1.png"
import left2 from "../assets/poke-girl-1/left2.png"
import left3 from "../assets/poke-girl-1/left3.png"
import right1 from "../assets/poke-girl-1/right1.png"
import right2 from "../assets/poke-girl-1/right2.png"
import right3 from "../assets/poke-girl-1/right3.png"
import up1 from "../assets/poke-girl-1/up1.png"
import up2 from "../assets/poke-girl-1/up2.png"
import up3 from "../assets/poke-girl-1/up3.png"

const MOVESPEED = 3
const STEPTIME = 200

export default class GameContainer extends Component {

    loadedAt

    images = {
        down1,
        down2,
        down3,
        up1,
        up2,
        up3,
        left1,
        left2,
        left3,
        right1,
        right2,
        right3
      };

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
            lastInputHeld: false,
            currentSprite: down1,
            isMoving: false,
            facing: "down",
            timeOfLastDirectionChange: new Date()
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
        let newSprite = this.state.currentSprite
        let newIsMoving = this.state.isMoving
        let newFacing = this.state.facing

        if(this.state.lastInputHeld) {
            // movement starts or continues after direction change
            // probably need to split these up
                // continued movement needs to animate
            if(this.state.w && !this.state.s && this.state.lastInput === "w") {
                newTop -= MOVESPEED
                newSprite = this.animate("up")
                newFacing = "up"
            }
            else if(this.state.s && !this.state.w && this.state.lastInput === "s") {
                newTop += MOVESPEED
                newSprite = this.animate("down")
                newFacing = "down"
            }
            else if(this.state.d && !this.state.a && this.state.lastInput === "d") {
                newLeft += MOVESPEED
                newSprite = this.animate("right")
                newFacing = "right"
            }
            else if(this.state.a && !this.state.d && this.state.lastInput === "a") {
                newLeft -= MOVESPEED
                newSprite = this.animate("left")
                newFacing = "left"
            }
            newIsMoving = true
        }
        else {
            // movement direction changes
            if(this.state.w && !this.state.s) {
                newTop -= MOVESPEED
                newSprite = this.animate("up")
                newFacing = "up"
            }
            else if(this.state.s && !this.state.w) {
                newTop += MOVESPEED
                newSprite = this.animate("down")
                newFacing = "down"
            }
            else if(this.state.d && !this.state.a) {
                newLeft += MOVESPEED
                newSprite = this.animate("right")
                newFacing = "right"
            }
            else if(this.state.a && !this.state.d) {
                newLeft -= MOVESPEED 
                newSprite = this.animate("left")
                newFacing = "left"
            }
            // movement ends or no movement
            // probably need to split these up -- currently doing the "stop movement" action every 10ms even while not moving
            else {
                newSprite = this.images[this.state.facing + "1"]
                newIsMoving = false
            }
        }

        //OOB check
        if(newTop > 820) { newTop = 820 }
        else if(newTop < -880) { newTop = -880 }
        if(newLeft > 890) { newLeft = 890 }
        else if(newLeft < -890) { newLeft = -890 }

        this.setState({      
            timer: new Date(),
            top: newTop,
            left: newLeft,
            currentSprite: newSprite,
            facing: newFacing,
            isMoving: newIsMoving
        }); 
    }

    animate = (direction) => {
        // use a timer to keep track of time elapsed since last step without changing direction
        // change image and reset timer if past certain threshold
        if(this.state.isMoving && Date.now() - this.state.timeOfLastDirectionChange > STEPTIME){
            this.setState({
                timeOfLastDirectionChange: new Date()
            })
            switch(direction) {
                case "up":
                    return this.state.currentSprite === up2 ? up3 : up2
                case "down":
                    return this.state.currentSprite === down2 ? down3 : down2
                case "right":
                    return this.state.currentSprite === right2 ? right3 : right2
                case "left":
                    return this.state.currentSprite === left2 ? left3 : left2
                default:
                    break;
            }
        }
        else {
            switch(direction) {
                case "up":
                    return this.state.currentSprite === up2 ? up2 : up3
                case "down":
                    return this.state.currentSprite === down3 ? down3 : down2
                case "right":
                    return this.state.currentSprite === right3 ? right3 : right2
                case "left":
                    return this.state.currentSprite === left2 ? left2 : left3
                default:
                    break;
            }
        }
    }

    moveSprite = (event) => {
        switch(event.code) {
            case "KeyW":
                if(!this.state.lastInputHeld || this.state.lastInput !== "w"){
                    this.setState({
                        w: true,
                        lastInput: "w",
                        lastInputHeld: true,
                        timeOfLastDirectionChange: new Date()
                    })
                }
                break;
            case "KeyS":
                if(!this.state.lastInputHeld || this.state.lastInput !== "s"){
                    this.setState({
                        s: true,
                        lastInput: "s",
                        lastInputHeld: true,
                        timeOfLastDirectionChange: new Date()
                    })
                }
                break;
            case "KeyA":
                if(!this.state.lastInputHeld || this.state.lastInput !== "a"){
                    this.setState({
                        a: true,
                        lastInput: "a",
                        lastInputHeld: true,
                        timeOfLastDirectionChange: new Date()
                    })
                }
                break;
            case "KeyD":
                if(!this.state.lastInputHeld || this.state.lastInput !== "d"){
                    this.setState({
                        d: true,
                        lastInput: "d",
                        lastInputHeld: true,
                        timeOfLastDirectionChange: new Date()
                    })
                }
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
                if(this.state.lastInput === "w" || !this.state.lastInputHeld) {
                    held = false
                }
                this.setState({
                    w: false,
                    lastInputHeld: held
                })
                break;
            case "KeyS":
                if(this.state.lastInput === "s" || !this.state.lastInputHeld) {
                    held = false
                }
                this.setState({
                    s: false,
                    lastInputHeld: held
                })
                break;
            case "KeyA":
                if(this.state.lastInput === "a" || !this.state.lastInputHeld) {
                    held = false
                }
                this.setState({
                    a: false,
                    lastInputHeld: held
                })
                break;
            case "KeyD":
                if(this.state.lastInput === "d" || !this.state.lastInputHeld) {
                    held = false
                }
                this.setState({
                    d: false,
                    lastInputHeld: held
                })
                break;
            default:
                console.log(event.timeStamp)
                break;
        }
    }

    pause = (e) => {
        // movement ends
        this.setState({
            w: false,
            a: false,
            s: false,
            d: false,
            lastInputHeld: false
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
                <Boundary orientation="horizontal" location="top" timer={Date.now() - this.state.timeOfLastDirectionChange}/>
                <Boundary orientation="vertical" location="left" timer=""/>
                <Boundary orientation="vertical" location="right" timer=""/>
                <Boundary orientation="horizontal" location="bottom" timer=""/>
                <PlayerSprite 
                    top={this.state.top} 
                    left={this.state.left}
                    sprite={this.state.currentSprite}
                />
            </div>
        )
    }
}