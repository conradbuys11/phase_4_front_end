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

import rocketGruntMaleDown1 from "../assets/rocket-grunt-male/down1.png"
import rocketGruntMaleLeft1 from "../assets/rocket-grunt-male/left1.png"
import rocketGruntMaleRight1 from "../assets/rocket-grunt-male/right1.png"
import rocketGruntMaleUp1 from "../assets/rocket-grunt-male/up1.png"

const MAPSIZE = 900
const TICKTIMER = 10
const PLAYERSPRITE = "pokeGirl"
const NANITIME = 800
const BATTLEANIMATIONDURATION = 100

const BOUNDARYTHICCNESS = 20 /* MAPSIZE / 45 */
const MOVESPEED = 3 * MAPSIZE / 300
const STEPTIME = 200
const SPRITESIZE = MAPSIZE / 20
const AGGROWIDTH = SPRITESIZE / 4
const AGGRODISTANCE = MAPSIZE / 5

export default class OverworldContainer extends Component {

    loadedAt

    playerImages = {
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
        // {
        //     id: 1,
        //     width: MAPSIZE / 45,
        //     height: MAPSIZE / 4.5,
        //     x: MAPSIZE / 3,
        //     y: 0
        // },
        // {
        //     id: 2,
        //     width: MAPSIZE / 4.5,
        //     height: MAPSIZE / 15,
        //     x: 0,
        //     y: MAPSIZE / 2.5,
        // },
        // {
        //     id: 3,
        //     width: MAPSIZE / 4.5,
        //     height: MAPSIZE / 45,
        //     x: MAPSIZE / 3,
        //     y: 0
        // },
        // {
        //     id: 4,
        //     width: MAPSIZE / 4.5,
        //     height: MAPSIZE / 15,
        //     x: 0,
        //     y: -MAPSIZE / 2.5,
        // },
        // {
        //     id: 5,
        //     width: MAPSIZE / 45,
        //     height: MAPSIZE / 4.5,
        //     x: -MAPSIZE / 3,
        //     y: 0
        // },
        // {
        //     id: 6,
        //     width: MAPSIZE / 4.5,
        //     height: MAPSIZE / 45,
        //     x: -MAPSIZE / 3,
        //     y: 0
        // },
        // {
        //     id: 7,
        //     width: MAPSIZE / 45,
        //     height: MAPSIZE / 45,
        //     x: -MAPSIZE / 5,
        //     y: -MAPSIZE / 5
        // },
        {
            id: 8,
            width: MAPSIZE * 0.82,
            height: MAPSIZE / 45,
            x: MAPSIZE * 0.1,
            y: -MAPSIZE * 0.9
        },
        {
            id: 9,
            width: MAPSIZE / 8,
            height: MAPSIZE / 5,
            x: -MAPSIZE * 0.9,
            y: -MAPSIZE * 0.7
        },
        // maze start
        {
            id: 10,
            width: MAPSIZE / 40,
            height: MAPSIZE / 12,
            x: MAPSIZE * 0.7,
            y: MAPSIZE * 0.88
        },
        {
            id: 11,
            width: MAPSIZE / 6.05,
            height: MAPSIZE / 40,
            x: MAPSIZE * 0.56,
            y: MAPSIZE * 0.78
        },
        {
            id: 12,
            width: MAPSIZE / 40,
            height: MAPSIZE / 5,
            x: MAPSIZE * 0.85,
            y: MAPSIZE * 0.5
        },
        {
            id: 13,
            width: MAPSIZE / 40,
            height: MAPSIZE / 8,
            x: MAPSIZE * 0.66,
            y: MAPSIZE * 0.15
        },
        {
            id: 14,
            width: MAPSIZE / 40,
            height: MAPSIZE / 8,
            x: MAPSIZE * 0.85,
            y: MAPSIZE * -0.1
        },
        {
            id: 15,
            width: MAPSIZE / 10.5,
            height: MAPSIZE / 40,
            x: MAPSIZE * 0.73,
            y: MAPSIZE * 0
        },
        {
            id: 16,
            width: MAPSIZE / 11.7,
            height: MAPSIZE / 40,
            x: MAPSIZE * 0.91,
            y: MAPSIZE * -0.25
        },
        {
            id: 17,
            width: MAPSIZE / 5.12,
            height: MAPSIZE / 40,
            x: MAPSIZE * 0.52,
            y: MAPSIZE * -0.16
        },
        {
            id: 18,
            width: MAPSIZE / 40,
            height: MAPSIZE / 5,
            x: MAPSIZE * 0.35,
            y: MAPSIZE * 0.06
        },
        {
            id: 19,
            width: MAPSIZE / 4.66,
            height: MAPSIZE / 40,
            x: MAPSIZE * 0.61,
            y: MAPSIZE * 0.5
        },
        {
            id: 20,
            width: MAPSIZE / 10.5,
            height: MAPSIZE / 40,
            x: MAPSIZE * 0.23,
            y: MAPSIZE * 0.235
        },
        {
            id: 21,
            width: MAPSIZE / 40,
            height: MAPSIZE / 4,
            x: MAPSIZE * 0.16,
            y: MAPSIZE * 0.51
        },
        // spoopy
        {
            id: 22,
            width: MAPSIZE / 7.5,
            height: MAPSIZE / 40,
            x: MAPSIZE * 0.05,
            y: MAPSIZE * 0.78
        },
        {
            id: 23,
            width: MAPSIZE / 40,
            height: MAPSIZE / 6,
            x: MAPSIZE * -0.5,
            y: MAPSIZE * 0.8
        },
        {
            id: 24,
            width: MAPSIZE / 3,
            height: MAPSIZE / 40,
            x: MAPSIZE * -0.4,
            y: MAPSIZE * 0.61
        },
        {
            id: 25,
            width: MAPSIZE / 3.1,
            height: MAPSIZE / 40,
            x: MAPSIZE * -0.187,
            y: MAPSIZE * 0.4
        },
        {
            id: 26,
            width: MAPSIZE / 6.9,
            height: MAPSIZE / 40,
            x: MAPSIZE * -0.85,
            y: MAPSIZE * 0.4
        },
        {
            id: 27,
            width: MAPSIZE / 40,
            height: MAPSIZE / 10.5,
            x: MAPSIZE * -0.485,
            y: MAPSIZE * 0.28
        },
        {
            id: 28,
            width: MAPSIZE / 40,
            height: MAPSIZE / 10.5,
            x: MAPSIZE * -0.73,
            y: MAPSIZE * 0.08
        },
        {
            id: 29,
            width: MAPSIZE / 6.5,
            height: MAPSIZE / 40,
            x: MAPSIZE * -0.601,
            y: MAPSIZE * -0.04
        },
        {
            id: 30,
            width: MAPSIZE / 7.4,
            height: MAPSIZE / 40,
            x: MAPSIZE * -0.86,
            y: MAPSIZE * -0.22
        },
        {
            id: 31,
            width: MAPSIZE / 40,
            height: MAPSIZE / 3.7,
            x: MAPSIZE * -0.75,
            y: MAPSIZE * -0.64
        },
    ]

