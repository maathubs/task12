import React, { Component } from 'react';
// import FontAwesomeIcon from "@fortawesome/react-fontawesome"
// import * as Icons from "@fortawesome/fontawesome-free-solid"
import Square from './Square';
import Rolldice from './Rolldice';
import Button from './Button';
import './Home.css';
import NextRow from './NextRow';
import {ladders, snakes} from './Helpers/Helper'
// import { StyleSheet, Text, View} from 'react-native';
import Ladder from './components/game/Ladder';
import Snake from './components/game/Snake';
class Home extends Component {
  state = {
    start: "",
    value: 0
  }
  repeat = () => {
    const arr = [];
    var rowCount = 0;
    var beginTileNumber = 100;
    var subtract = true;
    const tile_styles = [ 'yellow', 'white', 'red', 'blue', 'green', 'white', 'red', 'yellow', 'green', 'blue' ];
    for (var tileNumber = beginTileNumber; tileNumber !== 0;) {

      rowCount++;
      if (rowCount <= 10) {
        let tileData = {
          style: { backgroundColor: tile_styles[Math.floor((Math.random() * 10))] },
          tileNumber: tileNumber
        }
        arr.push(<Square key={ tileData.tileNumber } data={tileData} />);
      } else {
        rowCount = 0;
        subtract = !subtract;
        tileNumber = tileNumber - 10;
        arr.push(<NextRow />);
      }
      if (subtract)
        tileNumber--;
      else
        tileNumber++;
    }
    return arr;
  }
  rollDice = () => {
    const max = 6;
    const roll = Math.ceil(Math.random() * max);
    console.log("roll=>", roll);
    if (roll === 1) {
      this.setState({
        start: true,
        value: roll
      });
    }
    else {
      this.setState({
        value: roll
      })
    }
  }
  // Canot provide inline styling for the moving round button.then according to the number in the dice we can decide the movements.
  // const styles=StyleSheet.create({
  //   buttonStyle:{
  //     border-radius:"50%"
  //     width: "50px"
  //     height: "50px"
  //     border: "1px solid blue"
  //   }
  // });
  render() {

    return (
      <div>
        <div className="squareContainer">{
          // load tiles
          this.repeat()
          
          //load snakes

        }
        { props.ladders_size > 0 && props.start &&
					<Ladder />
				}
        { props.snakes_size > 0 && props.start &&
					<Snake />
				}

        </div>
        <div>
          <Rolldice className="rollDice" value={this.state.value} onClick={this.rollDice} />
          {this.state.start ? <Button style={divStyle} className="roundButton" /> : null}
        </div>
      </div>
    )
  }
}
export default Home;
const divStyle = {
  color: 'blue'
  // backgroundImage: 'url(' + imgUrl + ')',
};













