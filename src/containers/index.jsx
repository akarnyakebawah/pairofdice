import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// eslint-disable-next-line react/jsx-filename-extension
class App extends Component {
  render() {
    return (
      <div className="App">        
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title" onClick={() => alert('hello')}>Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const Container = styled.div`
  width: 100%;
  
`;

export default App;
