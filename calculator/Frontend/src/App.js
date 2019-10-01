import React from 'react';
import Button from './Button';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      display: "",
      leftOperand: null,
      rightOperand: null,
      operator: null,
      isItRightOperand: false
    }
    this.setDisplay = this.setDisplay.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
  }

  resetState = () => {
    this.setState({
      display: "",
      leftOperand: null,
      rightOperand: null,
      operator: null,
      isItRightOperand: false
    })
  }
  setDisplay = (char) => {
    if (typeof char === "object") {
      char = char.nativeEvent.data;
    }
    if (char) {
      this.setState((state) => {
        return {
          display: state.display.toString().concat(char)
        }
      })
    }
    else {
      this.setState((state) => {
        return {
          display: state.display.slice(0, -1)
        }
      })
    }
  }

  async getResults(leftOperand, rightOperand, operator, currentOperator) {
    const rawResponse = await fetch('/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ leftOperand: leftOperand, rightOperand: rightOperand, operator: operator })
    });
    debugger
    if (rawResponse.status === 500) {
      this.setState({
        display: "Server offline. Please try after some time."
      });
      setTimeout(this.resetState,2000);
    }
    const content = await rawResponse.json();
    this.setState({
      leftOperand: content.result,
      display: content.result,
      operator: currentOperator,
      isItRightOperand: false
    })
  }

  handleOperator = (event) => {
    const currentOperator = event;
    const { leftOperand, display, operator, isItRightOperand } = this.state;
    const inputValue = parseFloat(display);
    if (operator && isItRightOperand) {
      this.getResults(leftOperand, inputValue, operator, currentOperator);
      return;
    }
    if (leftOperand === null) {
      this.setState({
        leftOperand: inputValue,
        isItRightOperand: true,
        display: "",
        operator: currentOperator
      })
    }
    else if (isItRightOperand && !operator) {
      this.setState({
        leftOperand: inputValue,
        isItRightOperand: true,
        display: "",
        operator: currentOperator
      })
    }
    else if (operator) {
      this.setState({
        leftOperand: inputValue,
        isItRightOperand: true,
        display: "",
        operator: currentOperator
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
                <input id="displayBar" type="text" className="inpFormat" value={this.state.display} onChange={this.setDisplay} />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" style={{ width: '5.3rem' }} onClick={this.resetState} >C</button>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <Button char="7" clickEventHandler={this.setDisplay} />
            <Button char="8" clickEventHandler={this.setDisplay} />
            <Button char="9" clickEventHandler={this.setDisplay} />
            <Button char="/" clickEventHandler={this.handleOperator} />
          </div>
          <div className="row">
            <Button char="4" clickEventHandler={this.setDisplay} />
            <Button char="5" clickEventHandler={this.setDisplay} />
            <Button char="6" clickEventHandler={this.setDisplay} />
            <Button char="*" clickEventHandler={this.handleOperator} />
          </div>
          <div className="row">
            <Button char="1" clickEventHandler={this.setDisplay} />
            <Button char="2" clickEventHandler={this.setDisplay} />
            <Button char="3" clickEventHandler={this.setDisplay} />
            <Button char="-" clickEventHandler={this.handleOperator} />
          </div>
          <div className="row">
            <Button char="." clickEventHandler={this.setDisplay} />
            <Button char="0" clickEventHandler={this.setDisplay} />
            <Button char="=" clickEventHandler={this.handleOperator} />
            <Button char="+" clickEventHandler={this.handleOperator} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
