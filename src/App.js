import React, {Component} from 'react';

//data
import playerLevels from './data/playerLevels.js';
import weapons from './data/weapons.js';
import maps from './data/maps.js';
import tiles from './data/tiles.js';

//components
import Board from './components/Board.js';
import HUD from './components/HUD.js';

//helpers
//import key from 'keymaster';

//styles
import './App.scss';

class App extends Component {
  
  constructor() {
    super();
    this.handleMove = this.handleMove.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
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

    window.addEventListener('keydown', e => this.handleKeyDown(e));
  }

  componentDidMount() {
    this.setPlayerPosition(this.state.player.position[0], this.state.player.position[1]);
  }

  getTile(row, col) {
    return this.state.mapData.tileMap[row * this.state.mapData.columns + col]
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


    delete mapData.tileMap[this.getTileIndex(currentRow, currentCol)].player;
    mapData.tileMap[this.getTileIndex(newRow, newCol)].player = true; //TODO: should I refactor this so that the player position isn't stored directly on the map? Each tile would get a 'hasPlayer' prop instead (derived from player.position).

    player.position = [newRow, newCol];

    this.setState({
      mapData,
      player
    });
  }

  handleKeyDown(event) {
    let direction;

    switch(event.keyCode) {
      case 38:
      case 87:
        direction = 'up';
        break;
      case 40:
      case 83:
        direction = 'down';
        break;
      case 37:
      case 65:
        direction = 'left';
        break;
      case 39:
      case 68:
        direction = 'right';
        break;
      default:
        break;
    }

    this.handleMove(direction);
  }

  pickUpItem(item, row, col) {
    let player = this.state.player;
    const rewards = item.rewards;

    Object.keys(rewards).forEach(reward => {
      if(reward === 'weapon') {
        this.changeWeapon(rewards[reward]);
      } else if(player.hasOwnProperty(reward)) {
        player[reward] += rewards[reward];
      } else {
        player[reward] = rewards[reward];
      }
    })

    if (row && col) {
      this.removeItem(row, col);
    }

    this.setState({
      player
    });
  }

  removeItem(row, col) {
    let mapData = this.state.mapData;

    mapData.tileMap[this.getTileIndex(row, col)].name = 'floor';

    this.setState({mapData});
  }

  setItem(itemName, row, col) {
    let mapData = this.state.mapData;

    mapData.tileMap[this.getTileIndex(row, col)].name = itemName;
  }

  changeWeapon(weapon, row, col) {
    let player = this.state.player;
    let prevWeapon = this.state.player.weapon;
    const playerPosition = this.state.player.position;

    this.setItem(prevWeapon.name, playerPosition[0], playerPosition[1])

    if(row && col) {
      this.removeItem(row, col);
    }

    player.weapon = weapons[weapon];
    this.setState({player});
  }

  handleMove(direction) { //TODO: split this into two functions (one for computing the new coordinates, and one for applying the rules to the "next" move);
    const tileMap = this.state.mapData.tileMap;    
    const next = this.nextPlayerCoordinates(direction);
    
    //these help keep the expression in the switch statement readable
    const nextTileIndex = this.getTileIndex(next[0], next[1]);
    const nextTileName = tileMap[nextTileIndex].name;

    switch(tiles[nextTileName].kind) {
      case 'barrier':
        break;
      case 'pathway':
        this.setPlayerPosition(next[0], next[1]);
        break;
      case 'item':
        this.pickUpItem(tiles[nextTileName], next[0], next[1]);
        this.setPlayerPosition(next[0], next[1]);
        break;
      case 'enemy':
        console.log('fight!');
        break;
      case 'weapon':
        this.changeWeapon(tiles[nextTileName].name, next[0], next[1]);
        this.setPlayerPosition(next[0], next[1]);
        break;
      default:
        break;
    }
  }

  nextPlayerCoordinates(direction) {
    const current = this.state.player.position;
    let next = current.slice(0);

    switch(direction) {
      case 'up':
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

    return(next);
  }

  render() {
    return (
      <div className="App">
        <h1>Into the Dungeon…</h1>
        <HUD player={this.state.player}/>
        <Board mapData={this.state.mapData} />
      </div>
    )
  }
}

export default App;
