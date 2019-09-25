import React from 'react';
import cookie from 'react-cookies';

class SignOut extends React.Component {
    componentWillMount=()=>{
            cookie.remove('cookie', { path: '/' })
    }
    render = () => {
        return (
            <div className="App-header">
                You have succesfully logged out
            </div>
        )
    }
}

export default SignOut;