import React, { Component } from 'react';

import Boundary from '../components/Boundary'
import PlayerSprite from '../components/PlayerSprite'
import Obstacle from '../components/Obstacle';
import Trainer from '../components/Trainer'

import pokeGirlDown1 from "../assets/poke-girl-1/down1.png"
import pokeGirlDown2 from "../assets/poke-girl-1/down2.png"
import pokeGirlDown3 from "../assets/poke-girl-1/down3.png"
import pokeGirlLeft1 from "../assets/poke-girl-1/left1.png"
import pokeGirlLeft2 from "../assets/poke-girl-1/left2.png"
import pokeGirlLeft3 from "../assets/poke-girl-1/left3.png"
import pokeGirlRight1 from "../assets/poke-girl-1/right1.png"
import pokeGirlRight2 from "../assets/poke-girl-1/right2.png"
import pokeGirlRight3 from "../assets/poke-girl-1/right3.png"
import pokeGirlUp1 from "../assets/poke-girl-1/up1.png"
import pokeGirlUp2 from "../assets/poke-girl-1/up2.png"
import pokeGirlUp3 from "../assets/poke-girl-1/up3.png"

import rocketGruntMaleUp1 from "../assets/rocket-grunt-male/up1.png"
import rocketGruntMaleRight1 from "../assets/rocket-grunt-male/right1.png"

const MAPSIZE = 1000
const PLAYERSPRITE = "pokeGirl"

const BOUNDARYTHICCNESS = 20 /* MAPSIZE / 45 */
const MOVESPEED = 1 * MAPSIZE / 300
const STEPTIME = 200
const SPRITESIZE = MAPSIZE / 20

export default class GameContainer extends Component {

    loadedAt

    images = {
        pokeGirlDown1,
        pokeGirlDown2,
        pokeGirlDown3,
        pokeGirlUp1,
        pokeGirlUp2,
        pokeGirlUp3,
        pokeGirlLeft1,
        pokeGirlLeft2,
        pokeGirlLeft3,
        pokeGirlRight1,
        pokeGirlRight2,
        pokeGirlRight3
    };

    // if game included more than 1 area this would be imported from area database
    obstacles = [
        {
            width: MAPSIZE / 45,
            height: MAPSIZE / 4.5,
            x: MAPSIZE / 3,
            y: 0
        },
        {
            width: MAPSIZE / 4.5,
            height: MAPSIZE / 45,
            x: 0,
            y: MAPSIZE / 3,
        },
        {
            width: MAPSIZE / 4.5,
            height: MAPSIZE / 45,
            x: MAPSIZE / 3,
            y: 0
        },
        {
            width: MAPSIZE / 4.5,
            height: MAPSIZE / 45,
            x: 0,
            y: -MAPSIZE / 3,
        },
        {
            width: MAPSIZE / 45,
            height: MAPSIZE / 4.5,
            x: -MAPSIZE / 3,
            y: 0
        },
        {
            width: MAPSIZE / 4.5,
            height: MAPSIZE / 45,
            x: -MAPSIZE / 3,
            y: 0
        },
        {
            width: MAPSIZE / 45,
            height: MAPSIZE / 45,
            x: -MAPSIZE / 5,
            y: -MAPSIZE / 5
        },
    ]

