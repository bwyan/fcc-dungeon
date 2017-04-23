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
    const mapData = {...this.state.mapData};
    const player = {...this.state.player};

    const currentRow = this.state.player.position[0];
    const currentCol = this.state.player.position[1];


    delete mapData.tileMap[this.getTileIndex(currentRow, currentCol)].player;
    mapData.tileMap[this.getTileIndex(newRow, newCol)].player = true; //TODO: should I refactor this so that the player position isn't stored directly on the map? Each tile would get a 'hasPlayer' prop instead (derived from player.position).

    this.setLitTiles(this.getTileIndex(newRow, newCol));

    player.position = [newRow, newCol];

    this.setState({mapData, player});
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
  },

  toggleDarkMode() {
    let mapIsDark = this.state.mapIsDark;
    let mapData = {...this.state.mapData}; 

    if (mapIsDark) {
      mapData.tileMap.forEach(tile => {
        tile.dark = false;
      });      
    } else { //TODO: all of this code repeats code in helpers.js. Refactor so that we can call a common function for both cases.
      let tileMap = mapData.tileMap;
      let index = this.getTileIndex(this.state.player.position[0], this.state.player.position[1]);

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
    }
    mapIsDark = !mapIsDark;
    this.setState({mapIsDark, mapData}); 
    // this.setLitTiles(this.getTileIndex(this.state.player.position[0], this.state.player.position[1]));
  },


  openBorders(mapData) {
    let tileMap = mapData.tileMap;

    tileMap.forEach((tile, index, tileMap) => {
      if(index % mapData.columns === 0 || index % mapData.columns === mapData.columns - 1) {
        tileMap[index] = {name: 'floor'};
      }     

      if(index < mapData.columns) {
        tileMap[index] = {name: 'floor'};
      }

      if(index > tileMap.length - mapData.columns) {
        tileMap[index] = {name: 'floor'}; 
      }
    });

    return mapData;    
  },

  secureBorders(mapData) {
    const columns = mapData.columns;

    mapData.tileMap.forEach((tile, index, tileMap) => {
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

    return mapData;
  },

  resizeTileMap(mapData, rows, columns) {
    mapData.rows = rows;
    mapData.columns = columns;
    let tileMap = mapData.tileMap;

    if (tileMap.length < (rows * columns)) {
      for (var i = tileMap.length; i < rows * columns; i++) {
        tileMap.push({name: 'floor'})
      }
    } else if (tileMap.length > rows * columns) {
      tileMap.splice(rows * columns - tileMap.length);
    }

    return mapData;
  }

}
export default helpers;