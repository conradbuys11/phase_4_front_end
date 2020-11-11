// if game included more than 1 area this would be imported from area database

const MAPSIZE = 900

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
    {
        id: 22,
        width: MAPSIZE / 7.4, // change to 7.5 for spoopy
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
        width: MAPSIZE / 6.76,
        height: MAPSIZE / 40,
        x: MAPSIZE * -0.6075,
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
    {
        id: 32,
        width: MAPSIZE / 40,
        height: MAPSIZE / 4.25,
        x: MAPSIZE * -0.485,
        y: MAPSIZE * -0.3
    },
    {
        id: 33,
        width: MAPSIZE / 40,
        height: MAPSIZE / 12.25,
        x: MAPSIZE * -0.485,
        y: MAPSIZE * -0.715
    },
    {
        id: 34,
        width: MAPSIZE / 7.4,
        height: MAPSIZE / 40,
        x: MAPSIZE * -0.325,
        y: MAPSIZE * -0.7715
    },
    {
        id: 35,
        width: MAPSIZE / 40,
        height: MAPSIZE / 9,
        x: MAPSIZE * -0.165,
        y: MAPSIZE * -0.685
    },
    {
        id: 36,
        width: MAPSIZE / 3,
        height: MAPSIZE / 40,
        x: MAPSIZE * 0.144,
        y: MAPSIZE * -0.55
    },
    {
        id: 37,
        width: MAPSIZE / 40,
        height: MAPSIZE / 4.5,
        x: MAPSIZE * 0.5,
        y: MAPSIZE * -0.55
    },
    {
        id: 38,
        width: MAPSIZE / 6.76,
        height: MAPSIZE / 40,
        x: MAPSIZE * 0.33,
        y: MAPSIZE * -0.353
    },
    {
        id: 39,
        width: MAPSIZE / 6.76,
        height: MAPSIZE / 40,
        x: MAPSIZE * 0.33,
        y: MAPSIZE * -0.747
    },
    {
        id: 40,
        width: MAPSIZE / 40,
        height: MAPSIZE / 12,
        x: MAPSIZE * 0.01,
        y: MAPSIZE * -0.8
    },
    {
        id: 41,
        width: MAPSIZE / 40,
        height: MAPSIZE / 12,
        x: MAPSIZE * 0.68,
        y: MAPSIZE * -0.8
    },
    {
        id: 42,
        width: MAPSIZE / 5.7,
        height: MAPSIZE / 40,
        x: MAPSIZE * 0.7,
        y: MAPSIZE * -0.55
    },
    {
        id: 43,
        width: MAPSIZE / 40,
        height: MAPSIZE / 12,
        x: MAPSIZE * 0.85,
        y: MAPSIZE * -0.66
    },
    {
        id: 45,
        width: MAPSIZE / 40,
        height: MAPSIZE / 5.6,
        x: MAPSIZE * 0,
        y: MAPSIZE * -0.2
    },
    {
        id: 46,
        width: MAPSIZE / 40,
        height: MAPSIZE / 5.6,
        x: MAPSIZE * -0.25,
        y: MAPSIZE * -0.2
    },
]

export default obstacles;