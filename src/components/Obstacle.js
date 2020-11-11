import React from 'react';

const Obstacle = (props) => {
    let className = "obstacle " + props.orientation + "-obstacle "
    return <div className={className} id={"obstacle-"+props.id} style={{
        width: props.width,
        height: props.height,
        marginTop: props.y,
        marginLeft: props.x
    }}></div>
}

export default Obstacle