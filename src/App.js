import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { projects: [] }
  }
  componentDidMount() {
    // const data = 
    fetch(
      'http://localhost:3000/graphql',
      {
        method: 'POST',
        body: '{"query": "{ projects { id, name } }"}',
        headers: new Headers({ 'Content-Type': 'application/json' }),
      },
    ).then(i => i.json())
    .then(i => this.setState({ projects: i.data.projects }))
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>project-man 2017</h2>
        </div>
          {
            (this.state.projects.length > 0)
              ? (<div>
                  <h3>Projects:</h3>
                  <ul>
                    {this.state.projects.map(i => <li>{i.name}</li>)}
                  </ul>
                </div>)
              : (<p>not yet loaded ...</p>)

          }
      </div>
    );
  }
}

export default App;
