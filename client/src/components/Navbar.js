
import React,{Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';


class Navbar extends Component{
    
    constructor (props){
        super(props);
        this.state={
          firstName: ''
        };
 
   }

   componentWillMount(){
        this.checkAuth();
    }
    
    checkAuth(){

        let token = localStorage.jwtToken;
        
        if(token){
            axios({
                method: 'get',
                url: '/api/profile',
                headers: {
                    Authorization: token
                }
            })
            .then(response=>{
                this.setState({
                    firstName: response.data.firstName,
                });
            })
            .catch(error =>{
                console.log("error: ", error);
                localStorage.clear();
                // this.props.history.push("/welcome") 
            })
        }else{
            // this.props.history.push("/welcome") 
        }

    }



    logout(e){
        e.preventDefault();
        localStorage.removeItem("jwtToken");// "Give back" the keys 
        window.location.reload();
        // this.props.history.push("/");
    }


    render(){

       const welcomeNav = <nav className="navbar navbar-expand-lg navbar-light myNavbarColor"> 
                            <a className="navbar-brand" href="#">simplePOS</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            </button>
                        
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">Register</Link>
                                </li>
                            </ul>
                            </div>
                        </nav> ;

        const userNav = <nav className="navbar navbar-expand-lg navbar-light myNavbarColor"> 
                            <a className="navbar-brand" href="#">simplePOS</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            </button>
                        
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    UserName
                                </a>
                                
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link to="/profile" className="dropdown-item">Profile</Link>
                                    <a className="dropdown-item" href="#" onClick={this.logout.bind(this)}>Logout</a>
                                </div>
                                </li>
                            </ul>
                            </div>
                    </nav>  


        return (
            <div  style={{position:'fixed',width: 100 + '%', zIndex:'1000', top:0}}>
                {
                    this.state.firstName ? userNav : welcomeNav
                }
            </div>
        
        )
    }
}

export default withRouter(Navbar);