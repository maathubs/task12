import React from 'react';
const Rolldice=(props)=> {
    return(
        <div className="rollDice">
            <button className={props.className} onClick={props.onClick}>RollDice</button>
            <p>Move={props.move}</p>
        </div>
    )
}
export default Rolldice