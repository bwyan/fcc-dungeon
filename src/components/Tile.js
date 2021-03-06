import React from 'react';
import tiles from '../data/tiles.js'

class Tile extends React.Component {
	handleClick(e) {
		e.preventDefault();

		const row = this.props.rowNumber;
		const col = this.props.colNumber;
		console.log(row, col);

		this.props.setTileAtPosition({name: 'wall'}, [row, col]);
	}

	render() {
		const name = this.props.tileData.name;
		const player = this.props.tileData.player === true ? true : false;
		const dark = this.props.tileData.dark;

		return(
			<div className={dark ? 'tile dark' : 'tile ' + name} data-row={this.props.rowNumber} data-col={this.props.colNumber} onClick={(e) => this.handleClick(e)}>
				<span className={dark ? 'tile-icon dark' : 'tile-icon'}>{player ? '😀' : tiles[name].icon}</span>
			</div>
		)
	}
}

export default Tile;