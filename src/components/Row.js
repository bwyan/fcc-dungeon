import React from 'react';
import Tile from './Tile.js';

class Row extends React.Component {
	render() {
		let cells = []
		let aliveCells = this.props.aliveCells;

		for (var i = 0; i < this.props.columns; i++) {
			cells.push(<Tile key={i} rowNumber={this.props.rowNumber} colNumber={i} type={this.props.type}/>)
		}		

		return(
			<div className="row">
				{cells}
			</div>
		)
	}
}

export default Row;