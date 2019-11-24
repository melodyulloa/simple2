
import React,{Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

class Welcome extends Component{
    render(){
        return (
            <div>
                <h1>Welcome to simplePOS</h1>
                <img
                  src="assets/welcomePic.png"
                />
            </div>
        )
    }
}

export default withRouter(Welcome);