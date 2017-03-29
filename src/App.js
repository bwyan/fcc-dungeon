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
    this.setPlayerPosition = this.setPlayerPosition.bind(this);
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

  setPlayerPosition(newRow, newCol) {
    const mapData = this.state.mapData;
    const player = this.state.player;
    const currentRow = this.state.player.position[0];
    const currentCol = this.state.player.position[1];

    delete mapData.tiles[currentRow][currentCol].player;
    mapData.tiles[newRow][newCol].player = true; //TODO: should I refactor this so that the player position isn't stored directly on the map? Each tile would get a 'hasPlayer' prop instead (derived from player.position).

    player.position = [newRow, newCol];

    this.setState({
      mapData,
      player
    });
  }

  handlePlayerMove(direction) {
    const current = this.state.player.position;
    const mapTiles = this.state.mapData.tiles;
    let next = current;

    switch(direction) {
      case 'up':
        next = [(current[0] - 1), (current[1])];
        console.log(next);
        break;
      case 'down':
        next = [(current[0] + 1), (current[1])];
        break;
      case 'left':
        next = [(current[0]), (current[1] - 1)];
        break;        
      case 'right':
        next = [(current[0]), (current[1] + 1)];
        break;  
      default:
        break; 
    }

    switch(tiles[mapTiles[next[0]][next[1]].name].kind) { //TODO: refactor that expression. C'mon Bryan!
      case 'barrier':
        break;
      case 'pathway':
        this.setPlayerPosition(next[0], next[1]);
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
