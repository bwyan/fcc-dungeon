class Enemy {
	constructor(name, icon, health, minAttack, maxAttack, rewards) {
		this.name = name;
		this.kind = 'enemy';
		this.icon = icon;
		this.health = health;
		this.minAttack = minAttack;
		this.maxAttack = maxAttack;
		this.rewards = rewards; 
	}		

	getAttack() {
		return Math.floor(Math.random() * (this.maxAttack - this.minAttack + 1) + this.minAttack);
	}

}

const enemies = {
	'clown': new Enemy('Clown', '🤡', 3, 0, 5, {xp: 3, health: 1}),
	'goblin': new Enemy('Goblin', '👺', 10, 1, 10, {xp: 10, health: 5})
}

export default enemies;


