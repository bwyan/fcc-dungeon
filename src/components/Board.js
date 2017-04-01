import React from 'react';
import Row from './Row.js'

class Board extends React.Component {
	render() {
		let rows = [];
		const columns = this.props.mapData.columns;

		for (var i = 0; i < this.props.mapData.rows; i++) {
			const start = i * columns;
			const end = start + columns;

			rows.push(<Row className={`row row-${i}`} key={i} rowNumber={i} columns={columns} rowData={this.props.mapData.tileMap.slice(start, end)} toggleSelectedState={this.props.toggleIsAliveState}/>)
		}

		return (
			<div className="map">
					{rows}	
			</div>
		)
	}
}

export default Board;