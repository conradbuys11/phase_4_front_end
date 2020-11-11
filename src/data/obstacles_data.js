// if game included more than 1 area this would be imported from area database

const MAPSIZE = 900
const MAZEWIDTH = MAPSIZE / 40

const obstacles = [
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
    {
        id: 31,
        orientation: "vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 3.7,
        x: MAPSIZE * -0.75,
        y: MAPSIZE * -0.64
    },
    // giovanni's bushes
    {
        id: 6,
        width: MAPSIZE * 0.04,
        height: MAPSIZE * 0.04,
        x: MAPSIZE * -0.97,
        y: MAPSIZE * -0.5
    },
    {
        id: 7,
        width: MAPSIZE * 0.04,
        height: MAPSIZE * 0.04,
        x: MAPSIZE * -0.82,
        y: MAPSIZE * -0.5
    },
    // top hedge row
    {
        id: 8,
        width: MAPSIZE * 0.82,
        height: MAPSIZE / 45,
        x: MAPSIZE * 0.1,
        y: -MAPSIZE * 0.9
    },
    // giovanni's tree
    {
        id: 9,
        width: MAPSIZE / 8,
        height: MAPSIZE / 5,
        x: -MAPSIZE * 0.895,
        y: -MAPSIZE * 0.7
    },
    // maze start
    {
        id: 10,
        orientation: "vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 12,
        x: MAPSIZE * 0.7,
        y: MAPSIZE * 0.88
    },
    {
        id: 11,
        orientation: "horizontal",
        width: MAPSIZE / 6.05,
        height: MAZEWIDTH,
        x: MAPSIZE * 0.56,
        y: MAPSIZE * 0.78
    },
    {
        id: 12,
        orientation: "vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 5,
        x: MAPSIZE * 0.85,
        y: MAPSIZE * 0.5
    },
    {
        id: 13,
        orientation: "vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 8,
        x: MAPSIZE * 0.66,
        y: MAPSIZE * 0.15
    },
    {
        id: 14,
        orientation: "vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 8,
        x: MAPSIZE * 0.85,
        y: MAPSIZE * -0.1
    },
    {
        id: 15,
        orientation: "horizontal",
        width: MAPSIZE / 10.5,
        height: MAZEWIDTH,
        x: MAPSIZE * 0.73,
        y: MAPSIZE * 0
    },
    {
        id: 16,
        orientation: "horizontal",
        width: MAPSIZE / 11.7,
        height: MAZEWIDTH,
        x: MAPSIZE * 0.91,
        y: MAPSIZE * -0.25
    },
    {
        id: 17,
        orientation: "horizontal",
        width: MAPSIZE / 5.12,
        height: MAZEWIDTH,
        x: MAPSIZE * 0.52,
        y: MAPSIZE * -0.16
    },
    {
        id: 18,
        orientation: "vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 5,
        x: MAPSIZE * 0.35,
        y: MAPSIZE * 0.06
    },
    {
        id: 19,
        orientation: "horizontal",
        width: MAPSIZE / 4.66,
        height: MAZEWIDTH,
        x: MAPSIZE * 0.61,
        y: MAPSIZE * 0.5
    },
    {
        id: 20,
        orientation: "horizontal",
        width: MAPSIZE / 10.5,
        height: MAZEWIDTH,
        x: MAPSIZE * 0.23,
        y: MAPSIZE * 0.235
    },
    {
        id: 21,
        orientation: "vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 4,
        x: MAPSIZE * 0.16,
        y: MAPSIZE * 0.51
    },
    {
        id: 22,
        orientation: "horizontal",
        width: MAPSIZE / 7.4, // change to 7.5 for spoopy
        height: MAZEWIDTH,
        x: MAPSIZE * 0.05,
        y: MAPSIZE * 0.78
    },
    {
        id: 23,
        orientation: "vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 6,
        x: MAPSIZE * -0.5,
        y: MAPSIZE * 0.8
    },
    {
        id: 24,
        orientation: "horizontal",
        width: MAPSIZE / 3,
        height: MAZEWIDTH,
        x: MAPSIZE * -0.4,
        y: MAPSIZE * 0.61
    },
    {
        id: 25,
        orientation: "horizontal",
        width: MAPSIZE / 3.1,
        height: MAPSIZE / 40,
        x: MAPSIZE * -0.187,
        y: MAPSIZE * 0.4
    },
    {
        id: 26,
        orientation: "horizontal",
        width: MAPSIZE / 6.9,
        height: MAZEWIDTH,
        x: MAPSIZE * -0.85,
        y: MAPSIZE * 0.4
    },
    {
        id: 27,
        orientation: "vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 10.5,
        x: MAPSIZE * -0.485,
        y: MAPSIZE * 0.28
    },
    {
        id: 28,
        orientation: "vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 10.5,
        x: MAPSIZE * -0.73,
        y: MAPSIZE * 0.08
    },
    {
        id: 29,
        orientation: "horizontal",
        width: MAPSIZE / 6.76,
        height: MAZEWIDTH,
        x: MAPSIZE * -0.6075,
        y: MAPSIZE * -0.04
    },
    {
        id: 30,
        orientation: "horizontal",
        width: MAPSIZE / 7.4,
        height: MAZEWIDTH,
        x: MAPSIZE * -0.86,
        y: MAPSIZE * -0.22
    },
    {
        id: 32,
        orientation: "vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 4.25,
        x: MAPSIZE * -0.485,
        y: MAPSIZE * -0.3
    },
    {
        id: 33,
        orientation: "vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 12.25,
        x: MAPSIZE * -0.485,
        y: MAPSIZE * -0.715
    },
    {
        id: 34,
        orientation: "horizontal",
        width: MAPSIZE / 7.4,
        height: MAZEWIDTH,
        x: MAPSIZE * -0.325,
        y: MAPSIZE * -0.7715
    },
    {
        id: 35,
        orientation: "vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 9,
        x: MAPSIZE * -0.165,
        y: MAPSIZE * -0.685
    },
    {
        id: 36,
        orientation: "horizontal",
        width: MAPSIZE / 3,
        height: MAZEWIDTH,
        x: MAPSIZE * 0.144,
        y: MAPSIZE * -0.55
    },
    {
        id: 37,
        orientation: "vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 4.5,
        x: MAPSIZE * 0.5,
        y: MAPSIZE * -0.55
    },
    {
        id: 38,
        orientation: "horizontal",
        width: MAPSIZE / 6.76,
        height: MAZEWIDTH,
        x: MAPSIZE * 0.33,
        y: MAPSIZE * -0.353
    },
    {
        id: 39,
        orientation: "horizontal",
        width: MAPSIZE / 6.76,
        height: MAZEWIDTH,
        x: MAPSIZE * 0.33,
        y: MAPSIZE * -0.747
    },
    {
        id: 40,
        orientation: "vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 12,
        x: MAPSIZE * 0.01,
        y: MAPSIZE * -0.8
    },
    {
        id: 41,
        orientation: "vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 12,
        x: MAPSIZE * 0.68,
        y: MAPSIZE * -0.8
    },
    {
        id: 42,
        orientation: "horizontal",
        width: MAPSIZE / 5.7,
        height: MAZEWIDTH,
        x: MAPSIZE * 0.7,
        y: MAPSIZE * -0.55
    },
    {
        id: 43,
        orientation: "vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 12,
        x: MAPSIZE * 0.85,
        y: MAPSIZE * -0.66
    },
    {
        id: 45,
        orientation: "vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 5.6,
        x: MAPSIZE * 0,
        y: MAPSIZE * -0.2
    },
    {
        id: 46,
        orientation: "vertical",
        width: MAZEWIDTH,
        height: MAPSIZE / 5.6,
        x: MAPSIZE * -0.25,
        y: MAPSIZE * -0.2
    },
]

export default obstacles;