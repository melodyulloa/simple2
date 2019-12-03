import React,{Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
  // Users.defaultProps = {
    //   id: '',
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   company: '', 
    //   companyAddress: '',
    //   companyCity: '',
    //   companyState: '',
    //   password: ''
    // }
    //  <div className="Users">
    //       <h1>Users</h1>
    //       {this.state.users.map(users =>
    //         <div key={users.id}> {users.firstName} {users.lastName} - {users.email} {users.company} {users.companyAddress} {users.companyCity} {users.companyState} {users.password}</div>
    //       )}
    //     </div>
// import logo from './logo.svg';
import './App.css';
import Inventory from './components/Inventory';
import AllProducts from './components/AllProducts';


class App extends Component{ 

  
  render(){
class App extends Component { 
  
 render(){
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Welcome}/>
          <div className="">
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/profile" component={Profile}/>
              <Route exact path="/inventory" component={Inventory}/>
              <Route exact path="/allproducts" component={AllProducts}/>
          </div>
        </div>
      </Router>
    )
  }
}



export default App;
