import React from 'react';

class Editor extends React.Component {
	constructor() {
		super();

		this.changeDimensions = this.changeDimensions.bind(this);
	}

  changeDimensions(event) {
    event.preventDefault();
    this.props.setGridDimensions(Number(this.rowField.value), Number(this.columnField.value));
  }


	render() {
		return(
      <form>
	      <label>
	      	Rows
	      	<input type="number" min="1" max="50" defaultValue={this.props.mapData.rows} ref={(input) => {this.rowField = input}}/>
      	</label>
	      <label>
	      	Columns
	      	<input type="number" min="1" max="50" defaultValue={this.props.mapData.columns} ref={(input) => {this.columnField = input}}/>
	      </label>
	      <button type="submit" onClick={this.changeDimensions}>Update Grid Size</button>
     </form>
		)
	}
	
}


export default Editor;