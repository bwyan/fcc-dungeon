import React from 'react';

class TilePickerButton extends React.Component {
	render() {
		return(
			<div className="tilePickerButton">
				{this.props.tile.icon}
			</div>
		)
	}
}

export default TilePickerButton;