    // ideally these should load from database
    trainers = [
        // {
        //     id: 1,
        //     orientation: "up",
        //     sprite: rocketGruntMaleUp1,
        //     size: SPRITESIZE,
        //     x: MAPSIZE / 2.5,
        //     y: -MAPSIZE / 12.5,
        //     sightWidth: AGGROWIDTH,
        //     sightHeight: AGGRODISTANCE,
        // },
        // {
        //     id: 2,
        //     orientation: "right",
        //     sprite: rocketGruntMaleRight1,
        //     size: SPRITESIZE,
        //     x: MAPSIZE / 2.5,
        //     y: -MAPSIZE / -12.5,
        //     sightWidth: AGGRODISTANCE,
        //     sightHeight: AGGROWIDTH,
        // },
        // {
        //     id: 3,
        //     orientation: "left",
        //     sprite: rocketGruntMaleLeft1,
        //     size: SPRITESIZE,
        //     x: MAPSIZE / -2.5,
        //     y: -MAPSIZE / -12.5,
        //     sightWidth: AGGRODISTANCE,
        //     sightHeight: AGGROWIDTH,
        // },
        // {
        //     id: 4,
        //     orientation: "down",
        //     sprite: rocketGruntMaleDown1,
        //     size: SPRITESIZE,
        //     x: MAPSIZE / -3.75,
        //     y: -MAPSIZE / -12.5,
        //     sightWidth: AGGROWIDTH,
        //     sightHeight: AGGRODISTANCE,
        // },
    ]

