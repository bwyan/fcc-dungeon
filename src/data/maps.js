const maps = {
	'l1': {
    rows: 4,
    columns: 7,
    tiles: [
      [{type: 'wall'}, {type: 'wall'}, {type: 'wall'}, {type: 'wall'}, {type: 'wall'}, {type: 'wall'}, {type: 'wall'}],
      [{type: 'wall'}, {type: 'floor'}, {type: 'floor'}, {type: 'floor'}, {type: 'floor'}, {type: 'floor'}, {type: 'wall'}],
      [{type: 'wall'}, {type: 'floor'}, {type: 'enemy', appearance:'🤡', health: 3, reward: {xp: 3, health: 1}}, {type: 'floor'}, {type: 'floor'}, {type: 'floor'}, {type: 'wall'}],
      [{type: 'wall'}, {type: 'wall'}, {type: 'wall'}, {type: 'wall'}, {type: 'wall'}, {type: 'wall'}, {type: 'wall'}]
    ]
  }
}

export default maps;