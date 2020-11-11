const MAPSIZE = 900
const MAZEWIDTH = MAPSIZE / 40

const doodads = [
    {
        id: 10,
        image: "smoltree1",
        width: MAPSIZE * 0.035,
        height: MAPSIZE * 0.08,
        x: MAPSIZE * 0.7,
        y: MAPSIZE * 0.88
    },
    {
        id: 11,
        image: "smoltree1-hedge",
        width: MAPSIZE / 6.05,
        height: MAPSIZE / 10,
        x: MAPSIZE * 0.56,
        y: MAPSIZE * 0.78 + MAZEWIDTH
    },
    {
        id: 12,
        image: "shrubbery1-vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 5,
        x: MAPSIZE * 0.85,
        y: MAPSIZE * 0.5
    },
    {
        id: 191,
        image: "flowers1-horizontal",
        width: MAPSIZE / 7,
        height: MAZEWIDTH,
        x: MAPSIZE * 0.68,
        y: MAPSIZE * 0.5
    },
    {
        id: 19,
        image: "log1",
        width: MAPSIZE / 15,
        height: MAZEWIDTH,
        x: MAPSIZE * 0.47,
        y: MAPSIZE * 0.5
    },
    {
        id: 13,
        image: "pedestal1",
        width: MAZEWIDTH,
        height: MAPSIZE / 12,
        x: MAPSIZE * 0.66,
        y: MAPSIZE * 0.2
    },
    {
        id: 131,
        image: "bush1-vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 14,
        x: MAPSIZE * 0.66,
        y: MAPSIZE * 0.05
    },
    {
        id: 15,
        image: "log1",
        width: MAPSIZE / 14,
        height: MAZEWIDTH,
        x: MAPSIZE * 0.76,
        y: MAPSIZE * 0
    },
   
]

export default doodads;