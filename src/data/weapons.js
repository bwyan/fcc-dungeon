class Weapon {
	constructor(name, icon, minAttack, maxAttack) {
		this.name = name;
		this.icon = icon;
		this.minAttack = minAttack;
		this.maxAttack = maxAttack;
		this.kind = 'weapon';
	}

	get attack() {
		return Math.floor(Math.random() * (this.maxAttack - this.minAttack + 1) + this.minAttack);
	}
}

const weapons = {
	'umbrella': new Weapon('umbrella', '🌂', 0, 1),
	'bat': new Weapon('bat', '🏏', 5, 10),
	'partyhorn': new Weapon('partyhorn', '🎉', 7, 20)
}

export default weapons;