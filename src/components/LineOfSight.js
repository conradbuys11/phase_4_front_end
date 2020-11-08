import React from 'react';

const LineOfSight = (props) => {

    let className = "line-of-sight "

    const position = () => {
        switch(props.orientation) {
            case "up":
                return [0, -props.height - props.size]
            case "right":
                return [props.width + props.size, 0]
            default:
                return [0, 0]
        }
    }

    return <div className={className} style={{
        width: props.width,
        height: props.height,
        marginTop: position()[1],
        marginLeft: position()[0]
    }}></div>
}

export default LineOfSight