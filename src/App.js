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
    this.toggleTileAtPosition = this.toggleTileAtPosition.bind(this);
    this.setTileToAdd = this.setTileToAdd.bind(this);

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
    this.initialize();

    window.addEventListener('keydown', e => this.handleKeyDown(e));
  }

  componentDidMount() {
    this.setPlayerPosition(this.state.player.position[0], this.state.player.position[1]);

  }

  initialize() {
    let mapIsDark = false;
    const tileToAdd = 'wall'
    const mapData = JSON.parse(JSON.stringify(maps.m0));
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
      tileToAdd,
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
    let mapData = {...this.state.mapData};
    let existingTiles = [];

    //Collect all non-border tiles from the map, and give them a new idex that will keep them at the same coordinates after the resize.
    mapData.tileMap.forEach((tile, index, tileMap) => {
      //Ignore border cells
      if (index % mapData.columns === 0 || index % mapData.columns === mapData.columns - 1 || index < mapData.columns - 1 || index > tileMap.length - mapData.columns) {
        return;
      } else { //Add non-border cells to existingTiles
        //Difference in the number columns before and after the resize.
        const difference = columns - mapData.columns;

        //How many rows are there before the one the tile is in?
        //We'll use this info to increase or decrease the index by the number of
        //new cells (+ or -) that will be added to be in the array ()
        const rowsBefore = Math.floor(index / mapData.columns);

        //Add the existing index to the number of additional cells there will be
        //in the array before we get to this tile
        const newIndex = index + difference * rowsBefore;
        existingTiles.push({currentIndex: index, newIndex: newIndex, tileData: tile});
      }
    });

    //Clear the tileMap so we don't end up with stray tiles after the resize.
    mapData.tileMap = mapData.tileMap.map(tile => {
      return tile = {name: 'floor'};
    })

    //Add or remove tiles from the tileMap to arrive at the correct number of tiles for the new map.
    mapData = helpers.resizeTileMap(mapData, rows, columns);

    //Set all of the estisting tiles back at their correct coordinates.
    existingTiles.forEach(tile => {
      if (tile.newIndex > rows * columns) {return};
      mapData.tileMap[tile.newIndex] = tile.tileData;
    })

    //Set all of the perimiter tiles to wall, so the player is trapped in the dungeon.
    mapData = helpers.secureBorders(mapData);
  
    this.setState({
      rows,
      columns,
      mapData
    })
  }

  toggleTileAtPosition(tile, position) {
    const mapData = {...this.state.mapData};
    console.log(tile, position);

    position = this.getTileIndex(position[0], position[1]);

    if (mapData.tileMap[position].name === tile.name) {
      mapData.tileMap[position].name = 'floor';
    } else {
      mapData.tileMap[position] = tile;      
    }

    this.setState({mapData});
  }

  setTileToAdd(tile) {
    this.setState({tileToAdd: tile});
  }


  render() {
    return (
      <div className="App">
        <h1>Into the Dungeon…</h1>
        <Board mapData={this.state.mapData} coverMapData={this.state.coverData} setTileAtPosition={this.toggleTileAtPosition}/>      
        <HUD player={this.state.player}/>
        <button onClick={this.toggleDarkMode}>{this.state.mapIsDark ? 'Lights On' : `Lights Off`}</button>
        <Editor mapData={this.state.mapData} setGridDimensions={this.setGridDimensions} setTileToAdd={this.setTileToAdd}/>
      </div>
    )
  }
}

export default App;
