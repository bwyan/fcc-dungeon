import playerLevels from '../data/playerLevels.js'

const player = {

  changePlayerXP(amount) {
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
  },

  setPlayerLevel(level) {
    let player = {...this.state.player};

    if (level > playerLevels.length - 1) {
      return;
    }
    player.level = level;
    player.maxHealth = playerLevels[level].maxHealth;
    player.health = player.maxHealth;
    player.minAttack = playerLevels[level].minAttack;
    player.maxAttack = playerLevels[level].maxAttack;

    this.setState({player});
  }
}

export default player;