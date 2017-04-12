// import player from '../actions/player.js'
import weapons from '../data/weapons.js'

const item = {
  pickUpItem(item, row, col) {
    const rewards = item.rewards;

    Object.keys(rewards).forEach(reward => {
      this.getReward(reward, rewards[reward]);
    })

    if (row && col) {this.removeItem(row, col);}
  },

  getReward(reward, value) {
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
  },

  removeItem(row, col) {
    let mapData = {...this.state.mapData};

    mapData.tileMap[this.getTileIndex(row, col)].name = 'floor';

    this.setState({mapData});
  },

  setItem(itemName, row, col) {
    let mapData = this.state.mapData;

    mapData.tileMap[this.getTileIndex(row, col)].name = itemName;

    this.setState({mapData});
  },

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
}

export default item;