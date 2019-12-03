
import React,{Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from "../utils/setAuthToken";

class Inventory extends Component{

    constructor (props){
        super(props);
        this.state={
          products: [],
        };
   }

    componentWillMount(){
        //get products from database
        let token = localStorage.jwtToken
        axios({
            method: 'get',
            url: '/api/products',
            headers: {
              Authorization: token
            }
          })
          .then(response=>{
              console.log(response);
            //   this.setState({
            //       products:response.data
            //   })
            //   console.log(response);
              
          })
          .catch(error =>{
              console.log(error);
          })

    }

   
      

    render(){
        return (
            <div id="wrapper">


                    <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
                                <div class="container-fluid d-flex flex-column p-0">
                                    <a class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
                                        <div class="sidebar-brand-icon rotate-n-15"><i class="fas fa-laugh-wink"></i></div>
                                        <div class="sidebar-brand-text mx-3"><span>simplePOS</span></div>
                                    </a>
                                    <hr class="sidebar-divider my-0"/>
                                    <ul class="nav navbar-nav text-light" id="accordionSidebar">
                                        <li class="nav-item" role="presentation"></li>
                                        <li class="nav-item" role="presentation"><a class="nav-link" href="pos.html"><i class="fas fa-window-maximize"></i><span>Main Screen</span></a></li>
                                        <li class="nav-item" role="presentation"><Link className="nav-link active" to="/inventory"><i class="fas fa-window-maximize"></i>Inventory</Link></li>
                                        <li class="nav-item" role="presentation"><a class="nav-link" href="dashboard.html"><i class="fas fa-window-maximize"></i><span>Sales Performance</span></a></li>
                                        <li class="nav-item" role="presentation"><Link className="nav-link" to="/profile"><i class="fas fa-window-maximize"></i>Profile</Link></li>
                                    </ul>
                                    <div class="text-center d-none d-md-inline"><button class="btn rounded-circle border-0" id="sidebarToggle" type="button"></button></div>
                                </div>
                    </nav>

                    <div class="d-flex flex-column" id="content-wrapper">
                        <div id="content" style={{paddingTop: 1+'em'}}>
                            
                            <div class="container-fluid">
                                <h3 class="text-dark mb-1">Inventory</h3>
                            </div>
                            <div class="table-responsive text-center align-content-center">
                                <table class="table">
                                    <thead class="text-center justify-content-center">
                                        <tr>
                                            <th style={{width: 130.859+ "px"}}>Product</th>
                                            <th class="category" style={{width: 130.859+'px'}}>Category</th>
                                            <th style={{width: 130.859+'px'}}>Quantity</th>
                                            <th style={{width: 130.859+'px'}}>Cost</th>
                                            <th style={{width: 130.859+'px'}}>Total Cost</th>
                                            <th style={{width: 130.859+'px'}}>Sales Price</th>
                                    
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr></tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <div class="btn-group" role="group"></div>
                    
                </div>

                <footer class="bg-white sticky-footer">
                    <div class="container my-auto">
                        <div class="text-center my-auto copyright"><span>Copyright © Brand 2019</span></div>
                    </div>
                </footer>

                </div>
            
            </div>
        )
    }
}

export default withRouter(Inventory);