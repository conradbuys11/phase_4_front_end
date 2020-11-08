import React from 'react';

const Boundary = (props) => {
    let className = "boundary " + props.orientation + "-boundary " + props.location + "-boundary" 
    return <div
                className={className}
                style={{
                    height: props.height,
                    width: props.width
                }}
            >
                {props.timer}
            </div>
}

export default Boundary