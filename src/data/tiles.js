import weapons from './weapons.js'

class Scenery {
	constructor(name, kind, icon) {
		this.name = name;
		this.kind = kind;
		this.icon = icon;
	}
}

class Enemy {
	constructor(name, kind, icon, health, rewards) {
		this.name = name;
		this.kind = 'enemy';
		this.icon = icon;
		this.health = health;
		this.rewards = rewards; //could add a getReward method that returns a semi-random reward.
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
		'clown': new Enemy('clown', 'enemy', '🤡', 3, {xp: 3, health: 1}),
		'potato': new Item('potato', '🥔', {xp: 0, health: 2}),
		'package': new Item('package', '📦', {xp: 10, health: 5, weapon: 'umbrella'}),
		'bat': weapons.bat,
		'partyhorn': weapons.partyhorn,
		'umbrella': weapons.umbrella
}

export default tiles;