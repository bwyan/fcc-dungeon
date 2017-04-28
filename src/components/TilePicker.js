import React from 'react';
import TilePickerButton from './TilePickerButton.js'
import tiles from '../data/tiles.js'

class TilePicker extends React.Component {


	render() {
		let pickerButtons = [];

		Object.keys(tiles).forEach((tile, index) => {
			console.log(tiles[tile])
			pickerButtons.push(<TilePickerButton tile={tiles[tile]} key={index} setTileToAdd={this.props.setTileToAdd}/>);
		});

		return(
			<div>
				<h2>Tile Picker</h2>
				{pickerButtons}
			</div>	
		)
	}
	
}

export default TilePicker;