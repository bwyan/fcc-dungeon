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
	'barehands': new Weapon('Bare Hands', '🖐', 0, 0),
	'umbrella': new Weapon('Umbrella', '🌂', 0, 1),
	'bat': new Weapon('Bat', '🏏', 5, 10),
	'partyhorn': new Weapon('Partyhorn', '🎉', 7, 20),
}

export default weapons;