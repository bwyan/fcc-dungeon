import tiles from '../data/tiles.js';
import enemyList from '../data/enemies.js';
import weaponList from '../data/weapons.js';

const combat = {
  hasEnemyID(row, col) {
    const tile = this.state.mapData.tileMap[this.getTileIndex(row, col)];
    
    if (tile.hasOwnProperty('enemyID')) {
      return true;
    } else {
      return false;
    }   
  },

  setEnemyID(row, col) {
    const mapData = {...this.state.mapData};
    const tile = this.getTile(row, col);
    const enemies = {...this.state.enemies};
    const enemy = JSON.parse(JSON.stringify(tiles[tile.name])); //TODO: Fix so that it makes a copy of this enemy.
    const enemyID = 'enemy-' + Date.now();
    
    enemies[enemyID] = enemy;
    tile.enemyID = enemyID;
    mapData.tileMap[this.getTileIndex(row, col)] = tile; 

    this.setState({
      mapData,
      enemies
    })
  },

  handleFight(row, col) {
    const tileType = tiles[this.state.mapData.tileMap[this.getTileIndex(row, col)].name].kind;
    
    if (tileType !== 'enemy') {
      return;
    }

    if (!this.hasEnemyID(row, col)) {
      this.setEnemyID(row, col);
    }

    var enemyID = this.state.mapData.tileMap[this.getTileIndex(row, col)].enemyID;
    this.attackPlayer(enemyID);
    this.attackEnemy(enemyID);
  },

  attackPlayer(enemyID){
    let player = {...this.state.player};
    const enemy = enemyList[this.state.enemies[enemyID].name.toLowerCase().replace(/\s+/g, '')];
    const damage = enemy.getAttack();

    player.health -= damage;

    if (player.health < 1) {
      player.health = 0;
      this.setState({player});
      this.gameOver();
    } else {
      this.setState({player});
    }
  },

  attackEnemy(enemyID) {
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
  },

  calcPlayerAttack() {
    const weapon = this.state.player.weapon.name.toLowerCase().replace(/\s+/g, '');
    const weaponAttack = weaponList[weapon].getAttack();

    const min = this.state.player.minAttack;
    const max = this.state.player.minAttack;

    const playerAttack = Math.floor(Math.random() * (max - min + 1) + min);

    return weaponAttack + playerAttack;
  },

  killEnemy(enemyID) {
    const enemies = {...this.state.enemies};
    const mapData = {...this.state.mapData};
    const enemyIndex = this.getEnemyIndex(enemyID);

    this.pickUpItem(enemies[enemyID]);

    delete enemies[enemyID];
    mapData.tileMap[enemyIndex] = {name: `floor`};

    this.setState({enemies, mapData});
  },

  getEnemyIndex(enemyID) {
    const tileMap = this.state.mapData.tileMap;
    const testID = enemyID;
    
    for (var i = 0; i < tileMap.length; i++) {
      if (tileMap[i].hasOwnProperty(`enemyID`) && tileMap[i].enemyID === testID) {
        return(i);
      }
    }

    return -1; //this ensures we don't cause other functions to throw an error if the enemy doesn't exist. Instead, they'll update the array index -1, which is harmless.
  }



}

export default combat;