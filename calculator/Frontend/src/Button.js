import React from 'react';

class Button extends React.Component {
    handleClick = (event) => {
        this.props.setStack(event.target.value);
    }

    render = () => {
        return (
            < div className="col-md-3" >
                <button type="button"
                    value={this.props.char}
                    className="btn btn-success btn-md btn-block btnFormat"
                    onClick={this.handleClick}
                >
                    {this.props.char}
                </button>
            </div >
        )

    }
}

export default Button