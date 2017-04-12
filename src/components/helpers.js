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
  },

  getTile(row, col) {
    return this.state.mapData.tileMap[row * this.state.mapData.columns + col]
  },

  getTileIndex(row, col) {
    return row * this.state.mapData.columns + col;
  },

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
  },

  setLitTiles(index) {
    if (this.state.mapIsDark) {
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
  }
}

export default helpers;