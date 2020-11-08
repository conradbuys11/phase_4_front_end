import React from 'react';

const Obstacle = (props) => {
    let className = "obstacle "
    return <div className={className} style={{
        width: props.width,
        height: props.height,
        marginTop: props.y,
        marginLeft: props.x
    }}></div>
}

export default Obstacle