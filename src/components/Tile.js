import React from 'react';
import tiles from '../data/tiles.js'

class Tile extends React.Component {
	handleClick(e) {
		e.preventDefault();
		const row = Number(e.target.getAttribute("data-row"));
		const col = Number(e.target.getAttribute("data-col"));

		this.props.toggleIsAliveState(row, col);
	}

	render() {
		const name = this.props.tileData.name;
		const player = this.props.tileData.player === true ? true : false;

		return(
			<div className={'tile ' + name} data-row={this.props.rowNumber} data-col={this.props.colNumber} onClick={(e) => this.handleClick(e)}>{player ? '😀' : tiles[name].icon}</div>
		)
	}
}

export default Tile;