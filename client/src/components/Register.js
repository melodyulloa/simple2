import React,{Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

class Register extends React.Component {
  constructor (props){
       super(props);
       this.state={
         firstName:'',
         lastName: '',
         password:'',
         confirmationPassword: '',
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
    url: '/api/users',
    data: body
  })
  .then(response=>{
       window.x = response;
       if(response.status == 200){ // success
          localStorage.setItem('jwtToken', response.token);
          this.props.history.push('/profile');
       }
       
  })
  .catch(error =>{
       console.log(error);
  })
  // alert('Form has been submitted');
  event.preventDefault();
}

  

  render() {
    return(
        <div className="card shadow-lg o-hidden border-0 my-5" style={{width: 1200 + 'px',margin: 0 +' auto',marginTop: 80+'px !important'}}>
            <div className="card-body p-0" >
                <div className="row">
                    <div className="col-lg-5 d-none d-lg-flex">
                        <div className="flex-grow-1 bg-register-image"  style={{backgroundImage: 'url("assets/dogs/image2.jpeg")',backgroundPosition: 'center'}}></div>
                    </div>
                    <div className="col-lg-7">
                        <div className="p-5">
                            <div className="text-center">
                                <h4 className="text-dark mb-4">Create an Account!</h4>
                            </div>
                            <form className="user" onSubmit ={this.handleSubmit} id='registrationForm'>
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0"><input className="form-control form-control-user" type="text" id="exampleFirstName" placeholder="First Name" name="first_name" value={this.state.firstName} onChange={(e) => this.handleChange("firstName",e)}/></div>
                                    <div className="col-sm-6"><input className="form-control form-control-user" type="text" id="exampleFirstName" placeholder="Last Name" name="last_name"  onChange={(e) => this.handleChange("lastName",e)} /></div>
                                </div>
                                <div className="form-group"><input className="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Email Address" name="email" onChange={(e) => this.handleChange("email",e)}/></div>
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0"><input className="form-control form-control-user" type="password" id="examplePasswordInput" placeholder="Password" name="password" onChange={(e) => this.handleChange("password",e)}/></div>
                                    <div className="col-sm-6"><input className="form-control form-control-user" type="password" id="exampleRepeatPasswordInput" placeholder="Repeat Password" name="password_repeat" onChange={(e) => this.handleChange("confirmationPassword",e)}/></div>
                                </div><button className="btn btn-primary btn-block text-white btn-user" type="submit">Register Account</button>
                                

                        
                                <hr></hr>
                            </form>
                            
                            <div className="text-center"><a className="small" href="forgot-password.html">Forgot Password?</a></div>
                            <div className="text-center"><a className="small" href="index.html">Already have an account? Login!</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    );
  }
}


export default withRouter(Register);