    // I think it makes sense to do this map 1 time here rather than every 10ms in tick()
    obstacleCollisionMap = this.obstacles.map(obstacle => {
        return {
            minLeft: Math.floor(obstacle.x - obstacle.width - SPRITESIZE / 3),
            maxLeft: Math.floor(obstacle.x + obstacle.width + SPRITESIZE / 3),
            minTop: Math.floor(obstacle.y - obstacle.height - SPRITESIZE),
            maxTop: Math.floor(obstacle.y + obstacle.height)
        }
    })

    trainerCollisionMap = this.trainers.map(trainer => {
        return {
            minLeft: trainer.x - trainer.size - SPRITESIZE / 3,
            maxLeft: trainer.x + trainer.size + SPRITESIZE / 3,
            minTop: trainer.y - trainer.size - SPRITESIZE,
            maxTop: trainer.y + trainer.size
        }
    })

    lineOfSightCollisionMap = this.trainers.map(trainer => {
        switch(trainer.orientation) {
            case "up":
                return {
                    trainerId: trainer.id,
                    orientation: trainer.orientation,
                    minLeft: trainer.x - AGGROWIDTH,
                    maxLeft: trainer.x + AGGROWIDTH,
                    minTop: trainer.y - trainer.sightHeight * 2 - trainer.size * 2,
                    maxTop: trainer.y - trainer.size
                }
            case "left":
                return {
                    trainerId: trainer.id,
                    orientation: trainer.orientation,
                    minLeft: trainer.x - trainer.sightWidth * 2 - trainer.size * 2 + SPRITESIZE / 3,
                    maxLeft: trainer.x - trainer.size,
                    minTop: trainer.y - AGGROWIDTH,
                    maxTop: trainer.y + AGGROWIDTH,
                }
            case "right":
                return {
                    trainerId: trainer.id,
                    orientation: trainer.orientation,
                    minLeft: trainer.x + trainer.size,
                    maxLeft: trainer.x + trainer.sightWidth * 2 + trainer.size * 2 - SPRITESIZE / 3,
                    minTop: trainer.y - AGGROWIDTH,
                    maxTop: trainer.y + AGGROWIDTH
                }
            default:
                return {
                    trainerId: trainer.id,
                    orientation: trainer.orientation,
                    minLeft: trainer.x - AGGROWIDTH,
                    maxLeft: trainer.x + AGGROWIDTH,
                    minTop: trainer.y + trainer.size,
                    maxTop: trainer.y + trainer.sightHeight * 2 + trainer.size * 2
                }
        }
    })

    constructor() {
        super()
        this.state = {
            top: MAPSIZE * 0.773,
            left: MAPSIZE * 0.784,
            vertInertia: 0,
            horizInertia: 0,
            w: false,
            a: false,
            s: false,
            d: false,
            lastInput: "",
            lastInputHeld: false,
            currentSprite: pokeGirlUp1,
            isMoving: false,
            facing: "Up",
            timeOfLastDirectionChange: new Date(), // may be more efficient for this to follow tick() instead
            currentlyAggrodTrainer: null,
            nani: 0,
            battleCutsceneActive: false,
            trainerTop: 0,
            trainerLeft: 0,
            cutsceneDistanceX: 0,
            cutsceneDistanceY: 0,
            cutsceneDirection: null,
            enterBattleAnimation: 0,
            defeatedTrainers: []
        }
        this.loadedAt = new Date()
    }

