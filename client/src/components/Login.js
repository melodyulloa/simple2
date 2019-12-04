import React,{Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
const Swal = require('sweetalert2');

class Login extends React.Component {
  constructor (props){
       super(props);
       this.state={
         password:'',
         email:''
       };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
  }


    componentWillMount(){
        this.checkAuth();
    }
    
    checkAuth(){
      
        if(localStorage.jwtToken){
            this.props.history.push("/profile")
        }
    }



//called everytime user changes form input
  handleChange(name, event){
    this.setState({
        [name]: event.target.value
    });
  }
  
    handleSubmit(event){
          var body = this.state;

          let url = 'api/registration';
          axios({
            method: 'post',
            url: '/api/login',
            data: body
          })
          .then(response=>{
            //Set token to local storage
            const {token} = response.data;
            localStorage.setItem("jwtToken", token);
            //Set token to Auth header
            setAuthToken(token);
            //Decode token to get user data
            const decoded = jwt_decode(token);
            window.x = decoded;
            //Set current user
            localStorage.setItem("currentUser", decoded);
            
            // this.props.history.push('/profile');
            window.location.reload();
              
          })
          .catch(error =>{
              console.log(error.response.data);
              window.x = error;
              Swal.fire({
                title: 'Error!',
                text: error.response.data,
                icon: 'error',
                confirmButtonText: 'Cool'
              })
          })
          // alert('Form has been submitted');
          event.preventDefault();
    }

  


  render() {
    return(
        <div className="row justify-content-center">
      <div className="col-md-9 col-lg-12 col-xl-10" style={{marginTop:80+'px'}}>
        <div className="card shadow-lg o-hidden border-0 my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-6 d-none d-lg-flex">
                <div className="flex-grow-1 bg-login-image"  style={{backgroundImage: 'url("assets/dogs/image3.jpeg")',backgroundPosition: 'center'}}></div>
              </div>
              <div className="col-lg-6">
                <div className="p-5">
                  <div className="text-center">
                    <h4 className="text-dark mb-4">Welcome Back!</h4>
                  </div>
                  <form className="user"  onSubmit ={this.handleSubmit} id='loginForm'>
                    <div className="form-group"><input className="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." name="email" onChange={(e) => this.handleChange("email",e)}/></div>
                    <div className="form-group"><input className="form-control form-control-user" type="password" id="exampleInputPassword" placeholder="Password" name="password" onChange={(e) => this.handleChange("password",e)}/></div>
                    <div className="form-group">
                      <div className="custom-control custom-checkbox small">
                        <div className="form-check"><input className="form-check-input custom-control-input" type="checkbox" id="formCheck-1" /><label className="form-check-label custom-control-label" for="formCheck-1">Remember Me</label></div>
                      </div>
                    </div><button className="btn btn-primary btn-block text-white btn-user" type="submit">Login</button>
                    <hr />
                    
                    <hr />
                  </form>
                
                  
                  <div className="text-center"><a className="small" href="register">Create an Account!</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}


export default withRouter(Login);
