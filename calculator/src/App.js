import React from 'react';
import './App.css';

class App extends React.Component{

  render  = () => {
  return (
    <div className="App-header">
      <div className="container-fluid">
        <div className="row" >
          <div class="col-md-12" style={{ display: 'table' }} >
            <input type="text" className="inpFormat" />
            
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-3">
            <button type="button" className="btn btn-success btn-md btn-block btnFormat">
              7
			      </button>
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-success btn-md btn-block btnFormat">
              8
			      </button>
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-success btn-md btn-block btnFormat">
              9
			      </button>
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-success btn-md btn-block btnFormat">
              /
			      </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <button type="button" className="btn btn-success btn-block btnFormat">
              4
			      </button>
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-success btn-block btnFormat">
              5
			      </button>
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-success btn-block btnFormat">
              6
			      </button>
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-success btn-block btnFormat">
              *
			      </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <button type="button" className="btn btn-success btn-block btnFormat">
              1
			      </button>
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-success btn-block btnFormat">
              2
			      </button>
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-success btn-block btnFormat">
              3
			      </button>
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-success btn-block btnFormat">
              -
			      </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <button type="button" className="btn btn-success btn-block btnFormat">
              .
			      </button>
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-success btn-block btnFormat">
              0
			      </button>
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-success btn-block btnFormat">
              =
			      </button>
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-success btn-block btnFormat">
              +
			      </button>
          </div>
        </div>
      </div>
    </div>
  );
}
}

export default App;
