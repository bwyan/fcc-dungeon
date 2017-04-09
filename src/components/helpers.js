const helpers = {
  changePlayerHealth(amount) {
      const player = {...this.state.player};
      const newHealth = player.health += amount;

      if (newHealth > player.maxHealth) {
        player.health = player.maxHealth;
      } else {
        player.health = newHealth;
      }
      
      this.setState({ player });
  }
}

export default helpers;