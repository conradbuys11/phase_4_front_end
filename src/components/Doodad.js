import React from 'react';

const Doodad = (props) => {
    let className = "doodad " + props.image + "-doodad"
    return <div 
        className={className}
        id={"doodad-"+props.id}
        style={{
            width: props.width,
            height: props.height,
            marginTop: props.y,
            marginLeft: props.x
        }}
    />
}

export default Doodad