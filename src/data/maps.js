const maps = {
  'm0': {
    rows: 7,
    columns: 7,
    tileMap: [
      {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'},
      {name: 'wall'}, {name: 'floor'}, {name: 'floor'}, {name: 'floor'}, {name: 'floor'}, {name: 'floor'}, {name: 'wall'},
      {name: 'wall'}, {name: 'floor'}, {name: 'potato'}, {name: 'floor'}, {name: 'floor'}, {name: 'floor'}, {name: 'wall'},
      {name: 'wall'}, {name: 'partyhorn'}, {name: 'goblin'}, {name: 'floor'}, {name: 'floor'}, {name: 'floor'}, {name: 'wall'},
      {name: 'wall'}, {name: 'floor'}, {name: 'floor'}, {name: 'floor'}, {name: 'floor'}, {name: 'floor'}, {name: 'wall'},
      {name: 'wall'}, {name: 'floor'}, {name: 'floor'}, {name: 'floor'}, {name: 'floor'}, {name: 'floor'}, {name: 'wall'},
      {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}
    ],
    startingPosition: [1, 1]
  },
  'm1': {
    rows: 7,
    columns: 7,
    tileMap: [
      {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'},
      {name: 'wall'}, {name: 'floor'}, {name: 'potato'}, {name: 'wall'}, {name: 'floor'}, {name: 'goblin'}, {name: 'wall'},
      {name: 'wall'}, {name: 'floor'}, {name: 'floor'}, {name: 'floor'}, {name: 'floor'}, {name: 'floor'}, {name: 'wall'},
      {name: 'wall'}, {name: 'partyhorn'}, {name: 'goblin'}, {name: 'wall'}, {name: 'floor'}, {name: 'floor'}, {name: 'wall'},
      {name: 'wall'}, {name: 'floor'}, {name: 'clown'}, {name: 'floor'}, {name: 'floor'}, {name: 'floor'}, {name: 'wall'},
      {name: 'wall'}, {name: 'package'}, {name: 'floor'}, {name: 'bat'}, {name: 'floor'}, {name: 'door', warp: 'm2'}, {name: 'wall'},
      {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}
    ],
    startingPosition: [1, 1]
  },
  'm2': {
    rows: 10,
    columns: 10,
    tileMap: [
      {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'},
      {name: 'wall'}, {name: 'wall'}, {name: 'floor'}, {name: 'wall'}, {name: 'potato'}, {name: 'wall'}, {name: 'floor'}, {name: 'goblin'}, {name: 'floor'}, {name: 'wall'},
      {name: 'wall'}, {name: 'floor'}, {name: 'floor'}, {name: 'wall'}, {name: 'floor'}, {name: 'floor'}, {name: 'wall'}, {name: 'floor'}, {name: 'floor'}, {name: 'wall'},
      {name: 'wall'}, {name: 'partyhorn'}, {name: 'goblin'}, {name: 'wall'}, {name: 'floor'}, {name: 'floor'}, {name: 'wall'}, {name: 'floor'}, {name: 'floor'}, {name: 'wall'},
      {name: 'wall'}, {name: 'door', warp: 'm1'}, {name: 'clown'}, {name: 'clown'}, {name: 'floor'}, {name: 'clown'}, {name: 'floor'}, {name: 'floor'}, {name: 'potato'}, {name: 'wall'},
      {name: 'wall'}, {name: 'package'}, {name: 'floor'}, {name: 'bat'}, {name: 'floor'}, {name: 'floor'}, {name: 'wall'}, {name: 'floor'}, {name: 'floor'}, {name: 'wall'},
      {name: 'wall'}, {name: 'floor'}, {name: 'floor'}, {name: 'wall'}, {name: 'potato'}, {name: 'floor'}, {name: 'wall'}, {name: 'floor'}, {name: 'floor'}, {name: 'wall'},
      {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'floor'}, {name: 'wall'}, {name: 'wall'}, {name: 'floor'}, {name: 'floor'}, {name: 'wall'},
      {name: 'wall'}, {name: 'floor'}, {name: 'floor'}, {name: 'floor'}, {name: 'floor'}, {name: 'wall'}, {name: 'partyhorn'}, {name: 'goblin'}, {name: 'floor'}, {name: 'wall'},
      {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}, {name: 'wall'}
    ],
    startingPosition: [2, 5]
  }
}

export default maps;