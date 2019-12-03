import React, { Component } from 'react';
import Token from'../../public/assets/js/generate-secret'
import axios from 'axios';

class AppleSignIn extends Component {
    constructor(props) {
    super(props);
    this.state = {
        email: '',
        name: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
}
  
    render() {
        return (
            <div>   
                <script type="text/javascript" src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"></script>
        <div style="width: 210px;height:40px;" id="appleid-signin" data-color="black" data-border="true" data-type="sign in" onClick={(e) => this.handleClick(e)}></div>
        <script type="text/javascript">
            {)
            const buttonElement = document.getElementById('appleid-signin');
  buttonElement.addEventListener('click', () => {
   AppleID.auth.signIn();
  })}
        </script>
            </div>
        )
    }
}

export default AppleSignIn;