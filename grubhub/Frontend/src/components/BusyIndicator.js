import React from 'react';

let BusyIndicator = () => {
  return (
    <div className="App-header">
      <div className="text-center">
        <div className="spinner-border" role="status"
          style={{ width: '5rem', height: '5rem' }}>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div >
  )
}

export default BusyIndicator;