    componentDidMount() {
        this.timerID = setInterval(      
            () => this.tick(),
            TICKTIMER   
        );
        // skip this if we are not coming from battle
        if(this.props.defeatedTrainers.length > 0) {
            // delete line of sight collision maps of defeated trainers
            this.lineOfSightCollisionMap = this.lineOfSightCollisionMap.filter(trainerAggro => !this.props.defeatedTrainers.includes(trainerAggro.trainerId))
            // load state from game container if returning from battle
            this.setState({
                top: this.props.top,
                left: this.props.left,
                facing: this.props.facing,
                defeatedTrainers: this.props.defeatedTrainers
            })
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }       

    tick = () => {
        let newTop = this.state.top
        let newLeft = this.state.left
        let newSprite = this.state.currentSprite
        let newIsMoving = this.state.isMoving
        let newFacing = this.state.facing
        let newCurrentlyAggrodTrainer = this.state.currentlyAggrodTrainer
        let newNani = this.state.nani
        let newCutsceneDistanceX = this.state.cutsceneDistanceX
        let newCutsceneDistanceY = this.state.cutsceneDistanceY
        let newCutsceneDirection = this.state.cutsceneDirection

        // battle animation
        if(this.state.enterBattleAnimation > 0) {
            // animate transition

            // reduce transition timer
            let newEnterBattleAnimation = this.state.enterBattleAnimation - TICKTIMER
            if(newEnterBattleAnimation > 0) {
                this.setState({
                    enterBattleAnimation: newEnterBattleAnimation
                })
            }
            else {
                // save overworld state? post request to store player location, which trainers have been fought etc?
                    // all overworld state will be cleared after battle with current configuration

                // swap to battle screen
                this.props.enterBattle(this.state.currentlyAggrodTrainer, this.state.top, this.state.left, this.state.facing, [...this.state.defeatedTrainers, this.state.currentlyAggrodTrainer])
            }
        }
        // battle cutscene
        else if(this.state.currentlyAggrodTrainer) {
            let newBattleCutsceneActive = this.state.battleCutsceneActive
            let newTrainerTop = this.state.trainerTop
            let newTrainerLeft = this.state.trainerLeft
            
            let newEnterBattleAnimation = this.state.enterBattleAnimation
            // wait some amount of time for nani animation
            if(newNani > 0) {
                newNani -= TICKTIMER
                if(newNani <= 0) {
                    newNani = 0
                    newBattleCutsceneActive = true
                    // change player to correct standing sprite -- 1 time
                    switch(this.state.cutsceneDirection) {
                        case "up":
                            newSprite = pokeGirlDown1
                            break;
                        case "down":
                            newSprite = pokeGirlUp1
                            break;
                        case "right":
                            newSprite = pokeGirlLeft1
                            break;
                        case "left":
                            newSprite = pokeGirlRight1
                            break;
                        default:
                            break;
                    }
                }
            }
            else if (this.state.battleCutsceneActive) {
                // move currentlyAggrodTrainer toward player
                switch(this.state.cutsceneDirection) {
                    case "right":
                        newTrainerLeft += MOVESPEED / 2
                        newCutsceneDistanceX -= MOVESPEED / 2
                        if(newCutsceneDistanceX <= 0) {
                            newCutsceneDistanceX = 0
                            newBattleCutsceneActive = false
                            newEnterBattleAnimation = BATTLEANIMATIONDURATION
                        }
                        break;
                    case "left":
                        newTrainerLeft -= MOVESPEED / 2
                        newCutsceneDistanceX += MOVESPEED / 2
                        if(newCutsceneDistanceX >= 0) {
                            newCutsceneDistanceX = 0
                            newBattleCutsceneActive = false
                            newEnterBattleAnimation = BATTLEANIMATIONDURATION
                        }
                        break;
                    case "up":
                        newTrainerTop -= MOVESPEED / 2
                        newCutsceneDistanceY += MOVESPEED / 2
                        if(newCutsceneDistanceY >= 0) {
                            newCutsceneDistanceY = 0
                            newBattleCutsceneActive = false
                            newEnterBattleAnimation = BATTLEANIMATIONDURATION
                        }
                        break;
                    case "down":
                        newTrainerTop += MOVESPEED / 2
                        newCutsceneDistanceY -= MOVESPEED / 2
                        if(newCutsceneDistanceY <= 0) {
                            newCutsceneDistanceY = 0
                            newBattleCutsceneActive = false
                            newEnterBattleAnimation = BATTLEANIMATIONDURATION
                        }
                        break;
                    default:
                        break;
                }
            } 
            this.setState({      
                top: newTop,
                left: newLeft,
                currentSprite: newSprite,
                facing: newFacing,
                isMoving: newIsMoving,
                currentlyAggrodTrainer: newCurrentlyAggrodTrainer,
                nani: newNani,
                battleCutsceneActive: newBattleCutsceneActive,
                trainerLeft: newTrainerLeft,
                trainerTop: newTrainerTop,
                cutsceneDistanceX: newCutsceneDistanceX,
                cutsceneDistanceY: newCutsceneDistanceY,
                cutsceneDirection: newCutsceneDirection,
                enterBattleAnimation: newEnterBattleAnimation
            });                
        }
        // normal movement
        else {
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
                    newSprite = this.playerImages[PLAYERSPRITE + this.state.facing + "1"]
                    newIsMoving = false
                }
            }

            // only do collision checks while moving - lowers idle load
            if(newIsMoving) {
                // aggro check
                let lineOfSightCollisionDetected  = this.lineOfSightCollisionMap.filter(obstacle => {
                    // head-on vertical collision -- wider vision
                    if((obstacle.orientation === "up" || obstacle.orientation === "down") && (newFacing === "Up" || newFacing === "Down")) {
                        return newLeft > obstacle.minLeft - SPRITESIZE && newLeft < obstacle.maxLeft && newTop > obstacle.minTop && newTop < obstacle.maxTop
                    }
                    // head-on horizontal collision -- wider vision
                    else if((obstacle.orientation === "left" || obstacle.orientation === "right") && (newFacing === "Left" || newFacing === "Right")) {
                        return newLeft > obstacle.minLeft && newLeft < obstacle.maxLeft && newTop > obstacle.minTop - SPRITESIZE && newTop < obstacle.maxTop
                    }
                    // perpendicular collision -- narrower vision
                    else {
                        return newLeft > obstacle.minLeft && newLeft < obstacle.maxLeft && newTop > obstacle.minTop && newTop < obstacle.maxTop
                    }
                })
                // aggro detected
                if(lineOfSightCollisionDetected.length > 0) {
                    // freeze controls
                    newNani = NANITIME
                    // aggro appropriate trainer
                        // send signal out to all trainers
                        // trainer with matching id will run nani animation
                    newCurrentlyAggrodTrainer = lineOfSightCollisionDetected[0].trainerId
                    // determine walk direction
                    newCutsceneDirection = lineOfSightCollisionDetected[0].orientation
                    // calculate walk distance
                    let trainerDiv = document.querySelector("#trainer-" + lineOfSightCollisionDetected[0].trainerId)
                    if(newCutsceneDirection === "up") {
                        newCutsceneDistanceY = this.state.top - trainerDiv.style.marginTop.slice(0, -2) + SPRITESIZE * 2
                    }
                    else if(newCutsceneDirection === "down") {
                        newCutsceneDistanceY = this.state.top - trainerDiv.style.marginTop.slice(0, -2) - SPRITESIZE * 2
                    }
                    else if(newCutsceneDirection === "right") {
                        newCutsceneDistanceX = this.state.left - trainerDiv.style.marginLeft.slice(0, -2) - SPRITESIZE * 1.5
                    }
                    else if(newCutsceneDirection === "left") {
                        newCutsceneDistanceX = this.state.left - trainerDiv.style.marginLeft.slice(0, -2) + SPRITESIZE * 1.5
                    }
                }

                // OOB check
                if(newTop > (MAPSIZE - BOUNDARYTHICCNESS - (SPRITESIZE * 1.4))) { newTop = (MAPSIZE - BOUNDARYTHICCNESS - (SPRITESIZE * 1.4)) }
                else if(newTop < -(MAPSIZE - BOUNDARYTHICCNESS)) { newTop = -(MAPSIZE - BOUNDARYTHICCNESS) }
                else if(newLeft > (MAPSIZE - BOUNDARYTHICCNESS)) { newLeft = (MAPSIZE - BOUNDARYTHICCNESS) }
                else if(newLeft < -(MAPSIZE - BOUNDARYTHICCNESS)) { newLeft = -(MAPSIZE - BOUNDARYTHICCNESS) }

                // collision check
                let obstacleCollisionDetected = this.obstacleCollisionMap.filter(obstacle => 
                    newLeft > obstacle.minLeft && newLeft < obstacle.maxLeft && newTop > obstacle.minTop && newTop < obstacle.maxTop
                )    
                let trainerCollisionDetected  = this.trainerCollisionMap.filter(obstacle => 
                    newLeft > obstacle.minLeft && newLeft < obstacle.maxLeft && newTop > obstacle.minTop && newTop < obstacle.maxTop
                )
                let collisionDetected = obstacleCollisionDetected.concat(trainerCollisionDetected)
                if(collisionDetected.length > 0) {
                    switch(newFacing) {
                        case "Up":
                            newTop = collisionDetected[collisionDetected.length - 1].maxTop
                            break;
                        case "Down":
                            newTop = collisionDetected[collisionDetected.length - 1].minTop
                            break;
                        case "Right":
                            newLeft = collisionDetected[collisionDetected.length - 1].minLeft
                            break;
                        case "Left":
                            newLeft = collisionDetected[collisionDetected.length - 1].maxLeft
                            break;
                        default:
                            break;
                    }
                }
            }
            this.setState({      
                top: newTop,
                left: newLeft,
                currentSprite: newSprite,
                facing: newFacing,
                isMoving: newIsMoving,
                currentlyAggrodTrainer: newCurrentlyAggrodTrainer,
                nani: newNani,
                cutsceneDistanceX: newCutsceneDistanceX,
                cutsceneDistanceY: newCutsceneDistanceY,
                cutsceneDirection: newCutsceneDirection
            }); 
        }
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

