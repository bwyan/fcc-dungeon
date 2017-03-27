import React, {Component} from 'react';

//styles
import './App.scss';

class App extends Component {
  
  componentWillMount() {
    this.setState({
      map: {
        rows: 100,
        columns: 100,
        tiles: [
          [{type: 'wall'}, {type: 'wall'}, {type: 'wall'}, {type: 'wall'}, {type: 'wall'}, {type: 'wall'}, {type: 'wall'}],
          [{type: 'wall'}, {type: 'floor'}, {type: 'floor'}, {type: 'floor'}, {type: 'floor'}, {type: 'floor'}, {type: 'wall'}],
          [{type: 'wall'}, {type: 'floor'}, {type: 'enemy', health: 3, reward: {xp: 3, health: 1}}, {type: 'floor'}, {type: 'floor'}, {type: 'floor'}, {type: 'wall'}],
          [{type: 'wall'}, {type: 'wall'}, {type: 'wall'}, {type: 'wall'}, {type: 'wall'}, {type: 'wall'}, {type: 'wall'}]
        ]
        //store info about walls, item locations, 
      },
      player: {
        health: 100,
        xp: 0,
        level: 1,
        minAttack: 1,
        maxAttack: 2,
        weapon: { //should move the weapon stats to a different object
          type: 'stick',
          minDamage: 1,
          maxDamage: 2
        }
      }

    });
  }

  render() {
    return (
      <div className="App">
        <h1>Into the Dungeon…</h1>
      </div>
    )
  }
}

export default App;
