import React, {Component} from 'react';

//data
import playerLevels from './data/playerLevels.js';
import weapons from './data/weapons.js';
import maps from './data/maps.js';

//components
import Board from './components/Board.js';

//styles
import './App.scss';

class App extends Component {
  
  componentWillMount() {
    this.setState({
      map: maps.l1,
      player: {
        health: playerLevels.l1.maxHealth,
        xp: 0,
        level: 1,
        minAttack: 1,
        maxAttack: 2,
        weapon: weapons.bat,        
      }
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Into the Dungeon…</h1>
        <Board mapData={this.state.map} />
      </div>
    )
  }
}

export default App;
