import React, { Component } from 'react';

import Boundary from '../components/Boundary'
import PlayerSprite from '../components/PlayerSprite'
import Obstacle from '../components/Obstacle';

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
const MAPSIZE = 900
const BOUNDARYTHICCNESS = 20
const SPRITESIZE = 40

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

    obstacles = [
        {
            width: 20,
            height: 200,
            x: MAPSIZE / 3,
            y: 0
        },
        {
            width: 200,
            height: 20,
            x: 0,
            y: MAPSIZE / 3,
        }
    ]

    collisionMap = this.obstacles.map(obstacle => {
        return {
            minLeft: obstacle.x - obstacle.width,
            maxLeft: obstacle.x + obstacle.width,
            minTop: obstacle.y - obstacle.height - SPRITESIZE,
            maxTop: obstacle.y + obstacle.height - SPRITESIZE
        }
    })

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
                newIsMoving = true
            }
            else if(this.state.s && !this.state.w && this.state.lastInput === "s") {
                newTop += MOVESPEED
                newSprite = this.animate("down")
                newFacing = "down"
                newIsMoving = true
            }
            else if(this.state.d && !this.state.a && this.state.lastInput === "d") {
                newLeft += MOVESPEED
                newSprite = this.animate("right")
                newFacing = "right"
                newIsMoving = true
            }
            else if(this.state.a && !this.state.d && this.state.lastInput === "a") {
                newLeft -= MOVESPEED
                newSprite = this.animate("left")
                newFacing = "left"
                newIsMoving = true
            }
            // holding contradictory inputs
            else {
                newIsMoving = false
                switch(this.state.facing) {
                    case "up":
                        newSprite = up1
                        break;
                    case "down":
                        newSprite = down1
                        break;
                    case "right":
                        newSprite = right1
                        break;
                    case "left":
                        newSprite = left1
                        break;
                    default:
                        break;
                }
            }
        }
        else {
            // movement direction changes
            if(this.state.w && !this.state.s) {
                newTop -= MOVESPEED
                newSprite = this.animate("up")
                newFacing = "up"
                newIsMoving = true
            }
            else if(this.state.s && !this.state.w) {
                newTop += MOVESPEED
                newSprite = this.animate("down")
                newFacing = "down"
                newIsMoving = true
            }
            else if(this.state.d && !this.state.a) {
                newLeft += MOVESPEED
                newSprite = this.animate("right")
                newFacing = "right"
                newIsMoving = true
            }
            else if(this.state.a && !this.state.d) {
                newLeft -= MOVESPEED 
                newSprite = this.animate("left")
                newFacing = "left"
                newIsMoving = true
            }
            // movement ends or no movement
            // probably need to split these up -- currently doing the "stop movement" action every 10ms even while not moving
            else {
                newSprite = this.images[this.state.facing + "1"]
                newIsMoving = false
            }
        }

        if(newIsMoving) {
            // OOB check
            if(newTop > (MAPSIZE - BOUNDARYTHICCNESS - (SPRITESIZE * 2))) { newTop = (MAPSIZE - BOUNDARYTHICCNESS - (SPRITESIZE * 2)) }
            else if(newTop < -(MAPSIZE - BOUNDARYTHICCNESS)) { newTop = -(MAPSIZE - BOUNDARYTHICCNESS) }
            if(newLeft > (MAPSIZE - BOUNDARYTHICCNESS)) { newLeft = (MAPSIZE - BOUNDARYTHICCNESS) }
            else if(newLeft < -(MAPSIZE - BOUNDARYTHICCNESS)) { newLeft = -(MAPSIZE - BOUNDARYTHICCNESS) }

            // collision check
            let collisionDetected = this.collisionMap.filter(obstacle => 
                newLeft > obstacle.minLeft && newLeft < obstacle.maxLeft && newTop > obstacle.minTop && newTop < obstacle.maxTop
            )
            
            if(collisionDetected.length > 0) {
                switch(newFacing) {
                    case "up":
                        newTop = collisionDetected[0].maxTop
                        break;
                    case "down":
                        newTop = collisionDetected[0].minTop
                        break;
                    case "right":
                        newLeft = collisionDetected[0].minLeft
                        break;
                    case "left":
                        newLeft = collisionDetected[0].maxLeft
                        break;
                    default:
                        break;
                }
            }

            // hardcoded approach -- works
            /* if(newLeft > 280 && newLeft < 320 && newTop > -230 && newTop < 170) {
                if(newFacing === "right") { newLeft = 280 }
                else if (newFacing === "left") { newLeft = 320 }     
            } */
        }


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
                // console.log(event.timeStamp)
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
                style={{
                    width: (MAPSIZE + BOUNDARYTHICCNESS * 2) + "px",
                    height: MAPSIZE + "px"
                }}
            >
                
                {/* Boundaries */}
                <Boundary
                    orientation="horizontal" 
                    location="top" 
                    timer={Date.now() - this.state.timeOfLastDirectionChange}
                    width={MAPSIZE}
                    height={BOUNDARYTHICCNESS}
                />
                <Boundary 
                    orientation="vertical" 
                    location="left" 
                    timer=""
                    width={BOUNDARYTHICCNESS + "px"} 
                    height={MAPSIZE + "px"} 
                />
                <Boundary 
                    orientation="vertical" 
                    location="right" 
                    timer=""
                    width={BOUNDARYTHICCNESS + "px"} 
                    height={MAPSIZE + "px"} 
                />
                <Boundary 
                    orientation="horizontal" 
                    location="bottom" 
                    timer=""
                    width={MAPSIZE + "px"} 
                    height={BOUNDARYTHICCNESS + "px"} 
                />

                {/* Obstacles */}
                {this.obstacles.map(obstacle => 
                    <Obstacle
                        width={obstacle.width + "px"}
                        height={obstacle.height + "px"}
                        x={obstacle.x + "px"}
                        y={obstacle.y + "px"}
                    />
                )}

                {/* Player */}
                <PlayerSprite 
                    top={this.state.top} 
                    left={this.state.left}
                    sprite={this.state.currentSprite}
                />
            </div>
        )
    }
}