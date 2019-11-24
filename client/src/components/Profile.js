
import React,{Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

class Profile extends Component{
    constructor (props){
        super(props);
        this.state={
          firstName:'melo',
          lastName: 'cara',
          email:'fffggh'
        };
 
    this.handleChange = this.handleChange.bind(this);
    //    this.handleSubmit=this.handleSubmit.bind(this);
   }

   //called everytime user changes form input
    handleChange(name, event){
        this.setState({
            [name]: event.target.value
        });
    }

    componentWillMount(){
        this.checkAuth();
    }
     
    checkAuth(){

        // axios({
        //     method: 'get',
        //     url: 'http://localhost:3001/api/profile'
        //   })
        //   .then(response=>{
        //        window.x = response;
        //     //    if(response.status == 200){ // success
        //     //       localStorage.setItem('userToken', response.token);
        //     //       this.props.history.push('/profile');
        //     //    }
               
        //   })
        //   .catch(error =>{
        //        console.log(error);
        //   })


        if(!localStorage.userToken){
            this.props.history.push("/login")
        }
    }

    componentDidMount(){
        // let token = localStorage.userToken;
        // console.log("token", token);
    }


    render(){
        return (
            <div id="wrapper">

                <div className="d-flex flex-column" id="content-wrapper">
                    <div id="content" >
                        
                    <div className="container-fluid">
                        <h3 className="text-dark mb-4">Profile</h3>
                        <div className="row mb-3">
                            <div className="col-lg-4">
                                <div className="card mb-3">
                                    <div className="card-body text-center shadow"><img className="rounded-circle mb-3 mt-4" src="assets/dogs/image2.jpeg" width="160" height="160" />
                                        <div className="mb-3"><button className="btn btn-primary btn-sm" type="button">Change Photo</button></div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="col-lg-8">
                                <div className="row mb-3 d-none">
                                    <div className="col">
                                        <div className="card text-white bg-primary shadow">
                                            <div className="card-body">
                                                <div className="row mb-2">
                                                    <div className="col">
                                                        <p className="m-0">Peformance</p>
                                                        <p className="m-0"><strong>65.2%</strong></p>
                                                    </div>
                                                    <div className="col-auto"><i className="fas fa-rocket fa-2x"></i></div>
                                                </div>
                                                <p className="text-white-50 small m-0"><i className="fas fa-arrow-up"></i>&nbsp;5% since last month</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card text-white bg-success shadow">
                                            <div className="card-body">
                                                <div className="row mb-2">
                                                    <div className="col">
                                                        <p className="m-0">Peformance</p>
                                                        <p className="m-0"><strong>65.2%</strong></p>
                                                    </div>
                                                    <div className="col-auto"><i className="fas fa-rocket fa-2x"></i></div>
                                                </div>
                                                <p className="text-white-50 small m-0"><i className="fas fa-arrow-up"></i>&nbsp;5% since last month</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="card shadow mb-3">
                                            <div className="card-header py-3">
                                                <p className="text-primary m-0 font-weight-bold">User Settings</p>
                                            </div>
                                            <div className="card-body">
                                                <form>
                                                    <div className="form-row">
                                                        <div className="col">
                                                            <div className="form-group"><label for="username"><strong>Username</strong></label><input className="form-control"  type="text" placeholder="user.name" name="username" /></div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="form-group"><label for="email"><strong>Email Address</strong></label><input className="form-control" type="email" placeholder="user@example.com" name="email" value={this.state.email} onChange={(e) => this.handleChange("email",e)}/></div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="col">
                                                            <div className="form-group"><label for="first_name"><strong>First Name</strong></label><input className="form-control" type="text" placeholder="John" value={this.state.firstName} name="first_name" onChange={(e) => this.handleChange("firstName",e)}/></div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="form-group"><label for="last_name"><strong>Last Name</strong></label><input className="form-control" type="text" placeholder="Doe" value={this.state.lastName} name="last_name" onChange={(e) => this.handleChange("lastName",e)}/></div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group"><button className="btn btn-primary btn-sm" type="submit">Save Settings</button></div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="card shadow">
                                            <div className="card-header py-3">
                                                <p className="text-primary m-0 font-weight-bold">Business Address</p>
                                            </div>
                                            <div className="card-body">
                                                <form>
                                                    <div className="form-group"><label for="address"><strong>Address</strong></label><input className="form-control" type="text" placeholder="Sunset Blvd, 38" name="address" /></div>
                                                    <div className="form-row">
                                                        <div className="col">
                                                            <div className="form-group"><label for="city"><strong>City</strong></label><input className="form-control" type="text" placeholder="Los Angeles" name="city" /></div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="form-group"><label for="country"><strong>Country</strong></label><input className="form-control" type="text" placeholder="USA" name="country" /></div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group"><button className="btn btn-primary btn-sm" type="submit">Save&nbsp;Settings</button></div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <footer className="bg-white sticky-footer">
                    <div className="container my-auto">
                        <div className="text-center my-auto copyright"><span>Copyright © Brand 2019</span></div>
                    </div>
                </footer>
            </div><a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up"></i></a></div>
        )
    }
}

export default withRouter(Profile);