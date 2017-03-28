import React from 'react';
import Row from './Row.js'

class Board extends React.Component {
	render() {
		let rows = [];

		for (var i = 0; i < this.props.mapData.rows; i++) {
			rows.push(<Row className={`row row-${i}`} key={i} rowNumber={i} columns={this.props.columns} rowData={this.props.mapData[i]} toggleIsAliveState={this.props.toggleIsAliveState}/>)
		}

		return (
			<div className="map">
					{rows}	
			</div>
		)
	}
}

export default Board;