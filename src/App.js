import React, { Component } from 'react';
//import star from './star.png';
import './App.css';
import Scrabble from "./Scrabble";


/*
const boardBackground = '#ffdfc1';
const TripleWord = '#dd776a';
const TripLetter = '#469da8';
const DoubleWord = '#ffb2be';
const DoubleLetter = '#8bc7f4';


class Letter extends Component{
    constructor(props){
        super(props);
        this.state = {
            windowHeight: undefined,
            windowWidth: undefined
        }
    }
    handleResize = () => this.setState({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
    });
    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize)
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }
    onDragStart = (ev, id) => {
        console.log('dragstart:', id);
        ev.dataTransfer.setData("id", id);
    }
    render(){
        const {windowWidth} = this.state;
        return(
            <div className={"square"}
                 onDragStart={(e) => this.onDragStart(e, this.props.id)}
                 draggable
                 style={{
                     width:windowWidth/20,
                     height:windowWidth/20,
                     backgroundColor: this.props.tileColor,
                 }}
            >
                <span style={{color:'#fff', margin:5}}>{this.props.name}</span>
                <span style={{color:'#fff', fontSize: '8px', textAlign:'flex-end'}}>{this.props.points}</span>
            </div>

        );
    }
}
class PlayerLetterSet extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={{flex:7,display: 'flex', flexDirection: 'row', width: '60%', backgroundColor: "#89ffac"}}>
                {this.props.playersLetterSet}
            </div>
        );
    }
}

class LetterBag extends Component{
    constructor(props){
        super(props);
        this.state={
            tileCountPlayerOne: 0,
            tileCountPlayerTwo: 0,
            playerOneLetters: [],
            playerTwoLetters: [],
            letterList: [],
            letterData: [
                {"name": "A", "number": 9, "points": 1 },
                {"name": "B", "number": 2, "points": 3 },
                {"name": "C", "number": 2, "points": 3 },
                {"name": "D", "number": 4, "points": 2 },
                {"name": "E", "number": 12, "points": 1 },
                {"name": "F", "number": 2, "points": 4 },
                {"name": "G", "number": 3, "points": 2 },
                {"name": "H", "number": 2, "points": 4 },
                {"name": "I", "number": 9, "points": 1 },
                {"name": "J", "number": 1, "points": 8 },
                {"name": "K", "number": 1, "points": 5 },
                {"name": "L", "number": 4, "points": 1 },
                {"name": "M", "number": 2, "points": 3 },
                {"name": "N", "number": 6, "points": 1 },
                {"name": "O", "number": 8, "points": 1 },
                {"name": "P", "number": 2, "points": 3 },
                {"name": "Q", "number": 1, "points": 10 },
                {"name": "R", "number": 6, "points": 1 },
                {"name": "S", "number": 4, "points": 1 },
                {"name": "T", "number": 6, "points": 1 },
                {"name": "U", "number": 4, "points": 1 },
                {"name": "V", "number": 2, "points": 4 },
                {"name": "W", "number": 2, "points": 4 },
                {"name": "X", "number": 1, "points": 8 },
                {"name": "Y", "number": 2, "points": 4 },
                {"name": "Z", "number": 1, "points": 10 },
                {"name": "Ω", "number": 2, "points": 0 },
            ],
        }
    }
    renderLetterList(name, points, tileColor, id){
        return (
            <Letter
                name={name}
                points={points}
                tileColor={tileColor}
                id={id}
            />
        )
    }
    shuffleLetterBag(){
        const {letterList, letterData, playerLetters} = this.state;
        const tileColorShade = '#596f85';
        letterData.map((obj) =>
            {
                for(let i = 0; i < obj.number; i++){
                    let identity = obj.name + i;
                    letterList.push(
                        this.renderLetterList(obj.name, obj.points, tileColorShade, identity)
                    )
                }
            }
        );
        letterList.sort( () =>  0.5 - Math.random())
    }
    playerOneDrawLetters(){
        const {tileCountPlayerOne, letterList, playerOneLetters} = this.state;
        const max_tiles = 7;
        if(tileCountPlayerOne < max_tiles){
            let drawn_tile = letterList.pop();
            playerOneLetters.push(drawn_tile);
           this.setState({tileCountPlayerOne: tileCountPlayerOne+1})
        }
    }
    playerTwoDrawLetters(){
        const {tileCountPlayerTwo, letterList, playerTwoLetters} = this.state;
        const max_tiles = 7;
        if(tileCountPlayerTwo < max_tiles){
            let drawn_tile = letterList.pop();
            playerTwoLetters.push(drawn_tile);
            this.setState({tileCountPlayerTwo: tileCountPlayerTwo+1})
        }
    }
    render(){
        const {letterList, playerTwoLetters, playerOneLetters} = this.state;
        return(
            <div>
                <button onClick={() => this.shuffleLetterBag()}>{'Create Letter Bag'}</button>
                <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
                    {letterList}
                </div>
                <div>
                    <PlayerLetterSet letterBag={letterList}/>
                    <button
                        onClick={ () => this.playerOneDrawLetters()}
                    >
                        {'Player One Draw Letters'}
                    </button>
                    <PlayerLetterSet playerName={'Jeff'} playersLetterSet={playerOneLetters}/>
                    <button
                        onClick={ () => this.playerTwoDrawLetters()}
                    >
                        {'Player Two Draw Letters'}
                    </button>
                    <PlayerLetterSet playerName={'Abby'} playersLetterSet={playerTwoLetters}/>

                </div>
            </div>
        );
    }
}
class Square extends Component{
    constructor(props){
        super(props);
        this.state = {
            windowHeight: undefined,
            windowWidth: undefined,
            playedLetters: [],
        }
    }
    handleResize = () => this.setState({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
    });
    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }
    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, position) => {
        let id = ev.dataTransfer.getData("id");
        let possibleLetters = this.props.letterBag.filter((letter) => {
            if(letter.id === id){
                this.props.playedPosition = this.props.position
            }
            return letter;
        });
        this.state.playedLetters.push(possibleLetters);

    }

    render(){
        const {windowHeight, windowWidth} = this.state;
        return(
            <div className={"square"}
                 onDragOver={(e) => this.onDragOver(e)}
                 onDrop={(e) => this.onDrop(e, this.state.playedLetters)}
                 style={{
                     width:windowWidth/20,
                     height:windowWidth/20,
                     backgroundColor: this.props.shade,
                 }}
            >
                {this.props.symbol
                ?(<img
                        width={'100%'}
                        height={'100%'}
                        src={this.props.symbol}
                    />)
                :(<p>{this.props.position}</p>)
                }

            </div>
        );
    }
}

class Board extends Component{
    constructor(props){
        super(props);
        this.state={
            board: [],
            letterBag: [],
        }
    }
    renderSquares(i, shade, symbol, bonus){
        return(
            <Square
                position={i}
                letter={this.props.letter}
                shade={shade}
                symbol={symbol}
                bonus={bonus}
                possibleLetters={this.props.letterBag}

            />
        )
    }
    componentDidMount(){
        const {letterBag} = this.state;
        this.setState({letterBag: this.props.letterBag})
    }
    render(){
        const board = [];
        for(let i = 0; i < 15; i++){
            const boardRow = [];
            for(let j = 0; j < 15; j++){
                let squareShade;
                let symbol;
                let position = (i*15) + j + 1;
                switch(position){
                    case 1:
                        squareShade = TripleWord;
                        break;
                    case 4:
                        squareShade = DoubleLetter;
                        break;
                    case 8:
                        squareShade = TripleWord;
                        break;
                    case 12:
                        squareShade = DoubleLetter;
                        break;
                    case 15:
                        squareShade = TripleWord;
                        break;
                    case 17:
                        squareShade = DoubleWord;
                        break;
                    case 21:
                        squareShade = TripLetter;
                        break;
                    case 25:
                        squareShade = TripLetter;
                        break;
                    case 29:
                        squareShade = DoubleWord;
                        break;
                    case 33:
                        squareShade = DoubleWord;
                        break;
                    case 37:
                        squareShade = DoubleLetter;
                        break;
                    case 39:
                        squareShade = DoubleLetter;
                        break;
                    case 43:
                        squareShade = DoubleWord;
                        break;
                    case 46:
                        squareShade = DoubleLetter;
                        break;
                    case 49:
                        squareShade = DoubleWord;
                        break;
                    case 53:
                        squareShade = DoubleLetter;
                        break;
                    case 57:
                        squareShade = DoubleWord;
                        break;
                    case 65:
                        squareShade = DoubleWord;
                        break;
                    case 71:
                        squareShade = DoubleWord;
                        break;
                    case 77:
                        squareShade = TripLetter;
                        break;
                    case 81:
                        squareShade = TripLetter;
                        break;
                    case 85:
                        squareShade = TripLetter;
                        break;
                    case 89:
                        squareShade = TripLetter;
                        break;
                    case 93:
                        squareShade = DoubleLetter;
                        break;
                    case 97:
                        squareShade = DoubleLetter;
                        break;
                    case 99:
                        squareShade = DoubleLetter;
                        break;
                    case 103:
                        squareShade = DoubleLetter;
                        break;
                    case 106:
                        squareShade = TripleWord;
                        break;
                    case 109:
                        squareShade = DoubleLetter;
                        break;
                    case 113:
                        squareShade = DoubleWord;
                        symbol=star;
                        break;
                    case 117:
                        squareShade = DoubleLetter;
                        break;
                    case 120:
                        squareShade = TripleWord;
                        break;
                    case 123:
                        squareShade = DoubleLetter;
                        break;
                    case 127:
                        squareShade = DoubleLetter;
                        break;
                    case 129:
                        squareShade = DoubleLetter;
                        break;
                    case 133:
                        squareShade = DoubleLetter;
                        break;
                    case 137:
                        squareShade = TripLetter;
                        break;
                    case 141:
                        squareShade = TripLetter;
                        break;
                    case 145:
                        squareShade = TripLetter;
                        break;
                    case 149:
                        squareShade = TripLetter;
                        break;
                    case 155:
                        squareShade = DoubleWord;
                        break;
                    case 161:
                        squareShade = DoubleWord;
                        break;
                    case 166:
                        squareShade = DoubleLetter;
                        break;
                    case 169:
                        squareShade = DoubleWord;
                        break;
                    case 173:
                        squareShade = DoubleLetter;
                        break;
                    case 177:
                        squareShade = DoubleWord;
                        break;
                    case 180:
                        squareShade = DoubleLetter;
                        break;
                    case 183:
                        squareShade = DoubleWord;
                        break;
                    case 187:
                        squareShade = DoubleLetter;
                        break;
                    case 189:
                        squareShade = DoubleLetter;
                        break;
                    case 193:
                        squareShade = DoubleLetter;
                        break;
                    case 197:
                        squareShade = DoubleWord;
                        break;
                    case 201:
                        squareShade = TripLetter;
                        break;
                    case 205:
                        squareShade = TripLetter;
                        break;
                    case 209:
                        squareShade = DoubleWord;
                        break;
                    case 211:
                        squareShade = TripleWord;
                        break;
                    case 214:
                        squareShade = DoubleLetter;
                        break;
                    case 218:
                        squareShade = TripleWord;
                        break;
                    case 222:
                        squareShade = DoubleLetter;
                        break;
                    case 225:
                        squareShade = TripleWord;
                        break;

                    default:
                        squareShade = boardBackground;
                }
                boardRow.push(this.renderSquares((i*15)+j+1, squareShade, symbol) )
            }
          board.push(
              <div style={{justifyContent:'center', flex:15, flexDirection:'row', flexWrap:'wrap', display:'flex',}}>{boardRow}</div>
          );
        }
        return(
            board
        );
    }
}
*/
class App extends Component {
  render() {
    return (
        <Scrabble/>
    );
  }
}
export default App;
