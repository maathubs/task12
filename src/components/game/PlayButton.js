import React from 'react';
const PlayButton=(props)=> {
    // const { data } = props;
	// let styles = Helper.generateSnakeStyle( data );
    return(
            <button type={props.type} style={props.style} className={props.className}></button>
    )
}
export default PlayButton