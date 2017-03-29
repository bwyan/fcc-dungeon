import React from 'react';
import Tile from './Tile.js';

class Row extends React.Component {
	render() {
		let tiles = [];

		for (var i = 0; i < this.props.columns; i++) {
			tiles.push(<Tile key={i} rowNumber={this.props.rowNumber} colNumber={i} tileData={this.props.rowData[i]}/>)
		}		

		return(
			<div className="row">
				{tiles}
			</div>
		)
	}
}

export default Row;