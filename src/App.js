import React, {Component} from 'react';

//data
import playerLevels from './data/playerLevels.js';
import weapons from './data/weapons.js';
import enemyList from './data/enemies.js';
import maps from './data/maps.js';
import tiles from './data/tiles.js';

//components
import Board from './components/Board.js';
import HUD from './components/HUD.js';

//helpers
import helpers from './components/helpers.js';

//styles
import './App.scss';

class App extends Component {
  
  constructor() {
    super();
    this.handleMove = this.handleMove.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.setPlayerPosition = this.setPlayerPosition.bind(this);
    // this.getTileIndex = helpers.getTileIndex.bind(this);
    // this.getTile = helpers.getTileIndex.bind(this);
    this.changePlayerHealth = helpers.changePlayerHealth.bind(this);
  }

  getTile(row, col) {
    return this.state.mapData.tileMap[row * this.state.mapData.columns + col]
  }

  getTileIndex(row, col) {
    return row * this.state.mapData.columns + col;
  }

  componentWillMount() {
    let mapData = maps.l1;
    let coverData = JSON.parse(JSON.stringify(mapData));
    
    coverData.tileMap = mapData.tileMap.map(tile => {
      return tile = {name: 'dark'}
    });

    mapData.tileMap.forEach(tile => {
      //console.log(tile);
      // console.log(mapData.tileMap[tile]);
      tile.dark = true;
    });

    let position = maps.l1.startingPosition;

    console.log(coverData);

    this.setState({
      coverData,
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
      },
      enemies: { //store stats for any enemy that the player has fought. (Remove that enemy when they're defeated.)

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

  setPlayerPosition(newRow, newCol) {
    //make a copy of the state that will be mutated.
    const mapData = {...this.state.mapData};
    const player = {...this.state.player};

    const currentRow = this.state.player.position[0];
    const currentCol = this.state.player.position[1];


    delete mapData.tileMap[this.getTileIndex(currentRow, currentCol)].player;
    mapData.tileMap[this.getTileIndex(newRow, newCol)].player = true; //TODO: should I refactor this so that the player position isn't stored directly on the map? Each tile would get a 'hasPlayer' prop instead (derived from player.position).

    this.setLitTiles(this.getTileIndex(newRow, newCol));

    player.position = [newRow, newCol];

    this.setState({
      mapData,
      player
    });
  }

  setLitTiles(index) {
    let mapData = {...this.state.mapData};
    let tileMap = mapData.tileMap

    tileMap.forEach(tile => {
      tile.dark = true;
    });


    tileMap[index].dark = false;
    tileMap[index - 1].dark = false;
    // tileMap[index - 2].dark = false; need to wrap in an if statement to avoid wraparound
    tileMap[index + 1].dark = false; //to the left
    // tileMap[index + 2].dark = false; //to the right need to wrap in an if statement to avoid wraparound
    tileMap[index + mapData.columns].dark = false; //below
    tileMap[index + mapData.columns - 1].dark = false;
    tileMap[index + mapData.columns + 1].dark = false;
    tileMap[index - mapData.columns].dark = false; //above
    tileMap[index - mapData.columns - 1].dark = false;
    tileMap[index - mapData.columns + 1].dark = false;
    
    this.setState({mapData});

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
    const rewards = item.rewards;

    Object.keys(rewards).forEach(reward => {
      this.getReward(reward, rewards[reward]);
    })

    if (row && col) {this.removeItem(row, col);}
  }

  getReward(reward, value) {
    console.log(reward, value);
    switch(reward) {
      case 'weapon': 
        this.changeWeapon(value);
        break;
      case 'health':
        this.changePlayerHealth(value);
        break;
      case 'xp':
        this.changePlayerXP(value);
        break;
      default:
        break;
    }
  }

  removeItem(row, col) {
    let mapData = this.state.mapData;

    mapData.tileMap[this.getTileIndex(row, col)].name = 'floor';

    this.setState({mapData});
  }

  setItem(itemName, row, col) {
    let mapData = this.state.mapData;

    mapData.tileMap[this.getTileIndex(row, col)].name = itemName;

    this.setState({mapData});
  }

  changeWeapon(weapon, row, col) {
    weapon = weapon.toLowerCase().replace(/\s+/g, '');
    let prevWeapon = this.state.player.weapon.name.toLowerCase().replace(/\s+/g, '');
    let player = this.state.player;
    const playerPosition = this.state.player.position;

    //Don't drop "bare hands" onto the map.
    if(prevWeapon !== 'barehands') {this.setItem(prevWeapon, playerPosition[0], playerPosition[1])};

    if(row && col) {this.removeItem(row, col);}

    player.weapon = weapons[weapon];
    this.setState({player});
  }

  changePlayerXP(amount) {
    console.log('changing xp by ' + amount);
    let player = {...this.state.player};
    const newXP = player.xp += amount;
    const maxXP = playerLevels[player.level].maxXP;

    if (newXP > maxXP) {
      player.xp = newXP - maxXP;
      this.setState({player});
      this.setPlayerLevel(player.level + 1);
    } else {
      player.xp = newXP;
      this.setState({player});
    }
  }



  setPlayerLevel(level) {
    console.log('setting player level to ' + level);
    let player = this.state.player;

    if (level > playerLevels.length - 1) {
      console.log('level exceeds limit');
      return;
    }
    player.level = level;
    player.maxHealth = playerLevels[level].maxHealth;
    player.health = player.maxHealth;
    player.minAttack = playerLevels[level].minAttack;
    player.maxAttack = playerLevels[level].maxAttack;
    console.log(player);

    this.setState({player});
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
        // console.log('fight!');
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

  handleFight(row, col) {
    const tileType = tiles[this.state.mapData.tileMap[this.getTileIndex(row, col)].name].kind;
    
    if (tileType !== 'enemy') {
      console.log('no enemies there'); //the culprit is probably (constructor.name) on line 236, due to the build engine creating an optimized name for the enemy class.
      return;
    }

    if (!this.hasEnemyID(row, col)) {
      this.setEnemyID(row, col);
    }

    var enemyID = this.state.mapData.tileMap[this.getTileIndex(row, col)].enemyID;
    this.attackPlayer(enemyID);
    this.attackEnemy(enemyID);
  }

  attackPlayer(enemyID){
    let player = {...this.state.player};
    const enemy = enemyList[this.state.enemies[enemyID].name.toLowerCase().replace(/\s+/g, '')];
    const damage = enemy.getAttack();

    player.health -= damage;
    console.log(`state: ` + this.state.player.health);
    console.log(`local var: ` + player.health);

    if (player.health < 1) {
      player.health = 0;
      this.setState({player});
      this.gameOver();
    } else {
      console.log('else called')
      this.setState({player});
    }
  }

  attackEnemy(enemyID) {
    // console.log(`Player attacked ${enemyID}`);
    const enemies = {...this.state.enemies};
    const damage = this.calcPlayerAttack();

    enemies[enemyID].health -= damage;

    if (enemies[enemyID].health <= 0) {
      this.killEnemy(enemyID)
    } else {
      this.setState({
        enemies
      });
    }
  }

  calcPlayerAttack() {
    const weapon = this.state.player.weapon.name.toLowerCase().replace(/\s+/g, '');
    const weaponAttack = weapons[weapon].getAttack();

    const min = this.state.player.minAttack;
    const max = this.state.player.minAttack;

    const playerAttack = Math.floor(Math.random() * (max - min + 1) + min);

    return weaponAttack + playerAttack;
  }

  killEnemy(enemyID) {
    console.log(`${enemyID} was killed`);

    const enemies = {...this.state.enemies};
    const mapData = {...this.state.mapData};
    const enemyIndex = this.getenemyIndex(enemyID);

    this.pickUpItem(enemies[enemyID]);

    delete enemies[enemyID];
    mapData.tileMap[enemyIndex] = {name: `floor`};

    this.setState({enemies, mapData});
  }

  getenemyIndex(enemyID) {
    const tileMap = this.state.mapData.tileMap;
    const testID = enemyID;
    
    
    
    for (var i = 0; i < tileMap.length; i++) {
      if (tileMap[i].hasOwnProperty(`enemyID`) && tileMap[i].enemyID === testID) {
        return(i);
      }
    }

    return -1; //this ensures we don't cause other functions to throw an error if the enemy doesn't exist. Instead, they'll update the array index -1, which is harmless.
  }

  setEnemyID(row, col) {
    const mapData = {...this.state.mapData};
    const tile = this.getTile(row, col);
    const enemies = {...this.state.enemies};
    const enemy = tiles[tile.name];
    const enemyID = 'enemy-' + Date.now();
    
    console.log(`enemy id assigned: ${enemyID}`);

    enemies[enemyID] = enemy;
    tile.enemyID = enemyID;
    mapData.tileMap[this.getTileIndex(row, col)] = tile; 

    this.setState({
      mapData,
      enemies
    })
  }

  hasEnemyID(row, col) {
    const tile = this.state.mapData.tileMap[this.getTileIndex(row, col)];
    
    if (tile.hasOwnProperty('enemyID')) {
      return true;
    } else {
      return false;
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
        <Board mapData={this.state.mapData} coverMapData={this.state.coverData}/>
      </div>
    )
  }
}

export default App;
