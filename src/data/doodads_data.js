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
        id: 14,
        image: "bush1-vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 8,
        x: MAPSIZE * 0.85,
        y: MAPSIZE * -0.1
    },
    {
        id: 15,
        image: "log1",
        width: MAPSIZE / 14,
        height: MAZEWIDTH,
        x: MAPSIZE * 0.76,
        y: MAPSIZE * 0
    },
    {
        id: 16,
        image: "tree1",
        width: MAPSIZE / 11.7,
        height: MAPSIZE / 7,
        x: MAPSIZE * 0.91,
        y: MAPSIZE * -0.31
    },
    {
        id: 17,
        image: "tile1",
        width: MAPSIZE / 5.12,
        height: MAZEWIDTH,
        x: MAPSIZE * 0.52,
        y: MAPSIZE * -0.16
    },
    {
        id: 18,
        image: "bush1-vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 5,
        x: MAPSIZE * 0.35,
        y: MAPSIZE * 0.06
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
        id: 191,
        image: "flowers1-horizontal",
        width: MAPSIZE / 7,
        height: MAZEWIDTH,
        x: MAPSIZE * 0.68,
        y: MAPSIZE * 0.5
    },
    {
        id: 20,
        image: "tile1",
        width: MAPSIZE / 10.5,
        height: MAZEWIDTH,
        x: MAPSIZE * 0.23,
        y: MAPSIZE * 0.235
    },
    {
        id: 21,
        image: "bush1-vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 4,
        x: MAPSIZE * 0.16,
        y: MAPSIZE * 0.51
    },
    {
        id: 22,
        image: "tile1",
        width: MAPSIZE / 7.4,
        height: MAZEWIDTH,
        x: MAPSIZE * 0.05,
        y: MAPSIZE * 0.78
    },
    {
        id: 23,
        image: "bush1-vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 6,
        x: MAPSIZE * -0.5,
        y: MAPSIZE * 0.8
    },
    {
        id: 24,
        image: "tile1",
        width: MAPSIZE / 3,
        height: MAZEWIDTH,
        x: MAPSIZE * -0.4,
        y: MAPSIZE * 0.61
    },
    {
        id: 25,
        image: "tile1",
        width: MAPSIZE / 3.1,
        height: MAPSIZE / 40,
        x: MAPSIZE * -0.187,
        y: MAPSIZE * 0.4
    },
    {
        id: 26,
        image: "tile1",
        width: MAPSIZE / 6.9,
        height: MAZEWIDTH,
        x: MAPSIZE * -0.85,
        y: MAPSIZE * 0.4
    },
    {
        id: 27,
        image: "bush1-vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 10.5,
        x: MAPSIZE * -0.485,
        y: MAPSIZE * 0.28
    },
    {
        id: 28,
        image: "bush1-vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 10.5,
        x: MAPSIZE * -0.73,
        y: MAPSIZE * 0.08
    },
    {
        id: 29,
        image: "tile1",
        width: MAPSIZE / 6.76,
        height: MAZEWIDTH,
        x: MAPSIZE * -0.6075,
        y: MAPSIZE * -0.04
    },
    {
        id: 30,
        image: "tile1",
        width: MAPSIZE / 7.4,
        height: MAZEWIDTH,
        x: MAPSIZE * -0.86,
        y: MAPSIZE * -0.22
    },
    {
        id: 31,
        image: "bush1-vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 3.7,
        x: MAPSIZE * -0.75,
        y: MAPSIZE * -0.64
    },
    {
        id: 32,
        image: "bush1-vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 4.25,
        x: MAPSIZE * -0.485,
        y: MAPSIZE * -0.3
    },
    {
        id: 33,
        image: "bush1-vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 12.25,
        x: MAPSIZE * -0.485,
        y: MAPSIZE * -0.715
    },
    {
        id: 34,
        image: "tile1",
        width: MAPSIZE / 7.4,
        height: MAZEWIDTH,
        x: MAPSIZE * -0.325,
        y: MAPSIZE * -0.7715
    },
    {
        id: 35,
        image: "bush1-vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 9,
        x: MAPSIZE * -0.165,
        y: MAPSIZE * -0.685
    },
    {
        id: 36,
        image: "tile1",
        width: MAPSIZE / 3,
        height: MAZEWIDTH,
        x: MAPSIZE * 0.144,
        y: MAPSIZE * -0.55
    },
    {
        id: 37,
        image: "bush1-vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 4.5,
        x: MAPSIZE * 0.5,
        y: MAPSIZE * -0.55
    },
    {
        id: 38,
        image: "tile1",
        width: MAPSIZE / 6.76,
        height: MAZEWIDTH,
        x: MAPSIZE * 0.33,
        y: MAPSIZE * -0.353
    },
    {
        id: 39,
        image: "tile1",
        width: MAPSIZE / 6.76,
        height: MAZEWIDTH,
        x: MAPSIZE * 0.33,
        y: MAPSIZE * -0.747
    },
    {
        id: 40,
        image: "bush1-vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 12,
        x: MAPSIZE * 0.01,
        y: MAPSIZE * -0.8
    },
    {
        id: 41,
        image: "bush1-vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 12,
        x: MAPSIZE * 0.68,
        y: MAPSIZE * -0.8
    },
    {
        id: 42,
        image: "tile1",
        width: MAPSIZE / 5.7,
        height: MAZEWIDTH,
        x: MAPSIZE * 0.7,
        y: MAPSIZE * -0.55
    },
    {
        id: 43,
        image: "bush1-vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 12,
        x: MAPSIZE * 0.85,
        y: MAPSIZE * -0.66
    },
    {
        id: 45,
        image: "bush1-vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 5.6,
        x: MAPSIZE * 0,
        y: MAPSIZE * -0.2
    },
    {
        id: 46,
        image: "bush1-vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 5.6,
        x: MAPSIZE * -0.25,
        y: MAPSIZE * -0.2
    },
   
]

export default doodads;