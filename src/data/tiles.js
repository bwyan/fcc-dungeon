import weapons from './weapons.js'
import enemies from './enemies.js'

class Scenery {
	constructor(name, kind, icon) {
		this.name = name;
		this.kind = kind;
		this.icon = icon;
	}
}

class Item {
	constructor(name, icon, rewards) {
		this.name = name;
		this.kind = 'item';
		this.icon = icon;
		this.rewards = rewards; //could add a getReward method here too.
	}
}

const tiles = {
		'wall': new Scenery('wall', 'barrier', '🚧'),
		'floor': new Scenery('floor', 'pathway', ''),
		'door': new Scenery('door', 'warp', '🚪'),
		'potato': new Item('potato', '🥔', {xp: 0, health: 2}),
		'package': new Item('package', '📦', {xp: 10, health: 5, weapon: 'umbrella'})
}

Object.keys(weapons).forEach(weapon => {
	tiles[weapon] = (weapons[weapon]);
});

Object.keys(enemies).forEach(enemy => {
	tiles[enemy] = (enemies[enemy]);
});

export default tiles;