    // I think it makes sense to do this map 1 time here rather than every 10ms in tick()
    collisionMap = this.obstacles.map(obstacle => {
        return {
            minLeft: obstacle.x - obstacle.width - SPRITESIZE / 3,
            maxLeft: obstacle.x + obstacle.width + SPRITESIZE / 3,
            minTop: obstacle.y - obstacle.height - SPRITESIZE,
            maxTop: obstacle.y + obstacle.height
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
            currentSprite: pokeGirlDown1,
            isMoving: false,
            facing: "Down",
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
                newFacing = "Up"
                newIsMoving = true
            }
            else if(this.state.s && !this.state.w && this.state.lastInput === "s") {
                newTop += MOVESPEED
                newSprite = this.animate("down")
                newFacing = "Down"
                newIsMoving = true
            }
            else if(this.state.d && !this.state.a && this.state.lastInput === "d") {
                newLeft += MOVESPEED
                newSprite = this.animate("right")
                newFacing = "Right"
                newIsMoving = true
            }
            else if(this.state.a && !this.state.d && this.state.lastInput === "a") {
                newLeft -= MOVESPEED
                newSprite = this.animate("left")
                newFacing = "Left"
                newIsMoving = true
            }
            // holding contradictory inputs
            else {
                newIsMoving = false
                switch(this.state.facing) {
                    case "Up":
                        newSprite = pokeGirlUp1
                        break;
                    case "Down":
                        newSprite = pokeGirlDown1
                        break;
                    case "Right":
                        newSprite = pokeGirlRight1
                        break;
                    case "Left":
                        newSprite = pokeGirlLeft1
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
                newFacing = "Up"
                newIsMoving = true
            }
            else if(this.state.s && !this.state.w) {
                newTop += MOVESPEED
                newSprite = this.animate("down")
                newFacing = "Down"
                newIsMoving = true
            }
            else if(this.state.d && !this.state.a) {
                newLeft += MOVESPEED
                newSprite = this.animate("right")
                newFacing = "Right"
                newIsMoving = true
            }
            else if(this.state.a && !this.state.d) {
                newLeft -= MOVESPEED 
                newSprite = this.animate("left")
                newFacing = "Left"
                newIsMoving = true
            }
            // movement ends or no movement
            // probably need to split these up -- currently doing the "stop movement" action every 10ms even while not moving
            else {
                newSprite = this.images[PLAYERSPRITE + this.state.facing + "1"]
                newIsMoving = false
            }
        }

        // only do OOB/collision checks while moving - lowers idle load
        if(newIsMoving) {
            // OOB check
            if(newTop > (MAPSIZE - BOUNDARYTHICCNESS - (SPRITESIZE * 1.5))) { newTop = (MAPSIZE - BOUNDARYTHICCNESS - (SPRITESIZE * 1.5)) }
            else if(newTop < -(MAPSIZE - BOUNDARYTHICCNESS)) { newTop = -(MAPSIZE - BOUNDARYTHICCNESS) }
            if(newLeft > (MAPSIZE - BOUNDARYTHICCNESS)) { newLeft = (MAPSIZE - BOUNDARYTHICCNESS) }
            else if(newLeft < -(MAPSIZE - BOUNDARYTHICCNESS)) { newLeft = -(MAPSIZE - BOUNDARYTHICCNESS) }

            // collision check
            let collisionDetected = this.collisionMap.filter(obstacle => 
                newLeft > obstacle.minLeft && newLeft < obstacle.maxLeft && newTop > obstacle.minTop && newTop < obstacle.maxTop
            )    
            if(collisionDetected.length > 0) {
                switch(newFacing) {
                    case "Up":
                        newTop = collisionDetected[0].maxTop
                        break;
                    case "Down":
                        newTop = collisionDetected[0].minTop
                        break;
                    case "Right":
                        newLeft = collisionDetected[0].minLeft
                        break;
                    case "Left":
                        newLeft = collisionDetected[0].maxLeft
                        break;
                    default:
                        break;
                }
            }
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
                    return this.state.currentSprite === pokeGirlUp2 ? pokeGirlUp3 : pokeGirlUp2
                case "down":
                    return this.state.currentSprite === pokeGirlDown2 ? pokeGirlDown3 : pokeGirlDown2
                case "right":
                    return this.state.currentSprite === pokeGirlRight2 ? pokeGirlRight3 : pokeGirlRight2
                case "left":
                    return this.state.currentSprite === pokeGirlLeft2 ? pokeGirlLeft3 : pokeGirlLeft2
                default:
                    break;
            }
        }
        else {
            switch(direction) {
                case "up":
                    return this.state.currentSprite === pokeGirlUp2 ? pokeGirlUp2 : pokeGirlUp3
                case "down":
                    return this.state.currentSprite === pokeGirlDown3 ? pokeGirlDown3 : pokeGirlDown2
                case "right":
                    return this.state.currentSprite === pokeGirlRight3 ? pokeGirlRight3 : pokeGirlRight2
                case "left":
                    return this.state.currentSprite === pokeGirlLeft2 ? pokeGirlLeft2 : pokeGirlLeft3
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

                {/* Trainers */}
                <Trainer
                    orientation="up"
                    sprite={rocketGruntMaleUp1}
                    size={SPRITESIZE}
                    x={MAPSIZE / 2.5}
                    y={-MAPSIZE / 12.5}
                    top={0}
                    left={0}
                    sightWidth={SPRITESIZE / 2}
                    sightHeight={200}
                />
                <Trainer
                    orientation="right"
                    sprite={rocketGruntMaleRight1}
                    size={SPRITESIZE}
                    x={MAPSIZE / 2.5}
                    y={-MAPSIZE / -12.5}
                    top={0}
                    left={0}
                    sightWidth={200}
                    sightHeight={SPRITESIZE / 2}
                />

                {/* Player */}
                <PlayerSprite 
                    top={this.state.top} 
                    left={this.state.left}
                    sprite={this.state.currentSprite}
                    size={SPRITESIZE}
                />
            </div>
        )
    }
}