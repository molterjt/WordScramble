import React, { Component } from 'react';
import star from './star.png';
import './App.css';
var util = require('util');



const boardBackground = '#ffdfc1';
const TripleWord = '#dd776a';
const TripLetter = '#469da8';
const DoubleWord = '#ffb2be';
const DoubleLetter = '#8bc7f4';

class Letter extends Component{
    constructor(props){
        super(props);
    }
    onDragStart = (ev, letter) => {
        console.log(letter);
        // const data = util.inspect(JSON.stringify(letter));
        ev.dataTransfer.setData("letter", letter);

    };
    render(){
        return(
            <div
                key={this.props.letterId}
                className={"square"}
                onDragStart={ e => this.onDragStart(e, this.props.letterId)}
                draggable
                style={{width: this.props.width, height: this.props.height, backgroundColor: this.props.tileColor,
                }}
            >
                <span style={{color:'#fff', margin:5}}>{this.props.name}</span>
                <span style={{color:'#fff', fontSize: '8px', textAlign:'flex-end'}}>{this.props.points}</span>
            </div>
        );
    }

}

class Square extends Component{
    constructor(props){
        super(props);

    }
    render(){
       if(this.props.symbol){
            return(
                <div
                    key={this.props.position}
                    className={"square"}
                    onDragOver={this.props.onDragOver}
                    onDrop={(e) => this.props.onDrop(e, this.props.position)}
                    style={{
                        width: this.props.width,
                        height: this.props.height,
                        backgroundColor: this.props.shade,

                    }}
                >
                    <img
                        alt={'star symbol'}
                        width={'100%'}
                        height={'100%'}
                        src={this.props.symbol}
                    />
                </div>
            )
        } else
        return(
            <div
                key={this.props.position}
                className={"square"}
                onDragOver={this.props.onDragOver}
                onDrop={(e) => this.props.onDrop(e, this.props.position)}
                style={{
                    width: this.props.width,
                    height: this.props.height,
                    backgroundColor: this.props.shade,
                }}
            >
                {this.props.letter}
            </div>
        );
    }
}

class PlayerLetterSet extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:true,
            tileCount: 0,
            playerLetters: [],
            contains: false,
        }
    }
    componentDidMount(){
        this.playerDrawLetters();

    }

    shuffleTray = () => {
        const {playerLetters} = this.state;
        this.setState({playerLetters: playerLetters.sort( () =>  0.5 - Math.random())})
    }

    onDrop = async (ev, position) => {
        const {playerLetters} = this.state;
        console.log('playerLetters =>  ', playerLetters.map(obj => obj.props.name));
        const item = await ev.dataTransfer.getData("letter");
        console.log('item from transfer: ', item);
        console.log('position:', position);
        let moveLetter;
        playerLetters.filter((obj) => {
            if(obj.props.letterId === item){
                moveLetter = obj;
                let itemIndex = playerLetters.indexOf(obj);
                console.log('itemIndex: ', itemIndex);
                playerLetters.splice(itemIndex, 1);
                const newTray = [
                    ...playerLetters.slice(0,position),
                    moveLetter,
                    ...playerLetters.slice(position)
                ];
                console.log('new tray: ', newTray.map(obj => obj.props.name))
                this.setState({ playerLetters: [...newTray] });


            }
            console.log('new playerset: ',playerLetters.map(obj => obj.props.name));

            return item;
        });
        this.props.playedLetters.filter((obj, index) => {
            if(obj.props.letterId === item){
                const newTray = [
                    ...playerLetters.slice(0,position),
                    obj,
                    ...playerLetters.slice(position)
                ];
                console.log('New Tray from letter return: ', newTray);
                this.props.playedLetters.slice(index, 1);
                this.setState({playerLetters: [...newTray]})
            }
        })

    };
    playerDrawLetters(){
        const max_tiles = 7;
        if(this.state.tileCount < max_tiles){
            let drawn_tile = this.props.letterSet.pop();
            this.props.lettersOnDeck.push(drawn_tile);
            this.state.playerLetters.push(drawn_tile);
            this.setState({tileCount: this.state.tileCount+1})
        }
    };
    playedLetters = async () => {
        console.log('this.props.playedLetters: ', this.props.playedLetters)
        await this.props.playedLetters.map((letter) =>
            this.state.playerLetters.filter((obj, index) => {
                if(obj.props.letterId === letter.props.letterId){
                    console.log(`${obj.props.name} has been played`)
                    const tempArr = [...this.state.playerLetters];
                    tempArr.splice(tempArr.indexOf(obj), 1);
                    let tileCount = this.state.tileCount
                    tileCount = tileCount-1;
                    this.setState({tileCount: tileCount ,playerLetters: [...tempArr]})
                }
            })
        )
    }
    render(){
        this.playedLetters();
        return(
            <div
                key={this.props.tileIndex}
                style={{flex:7,display: 'flex', flexDirection: 'row', width: '60%', backgroundColor: "#89ffac"}}
            >
                <button onClick={() => this.playerDrawLetters()}>+</button>
                {this.state.playerLetters.map((obj,index) => (
                    <div
                        key={index}
                        style={{border:'1px solid black', margin:2, display:'flex', flexDirection:'row', justifyContent:'center'}}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => this.onDrop(e, index )}
                    >
                        {obj}
                    </div>
                ))}
                <button style={{display:'flex'}} onClick={() => this.shuffleTray()}>œœœ</button>
            </div>
        );
    }
}

