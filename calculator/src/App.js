import React from 'react';
import Button from './Button';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      stack : ""
    }
    this.setStack = this.setStack.bind(this);
  }

  setStack = (a) =>{
    console.log(a);
  }

  render = () => {
    return (
      <div className="App-header">
        <div className="container-fluid">
          <div className="row" >
            <div className="col-md-12" style={{ display: 'table' }} >
              <input id="displayBar" type="text" className="inpFormat" value={this.state.stack}/>
            </div>
          </div>
          <br />
          <div className="row">
            <Button char="7" setStack={this.setStack}/>
            <Button char="8" />
            <Button char="9" />
            <Button char="/" />
          </div>
          <div className="row">
            <Button char="4" />
            <Button char="5" />
            <Button char="6" />
            <Button char="*" />
          </div>
          <div className="row">
            <Button char="1" />
            <Button char="2" />
            <Button char="3" />
            <Button char="-" />
          </div>
          <div className="row">
            <Button char="." />
            <Button char="0" />
            <Button char="=" />
            <Button char="+" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
