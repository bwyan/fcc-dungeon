import React, {Component} from 'react';

//data
import playerLevels from './data/playerLevels.js';
import weapons from './data/weapons.js';
import maps from './data/maps.js';
import tiles from './data/tiles.js';

//components
import Board from './components/Board.js';
import HUD from './components/HUD.js';
import Editor from './components/Editor.js';

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

    this.setGridDimensions = this.setGridDimensions.bind(this);

    this.getTileIndex = helpers.getTileIndex.bind(this);
    this.getTile = helpers.getTile.bind(this);
    this.setPlayerPosition = helpers.setPlayerPosition.bind(this);
    this.changePlayerHealth = helpers.changePlayerHealth.bind(this);
    this.setLitTiles = helpers.setLitTiles.bind(this);
    this.toggleDarkMode = helpers.toggleDarkMode.bind(this);
    // this.loadMap = helpers.loadMap.bind(this);
    // this.warp = helpers.loadMap.bind(this);

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
    this.initialize();

    window.addEventListener('keydown', e => this.handleKeyDown(e));
  }

  componentDidMount() {
    this.setPlayerPosition(this.state.player.position[0], this.state.player.position[1]);

  }

  initialize() {
    let mapIsDark = true;
    const mapData = JSON.parse(JSON.stringify(maps.m1));
    const enemies = {};
    const player = {
        health: 30,
        maxHealth: playerLevels[0].maxHealth,
        xp: 0,
        level: 0,
        minAttack: 1,
        maxAttack: 2,
        weapon: weapons.barehands,
        position: mapData.startingPosition        
    }
    
    this.setState({
      mapIsDark,
      mapData,
      enemies,
      player
    }, function() {
      this.setPlayerPosition(this.state.player.position[0], this.state.player.position[1]);
    });
  }

  gameOver() {
    console.log('Game Over');
    this.initialize();

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
      case 'warp':
        this.warp(tileMap[nextTileIndex].warp);
        break;
      default:
        break;
    }
  }

  warp(mapNumber) {
    this.removePlayer();
    this.loadMap(mapNumber);
    this.setPlayerPosition(this.state.mapData.startingPosition[0], this.state.mapData.startingPosition[1]);
  }

  removePlayer() { //this would also be useful in helpers.js. Try to combine once I have a better strategy for modules.
    let mapData = {...this.state.mapData};
    delete mapData.tileMap[this.getTileIndex(this.state.player.position[0], this.state.player.position[1])].player;

    this.setState({mapData});
  }

  loadMap(mapNumber) {
    let mapData = JSON.parse(JSON.stringify(maps[mapNumber]));
    console.log(mapData);

    this.setState({
      mapData
    });
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

  setGridDimensions(rows, columns) {
    console.log('New Dimensions. Rows: ' + rows + ' Columns: ' + columns);

    columns = columns || this.state.columns;
    let mapData = {...this.state.mapData};
    let tileMap = mapData.tileMap;

    if (tileMap.length < (rows * columns)) {
      for (var i = tileMap.length; i < rows * columns; i++) {
        console.log('adding a new tile: ' + i);
        tileMap.push({name: 'floor'})

      }
    } else if (tileMap.length > rows * columns) {
      tileMap.splice(rows * columns - tileMap.length);
    }

    tileMap.forEach((tile, index, tileMap) => {
      if(index % columns === 0 || index % columns === columns - 1) {
        tileMap[index] = {name: 'wall'};  
      }     

      if(index < columns - 1) {
        tileMap[index] = {name: 'wall'}; 
      }

      if(index > tileMap.length - columns) {
        tileMap[index] = {name: 'wall'}; 
      }
    });


    mapData.rows = rows;
    mapData.columns = columns;

    this.setState({
      rows,
      columns,
      mapData
    })
  }


  render() {
    return (
      <div className="App">
        <h1>Into the Dungeon…</h1>
        <Board mapData={this.state.mapData} coverMapData={this.state.coverData}/>      
        <HUD player={this.state.player}/>
        <button onClick={this.toggleDarkMode}>{this.state.mapIsDark ? 'Lights On' : `Lights Off`}</button>
        <Editor mapData={this.state.mapData} setGridDimensions={this.setGridDimensions}/>
      </div>
    )
  }
}

export default App;
