import React from 'react';
import HUDItem from './HUDItem.js'

class HUD extends React.Component {
	render() {
		const player = this.props.player;

		return(
			<div className='HUD'>
				<HUDItem label='Level' value={player.level} />
				<HUDItem label='Experience' value={player.xp} />
				<HUDItem label='Health' value={player.health} />
				<HUDItem label='Weapon' value={player.weapon.name} image={player.weapon.image}/>
			</div>
		)
	}
}

export default HUD;