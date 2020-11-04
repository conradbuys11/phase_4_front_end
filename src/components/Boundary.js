import React, { Component } from 'react';

const Boundary = (props) => {
    let className = props.orientation + "-boundary " + props.location + "-boundary" 
    return <div className={className}></div>
}

export default Boundary