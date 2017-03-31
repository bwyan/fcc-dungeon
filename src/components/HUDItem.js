import React from 'react';

class HUDItem extends React.Component {
	render() {
		return(
			<div className='HUD-item'>
				{this.props.label}: {this.props.value} {this.props.image ? this.props.image : null}
			</div>
		)
	}
}

export default HUDItem;