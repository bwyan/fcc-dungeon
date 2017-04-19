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
import helpers from './components/helpers.js';

//actions
import combat from './actions/combat.js';
import item from './actions/item.js';
import player from './actions/player.js';

//styles
import './App.scss';

class App extends Component {
  
  constructor() {
    super();

    this.getTileIndex = helpers.getTileIndex.bind(this);
    this.getTile = helpers.getTile.bind(this);
    this.setPlayerPosition = helpers.setPlayerPosition.bind(this);
    this.changePlayerHealth = helpers.changePlayerHealth.bind(this);
    this.setLitTiles = helpers.setLitTiles.bind(this);
    this.toggleDarkMode = helpers.toggleDarkMode.bind(this);

    this.handleFight = combat.handleFight.bind(this);
    this.attackPlayer = combat.attackPlayer.bind(this);
    this.attackEnemy = combat.attackEnemy.bind(this);
    this.killEnemy = combat.killEnemy.bind(this);
    this.calcPlayerAttack = combat.calcPlayerAttack.bind(this);
    this.getEnemyIndex = combat.getEnemyIndex.bind(this);
    this.setEnemyID = combat.setEnemyID.bind(this);
    this.hasEnemyID = combat.hasEnemyID.bind(this);

    this.pickUpItem = item.pickUpItem.bind(this);
    this.getReward = item.getReward.bind(this);
    this.removeItem = item.removeItem.bind(this);
    this.setItem = item.setItem.bind(this);
    this.changeWeapon = item.changeWeapon.bind(this);

    this.changePlayerXP = player.changePlayerXP.bind(this);
    this.setPlayerLevel = player.setPlayerLevel.bind(this);
  }

  componentWillMount() {
    let mapIsDark = true;
    let mapData = maps.l1;
    
    this.setState({
      mapIsDark,
      mapData,
      player: {
        health: 30,
        maxHealth: playerLevels[0].maxHealth,
        xp: 0,
        level: 0,
        minAttack: 1,
        maxAttack: 2,
        weapon: weapons.barehands,
        position: maps.l1.startingPosition        
      }      
    });
    //TODO: move the map-related data loading to it's own method that can be used for loading later levels.
    //ie: loadMap(maps.l1);

    window.addEventListener('keydown', e => this.handleKeyDown(e));
  }

  componentDidMount() {
    this.setPlayerPosition(this.state.player.position[0], this.state.player.position[1]);

  }

  gameOver() {
    console.log('Game Over');
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

  handleMove(direction) {
    const tileMap = this.state.mapData.tileMap;    
    const next = this.nextPlayerCoordinates(direction);
    
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
        this.handleFight(next[0], next[1]);
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
        <Board mapData={this.state.mapData} coverMapData={this.state.coverData}/>      
        <HUD player={this.state.player}/>
        <button onClick={this.toggleDarkMode}>{this.state.mapIsDark ? 'Lights On' : `Lights Off`}</button>
      </div>
    )
  }
}

export default App;
