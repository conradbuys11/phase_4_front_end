import rocketGruntMaleDown1 from "../assets/rocket-grunt-male/down1.png"
import rocketGruntMaleLeft1 from "../assets/rocket-grunt-male/left1.png"
import rocketGruntMaleRight1 from "../assets/rocket-grunt-male/right1.png"
import rocketGruntMaleUp1 from "../assets/rocket-grunt-male/up1.png"

import giovanniDown1 from "../assets/giovanni/down1.png"

const MAPSIZE = 900

const SPRITESIZE = MAPSIZE / 20
const AGGROWIDTH = SPRITESIZE / 4
const AGGRODISTANCE = MAPSIZE / 5

// ideally these should load from database
const trainers = [
    {
        id: 8,
        orientation: "down",
        sprite: giovanniDown1,
        size: SPRITESIZE,
        x: MAPSIZE * -0.895,
        y: MAPSIZE * -0.57,
        sightWidth: AGGROWIDTH,
        sightHeight: MAPSIZE * 0,
    },
    {
        id: 2,
        orientation: "down",
        sprite: rocketGruntMaleDown1,
        size: SPRITESIZE,
        x: MAPSIZE * 0.93,
        y: MAPSIZE * -0.15,
        sightWidth: AGGROWIDTH,
        sightHeight: AGGRODISTANCE,
    },
    {
        id: 3,
        orientation: "left",
        sprite: rocketGruntMaleLeft1,
        size: SPRITESIZE,
        x: MAPSIZE * 0.6,
        y: MAPSIZE * 0.87,
        sightWidth: AGGRODISTANCE,
        sightHeight: AGGROWIDTH,
    },
    {
        id: 4,
        orientation: "down",
        sprite: rocketGruntMaleDown1,
        size: SPRITESIZE,
        x: MAPSIZE * 0.42,
        y: MAPSIZE * -0.03,
        sightWidth: AGGROWIDTH,
        sightHeight: AGGRODISTANCE,
    },
    {
        id: 5,
        orientation: "right",
        sprite: rocketGruntMaleRight1,
        size: SPRITESIZE,
        x: MAPSIZE * -0.95,
        y: MAPSIZE * -0.13,
        sightWidth: AGGRODISTANCE * 0.9,
        sightHeight: AGGROWIDTH,
    },
    {
        id: 6,
        orientation: "right",
        sprite: rocketGruntMaleRight1,
        size: SPRITESIZE,
        x: MAPSIZE * -0.95,
        y: MAPSIZE * 0.48,
        sightWidth: AGGRODISTANCE * 0.9,
        sightHeight: AGGROWIDTH,
    },
    {
        id: 7,
        orientation: "down",
        sprite: rocketGruntMaleDown1,
        size: SPRITESIZE,
        x: MAPSIZE * -0.42,
        y: MAPSIZE * -0.7,
        sightWidth: AGGROWIDTH,
        sightHeight: AGGRODISTANCE / 5,
    },
    {
        id: 1,
        orientation: "left",
        sprite: rocketGruntMaleLeft1,
        size: SPRITESIZE,
        x: MAPSIZE * 0.4,
        y: MAPSIZE * -0.45,
        sightWidth: AGGRODISTANCE * 0.9,
        sightHeight: AGGROWIDTH,
    },
    {
        id: 9,
        orientation: "left",
        sprite: rocketGruntMaleLeft1,
        size: SPRITESIZE,
        x: MAPSIZE * 0.4,
        y: MAPSIZE * -0.65,
        sightWidth: AGGRODISTANCE * 0.9,
        sightHeight: AGGROWIDTH,
    },
    {
        id: 10,
        orientation: "up",
        sprite: rocketGruntMaleUp1,
        size: SPRITESIZE,
        x: MAPSIZE * 0.07,
        y: MAPSIZE * 0.3,
        sightWidth: AGGROWIDTH,
        sightHeight: AGGRODISTANCE * 0.6,
    },
]

export default trainers;