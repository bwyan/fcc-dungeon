class Scenery {
	constructor(name, kind, icon) {
		this.name = name;
		this.kind = kind;
		this.icon = icon;
	}
}

class Enemy {
	constructor(name, kind, icon, health, reward) {
		this.name = name;
		this.kind = 'enemy';
		this.icon = icon;
		this.health = health;
		this.reward = reward; //could add a getReward method that returns a semi-random reward.
	}
}


const tiles = {
		'wall': new Scenery('wall', 'barrier', '🚧'),
		'floor': new Scenery('floor', 'pathway', '⬜️'),
		'clown': new Enemy('clown', 'enemy', '🤡', 3, {xp: 3, health: 1})
}

export default tiles;