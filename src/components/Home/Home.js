import React, { Component } from 'react';
// import FontAwesomeIcon from "@fortawesome/react-fontawesome"
// import * as Icons from "@fortawesome/fontawesome-free-solid"
// import Square from '../Square/Square';
import Rolldice from '../Rolldice';
import PlayButton from '../game/PlayButton';
import './Home.css';
// import NextRow from '../NextRow';
// import { StyleSheet, Text, View} from 'react-native';
import LadderContainer from '../game/LadderContainer';
import SnakeContainer from '../game/SnakeContainer'; 
import Game from '../game/Game';
// import Player from '../game/Player';
import *  as Helper from '../../Helpers/Helper';
import Ladder from '../game/Ladder';

class Home extends Component {
  
  state = {
    move: 0,
    start: "",
    value: 1,
    tiles: [],
    style:{
    top:0,
    bottom:0,
    left:0,
    right:0
    },
    snake:true,
    ladder:true,
    test:true

  }
  
  componentWillMount() {
    const arr = [];
    var rowCount = 0;
    var beginTileNumber = 100;
    var subtract = true;
    for (var tileNumber = beginTileNumber; tileNumber !== 0;) {
      const tile_styles = ['yellow', 'white', 'red', 'blue', 'green', 'white', 'red', 'yellow', 'green', 'blue'];
      let random = Math.floor((Math.random() * 10));
      rowCount++;
      if (rowCount <= 10) {
        //randomly gets the tile color
        let tileData = {
          style: { backgroundColor: tile_styles[random] },
          tileNumber: tileNumber
        }
        // console.log('tile created')
        arr.push(tileData);
      } else {
        rowCount = 0;
        subtract = !subtract;
        tileNumber = (tileNumber - 10);
      }
      if (subtract)
        tileNumber--;
      else
        tileNumber++;
    }
    
    // console.log('tiles created in willmount function : ', arr)
    this.setState({
      start: "",
      value: 1,
      tiles: arr
    });
  }

  componentDidMount() {
    this.setState(this.state)
  }

  displayLadders = () => {
    if(this.state.tiles && this.state.tiles.length > 0 && document.getElementById('tile_100')) {
      return <LadderContainer ladders={Helper.ladders}/>
    }
    return null;
  }
  displaySnakes = () => {
    if(this.state.tiles && this.state.tiles.length > 0 && document.getElementById('tile_100')) {
      return <SnakeContainer snakes={Helper.snakes}/>
    }
    return null;
  }
  
  rollDice = () => {
    console.log("color",document.getElementById("tile_100").style.backgroundColor)
    const max = 6;
    const roll = Math.ceil(Math.random() * max);
    console.log("roll=>", roll);
    let topStyle;
    // this.findLadder();
    // let value=0;
   console.log("this.state.start::",this.state.start)
    // if(this.state.start){
    //   this.setState({
    //     value:parseInt(roll+this.state.value)
    //   })
    // }
    console.log("VALUE;;;",roll+this.state.value)
    {this.state.ladder&&this.state.start&&this.state.value>=100?topStyle=document.getElementById("tile_100").getBoundingClientRect():
    (this.state.ladder&&this.state.start?topStyle=document.getElementById(`tile_${roll+this.state.value}`).getBoundingClientRect():
    this.state.start? topStyle=document.getElementById(`tile_${roll+this.state.value}`).getBoundingClientRect():
     topStyle=document.getElementById(`tile_${roll}`).getBoundingClientRect())}
    // let topStyleIn=topStyle.top;
    // console.log("style====>",topStyle)
    // console.log("styleTop====>",topStyle.top)
    // console.log("styleBottom====>",topStyle.bottom)
    // console.log("styleLeft====>",topStyle.left)
    // console.log("styleRight====>",topStyle.right)
    if (roll === 1) {
      // this.setState(this.state);
      console.log("!!!!!!1!!!!!=",roll)
      this.setState({
        move:roll,
        value:parseInt(roll),
        start:true,
        style:{
        top:topStyle.top,
        left:topStyle.left,
        bottom:topStyle.bottom,
        right:topStyle.right
        }
      })
    }
    else {
      this.setState({
        move:roll,
        // value:parseInt(roll+this.state.value),
        style:{
        top:topStyle.top,
        left:topStyle.left,
        bottom:topStyle.bottom,
        right:topStyle.right
        }
      })
    
    }
    if(this.state.start){
      this.setState({
        value:parseInt(roll+this.state.value)
      })
    }
    
      let ladders=Helper.ladders;
      console.log(ladders)
      let calc;
      
      console.log("this.state.value",this.state.value+roll)
      console.log("this.state.move",this.state.move)
      {this.state.start?calc=(this.state.value+roll):calc=0}
      console.log("findladder this.state.value",calc)
      ladders.map( ladder => {
    
        if(this.state.start&&ladder.from==calc){
          this.setState({
            ladder:true,
            to:ladder.to,
            value:ladder.to
          })
          console.log("calc",calc)
         console.log("from",ladder.from,ladder.to)
          console.log("this.state.to",this.state.to)
        }
        return(
          
        console.log("ladder.from;;",ladder.from)
        
        )
      
      })
    };
    // this.findLadder();

// findLadder=()=>{
//   let ladders=Helper.ladders;
//   console.log(ladders)
//   let calc;
//   this.setState({
//     test:false
//   })
//   console.log("this.state.value",this.state.value)
//   console.log("this.state.move",this.state.move)
//   {this.state.start?calc=(this.state.value+this.state.move):calc=0}
//   console.log("findladder this.state.value",calc)
//   ladders.map( ladder => {

//     if(this.state.start&&ladder.from==2){
//       this.setState({
//         ladder:true,
//         to:ladder.to
//       })
     
//       console.log("this.state.to",this.state.to)
//     }
//     return(
      
//     console.log("ladder.from;;",ladder.from)
    
//     )
  
//   })
// };

  render() {
    
    let move=this.state.move;
    let value=this.state.value;
    // let value=0;
    // {this.state.start?value=(value+move):value=0}
    console.log("move::::",move);
    // let value=this.state.value;
    console.log("value:::::::",value)
    console.log("this.state.start====",this.state.start)
    return (
      <div>
        <div className="squareContainer">
          <Game tiles={this.state.tiles}/>
          { 
            this.displayLadders()
            
          }
          {
            // loads snakes
            // this.repeat()
            this.displaySnakes()
          }
        </div>
        <div>
          <Rolldice className="rollDicebtn"  move={this.state.move} value={this.state.value} onClick={this.rollDice} />
        </div>
        <div> 
          {this.state.start ? <PlayButton style={this.state.style} className="roundButton" /> : null}
          {/* {this.state.start ? <Player players={Helper.players}/> : null} */}
        </div>
      </div>
    )
  }
}
export default Home;