let playerBoard = [];

export default class Scrabble extends Component{
    constructor(props){
        super(props);
        this.state={
            windowHeight: undefined,
            windowWidth: window.innerWidth,
            board: [],
            lettersOnDeck: [],
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
            playedLetters: [],
            draggedLetter: {},
            wordPlayed: [],
        }
    }
    onDrop = async (ev, position) => {
        const {letterList, lettersOnDeck, board, playedLetters, wordPlayed} = this.state;
        const item = await ev.dataTransfer.getData("letter");
        console.log('item from transfer: ', item);
        console.log('game board position:', position);
        console.log('lettersOnDeck: ,', lettersOnDeck);
        console.log('findMyLetter: ', lettersOnDeck.filter(obj => obj.props.letterId === item))
        let moveLetter;
        lettersOnDeck.filter((obj, index) => {
            if(obj.props.letterId === item){
                moveLetter = obj;
                console.log('moveLetter: ', moveLetter);
                const played = obj;
                console.log('played: ', played);
                lettersOnDeck.splice(index, 1);

                console.log('lettersOnDeck == ', lettersOnDeck);
                let mySquare, squareIndex;
                const newBoard = [...board];
                newBoard.filter((tile, index) => {
                    if(tile.props.position === position){
                        mySquare = tile;
                        squareIndex = index;
                    }
                    return mySquare;
                });

                const letterOnSquare =  <Letter
                    letterId={moveLetter.props.letterId}
                    name={moveLetter.props.name}
                    point={moveLetter.props.points}
                    bonus={mySquare.props.bonus}
                    tileColor={moveLetter.props.tileColor}
                    id={moveLetter.props.id}
                    height={moveLetter.props.height}
                    width={moveLetter.props.width}
                    position={mySquare.props.position}
                    squareShade={mySquare.props.shade}
                    letterArray={lettersOnDeck}
                    wordArray={wordPlayed}
                />

                this.setState({playedLetters: [...playedLetters, letterOnSquare]});
                console.log('playedLetters: ', playedLetters.map(x => x.props.letterId));
                newBoard.splice(squareIndex, 1, letterOnSquare);
                this.setState({board: [...newBoard]})
            }
            return obj;
        });
        playedLetters.filter((obj, index) => {
            if(obj.props.letterId === item){
                const moveLetter = obj;
                console.log('moveLetterFromGameBoard: ', moveLetter.props);
                const fixBoard = [...board];
                const newSquare =   <Square
                                        position={moveLetter.props.position}
                                        letter={undefined}
                                        height={this.state.windowWidth/20}
                                        width={this.state.windowWidth/20}
                                        bonus={obj.props.bonus}
                                        shade={obj.props.squareShade}
                                        onDragOver={this.onDragOver}
                                        onDrop={this.onDrop}
                                    />;

                fixBoard.filter((obj,index) => {
                    if(obj.props.letterId === item){
                        fixBoard.splice(index, 1, newSquare);
                        fixBoard.splice(position-1,1,moveLetter)
                        this.setState({board: [...fixBoard]});
                    }
                    return obj;
                });
            }
            return obj;
        });

        // const newSquare =   <Square
        //                         position={position}
        //                         letter={moveLetter}
        //                         height={this.state.windowWidth/20}
        //                         width={this.state.windoWidth/20}
        //                         bonus={mySquare.props.bonus}
        //                     />;
       // newBoard.splice(squareIndex, 1, newSquare);

    };
    onDragOver = (ev) => {ev.preventDefault();};
    handleResize=()=>this.setState({windowHeight: window.innerHeight, windowWidth: window.innerWidth});
    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize)
    }
    componentWillMount(){
        this.createTheBoard();
        this.createLetterBag();
    }
    componentWillUnmount() {window.removeEventListener('resize', this.handleResize)}

    createTheBoard(){
        const {board} = this.state;
        if(board.length < 1){this.setState({board: this.secondB()})}
    }
    renderSquares(i, shade, symbol, bonus){
        return(
            <Square
                position={i}
                letter={undefined}
                height={this.state.windowWidth/20}
                width={this.state.windowWidth/20}
                shade={shade}
                symbol={symbol}
                bonus={bonus}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
            />
        )
    }
    renderLetterList(name, points, tileColor, id){
        return (
            <Letter
                letterId={id}
                name={name}
                points={points}
                tileColor={tileColor}
                id={id}
                height={this.state.windowWidth/20}
                width={this.state.windowWidth/20}
                position={undefined}
                bonus={undefined}
                letterArray={this.state.lettersOnDeck}
            />
        )
    }
    createLetterBag(){
        const {letterList, letterData} = this.state;
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
    _shuffleBag() {
        const {letterList} = this.state;
        this.setState({
            letterList: letterList.sort( () =>  0.5 - Math.random())
        })
    }
    secondB(){
        const gameBoard = [];
        for(let i = 0; i < 15; i++){

            for(let j = 0; j < 15; j++){
                let squareShade;
                let symbol;
                let bonus;
                let position = (i*15) + j + 1;
                switch(position){
                    case 1:
                        squareShade = TripleWord;
                        bonus = 'TW';
                        break;
                    case 4:
                        squareShade = DoubleLetter;
                        bonus = 'DL'
                        break;
                    case 8:
                        squareShade = TripleWord;
                        bonus = 'TW';
                        break;
                    case 12:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 15:
                        squareShade = TripleWord;
                        bonus = 'TW';
                        break;
                    case 17:
                        squareShade = DoubleWord;
                        bonus = 'DW';
                        break;
                    case 21:
                        squareShade = TripLetter;
                        bonus = 'TL';
                        break;
                    case 25:
                        squareShade = TripLetter;
                        bonus = 'TL';
                        break;
                    case 29:
                        squareShade = DoubleWord;
                        bonus = 'DW';
                        break;
                    case 33:
                        squareShade = DoubleWord;
                        bonus = 'DW';
                        break;
                    case 37:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 39:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 43:
                        squareShade = DoubleWord;
                        bonus = 'DW';
                        break;
                    case 46:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 49:
                        squareShade = DoubleWord;
                        bonus = 'DW';
                        break;
                    case 53:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 57:
                        squareShade = DoubleWord;
                        bonus = 'DW';
                        break;
                    case 65:
                        squareShade = DoubleWord;
                        bonus = 'DW';
                        break;
                    case 71:
                        squareShade = DoubleWord;
                        bonus = 'DW';
                        break;
                    case 77:
                        squareShade = TripLetter;
                        bonus = 'TL';
                        break;
                    case 81:
                        squareShade = TripLetter;
                        bonus = 'TL';
                        break;
                    case 85:
                        squareShade = TripLetter;
                        bonus = 'TL';
                        break;
                    case 89:
                        squareShade = TripLetter;
                        bonus = 'TL';
                        break;
                    case 93:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 97:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 99:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 103:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 106:
                        squareShade = TripleWord;
                        bonus = 'TW';
                        break;
                    case 109:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 113:
                        squareShade = DoubleWord;
                        bonus = 'DW';
                        symbol=star;
                        break;
                    case 117:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 120:
                        squareShade = TripleWord;
                        bonus = 'TW';
                        break;
                    case 123:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 127:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 129:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 133:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 137:
                        squareShade = TripLetter;
                        bonus = 'TL';
                        break;
                    case 141:
                        squareShade = TripLetter;
                        bonus = 'TL';
                        break;
                    case 145:
                        squareShade = TripLetter;
                        bonus = 'TL';
                        break;
                    case 149:
                        squareShade = TripLetter;
                        bonus = 'TL';
                        break;
                    case 155:
                        squareShade = DoubleWord;
                        bonus = 'DW';
                        break;
                    case 161:
                        squareShade = DoubleWord;
                        bonus = 'DW';
                        break;
                    case 166:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 169:
                        squareShade = DoubleWord;
                        bonus = 'DW';
                        break;
                    case 173:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 177:
                        squareShade = DoubleWord;
                        bonus = 'DW';
                        break;
                    case 180:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 183:
                        squareShade = DoubleWord;
                        bonus = 'DW';
                        break;
                    case 187:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 189:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 193:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 197:
                        squareShade = DoubleWord;
                        bonus = 'DW';
                        break;
                    case 201:
                        squareShade = TripLetter;
                        bonus = 'TL';
                        break;
                    case 205:
                        squareShade = TripLetter;
                        bonus = 'TL';
                        break;
                    case 209:
                        squareShade = DoubleWord;
                        bonus = 'DW';
                        break;
                    case 211:
                        squareShade = TripleWord;
                        bonus = 'TW';
                        break;
                    case 214:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 218:
                        squareShade = TripleWord;
                        bonus = 'TW';
                        break;
                    case 222:
                        squareShade = DoubleLetter;
                        bonus = 'DL';
                        break;
                    case 225:
                        squareShade = TripleWord;
                        bonus = 'TW';
                        break;
                    default:
                        squareShade = boardBackground;
                }
                gameBoard.push(this.renderSquares((i*15)+j+1, squareShade, symbol, bonus) )
            }
            //gameBoard.push(this.renderSquares((i*15)+j+1, squareShade, symbol));
        }
        playerBoard = [...gameBoard];
        return gameBoard;

    }

    render(){
        const { letterList, board, lettersOnDeck, playedLetters} = this.state;
        console.log('@render() => ', board);
        //console.log(playerBoard.map((obj) => obj))

        return(
            <div key={'001'} className="App" style={{margin: 30}}>

                {/*<button onClick={() => this.createTheBoard()}>{'Create Board'}</button>*/}
                <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
                    {letterList}
                </div>
                <button onClick={() => this._shuffleBag()}>Shuffle Bag</button>
                <div>
                    <PlayerLetterSet
                        key={1}
                        playerName={'Jeff'}
                        letterSet={letterList}
                        lettersOnDeck={lettersOnDeck}
                        playedLetters={playedLetters}

                    />

                    <PlayerLetterSet
                        key={2}
                        playerName={'Abby'}
                        letterSet={letterList}
                        lettersOnDeck={lettersOnDeck}
                        playedLetters={playedLetters}
                    />
                </div>
                <div className={'boardContainer'}>
                        {board.map(obj => obj)}

                </div>
            </div>

        );
    }
}