import React, {Component} from 'react';

//data
import playerLevels from './data/playerLevels.js';
import weapons from './data/weapons.js';
import maps from './data/maps.js';
import tiles from './data/tiles.js';

//components
import Board from './components/Board.js';

//styles
import './App.scss';

class App extends Component {
  
  constructor() {
    super();
    this.handleMove = this.handleMove.bind(this);
    this.setPlayerPosition = this.setPlayerPosition.bind(this);
    this.getTileIndex = this.getTileIndex.bind(this);
  }

  componentWillMount() {
    this.setState({
      mapData: maps.l1,
      player: {
        health: playerLevels.l1.maxHealth,
        xp: 0,
        level: 1,
        minAttack: 1,
        maxAttack: 2,
        weapon: weapons.bat,
        position: maps.l1.startingPosition        
      },
      enemies: { //store stats for any enemy that the player has fought. Remove that enemy when they're defeated.
        'enemy-12345': { //create an enemy id based on ms timestamp.
          health: 10 //what other stats need to be stored here?
        }
      }
    });
    //TODO: move the map-related data loading to it's own method that can be used for loading later levels.
    //ie: loadMap(maps.l1);
  }

  componentDidMount() {
    this.setPlayerPosition(this.state.player.position[0], this.state.player.position[1]);
  }

  getTile(row, col) {
    return this.state.mapData.tiles[row * this.state.mapData.columns + col]
  }

  getTileIndex(row, col) {
    return row * this.state.mapData.columns + col;
  }

  setPlayerPosition(newRow, newCol) {
    //make a copy of the state that will be mutated.
    const mapData = this.state.mapData;
    const player = this.state.player;

    const currentRow = this.state.player.position[0];
    const currentCol = this.state.player.position[1];


    delete mapData.tiles[this.getTileIndex(currentRow, currentCol)].player;
    mapData.tiles[this.getTileIndex(newRow, newCol)].player = true; //TODO: should I refactor this so that the player position isn't stored directly on the map? Each tile would get a 'hasPlayer' prop instead (derived from player.position).

    player.position = [newRow, newCol];

    this.setState({
      mapData,
      player
    });
  }

  handleMove(direction) {
    const current = this.state.player.position;
    const mapTiles = this.state.mapData.tiles;
    
    //this copies the value of current into next, rather than referencing current (helps clean up the switch statement below)
    let next = current.slice(0);

    console.log(next);

    switch(direction) {
      case 'up':
        // next = [(current[0] - 1), (current[1])]; //see above about current into next. All the cases looked like this.
        next[0]--;
        break;
      case 'down':
        next[0]++;
        break;
      case 'left':
        next[1]--;
        break;        
      case 'right':
        next[1]++;
        break;  
      default:
        break; 
    }

    //these help keep the expression in the switch statement readable
    const nextTileIndex = this.getTileIndex(next[0], next[1]);
    const nextTileName = mapTiles[nextTileIndex].name;

    switch(tiles[nextTileName].kind) {
      case 'barrier':
        break;
      case 'pathway':
        this.setPlayerPosition(next[0], next[1]);
        break;
      case 'enemy':
        console.log('fight!');
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Into the Dungeon…</h1>
        <Board mapData={this.state.mapData} />
      </div>
    )
  }
}

export default App;
