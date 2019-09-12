import React from 'react';
import Button from './Button';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stack: ""
    }
    this.setStack = this.setStack.bind(this);

  }

  setStack = (char) => {
    if (typeof char === "object") {
      char = char.nativeEvent.data;
    }
    if (char) {
      this.setState((state) => {
        return {
          stack: state.stack.concat(char)
        }
      })
    }
    else {
      this.setState((state) => {
        return {
          stack: state.stack.slice(0, -1)
        }
      })
    }
  }

  render = () => {

    return (
      <div className="App-header">
        <div className="container-fluid">
          <div className="row" >
            <div className="col-md-12" style={{ display: 'table' }} >
              <div class="input-group mb-3">
                <input id="displayBar" type="text" className="inpFormat" value={this.state.stack} onChange={this.setStack} />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" style={{ width: '5.3rem' }} onClick={() => {
                    return this.setState({ stack: '' });
                  }} >C</button>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <Button char="7" setStack={this.setStack} />
            <Button char="8" setStack={this.setStack} />
            <Button char="9" setStack={this.setStack} />
            <Button char="/" setStack={this.setStack} />
          </div>
          <div className="row">
            <Button char="4" setStack={this.setStack} />
            <Button char="5" setStack={this.setStack} />
            <Button char="6" setStack={this.setStack} />
            <Button char="*" setStack={this.setStack} />
          </div>
          <div className="row">
            <Button char="1" setStack={this.setStack} />
            <Button char="2" setStack={this.setStack} />
            <Button char="3" setStack={this.setStack} />
            <Button char="-" setStack={this.setStack} />
          </div>
          <div className="row">
            <Button char="." setStack={this.setStack} />
            <Button char="0" setStack={this.setStack} />
            <Button char="=" setStack={this.setStack} />
            <Button char="+" setStack={this.setStack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