    freeze = (e) => {
        // movement ends
        this.setState({
            w: false,
            a: false,
            s: false,
            d: false,
            lastInputHeld: false,
        })
    }

    render() {
        return (
            <div id="overworld-container">
                <div className="playable-area"
                    onKeyDown={this.moveSprite}
                    onKeyUp={this.stopSprite}
                    tabIndex="0"
                    onBlur={this.freeze}
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
                        width={MAPSIZE + "px"}
                        height={BOUNDARYTHICCNESS + "px"}
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
                        bottom={BOUNDARYTHICCNESS + "px"}
                    />

                    {/* Obstacles */}
                    {this.obstacles.map(obstacle => 
                        <Obstacle
                            key={obstacle.id}
                            id={obstacle.id}
                            width={obstacle.width + "px"}
                            height={obstacle.height + "px"}
                            x={obstacle.x + "px"}
                            y={obstacle.y + "px"}
                        />
                    )}

                    {/* Trainers */}
                    {this.trainers.map(trainer => 
                        <Trainer
                            key={trainer.id}
                            id={trainer.id}
                            orientation={trainer.orientation}
                            sprite={trainer.sprite}
                            size={trainer.size}
                            x={trainer.x}
                            y={trainer.y}
                            sightWidth={trainer.sightWidth}
                            sightHeight={trainer.sightHeight}
                            aggro={this.state.currentlyAggrodTrainer}
                            nani={this.state.nani}
                            top={this.state.trainerTop}
                            left={this.state.trainerLeft}
                            volunteer={this.iVolunteerAsTribute}
                            battleCutsceneActive={this.state.battleCutsceneActive}
                            playerTop={this.state.top}
                            playerLeft={this.state.left}
                        />
                    )}

                    {/* Player */}
                    <PlayerSprite 
                        top={this.state.top} 
                        left={this.state.left}
                        sprite={this.state.currentSprite}
                        size={SPRITESIZE}
                    />
                </div>
            </div>
        )
    }
}