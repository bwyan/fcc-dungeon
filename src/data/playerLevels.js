const playerLevels = [
	{
		xp: 0,
		maxXP: 9,
		minAttack: 0,
		maxAttack: 2,
		maxHealth: 100
	},
	{
		xp: 10,
		minAttack: 1,
		maxAttack: 4,
		maxHealth: 105
	},
	{
		xp: 25,
		minAttack: 3,
		maxAttack: 5,
		maxHealth: 115
	},
	{
		xp: 50,
		minAttack: 5,
		maxAttack: 10,
		maxHealth: 120
	},
	{
		xp: 100,
		minAttack: 8,
		maxAttack: 13,
		maxHealth: 140
	},
	{
		xp: 200,
		minAttack: 12,
		maxAttack: 20,
		maxHealth: 200
	}
]

export default playerLevels;

// OBJECT
// const playerLevels = {
// 	'l1': {
// 		xp: 0,
// 		maxXP: 9,
// 		nextLevel: l2,
// 		minAttack: 0,
// 		maxAttack: 2,
// 		maxHealth: 100
// 	},
// 	'l2': {
// 		xp: 10,
// 		minAttack: 1,
// 		maxAttack: 4,
// 		maxHealth: 105
// 	},
// 	'l3': {
// 		xp: 25,
// 		minAttack: 3,
// 		maxAttack: 5,
// 		maxHealth: 115
// 	},
// 	'l4': {
// 		xp: 50,
// 		minAttack: 5,
// 		maxAttack: 10,
// 		maxHealth: 120
// 	},
// 	'l5': {
// 		xp: 100,
// 		minAttack: 8,
// 		maxAttack: 13,
// 		maxHealth: 140
// 	},
// 	'l6': {
// 		xp: 200,
// 		minAttack: 12,
// 		maxAttack: 20,
// 		maxHealth: 200
// 	}
// }

// export default playerLevels;