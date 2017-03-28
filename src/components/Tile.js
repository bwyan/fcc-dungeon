import React from 'react';

class Tile extends React.Component {
	handleClick(e) {
		e.preventDefault();
		const row = Number(e.target.getAttribute("data-row"));
		const col = Number(e.target.getAttribute("data-col"));

		this.props.toggleIsAliveState(row, col);
	}

	render() {
		return(
			<div data-row={this.props.rowNumber} data-col={this.props.colNumber} onClick={(e) => this.handleClick(e)}>{this.props.isAlive ? '🌺' : '🌫'}</div>
		)
	}
}

export default Tile;