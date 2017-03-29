class Weapon {
	constructor(name, image, minAttack, maxAttack) {
		this.name = name;
		this.image = image;
		this.minAttack = minAttack;
		this.maxAttack = maxAttack;
	}

	get attack() {
		return Math.floor(Math.random() * (this.maxAttack - this.minAttack + 1) + this.minAttack);
	}
}

const weapons = {
	'stick': new Weapon('stick', '🌂', 0, 1),
	'bat': new Weapon('bat', '🏏', 5, 10),
	'partyhorn': new Weapon('partyhorn', '🎉', 7, 20)
}

export default weapons;