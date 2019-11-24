
import React,{Component} from 'react';
import {Link, withRouter} from 'react-router-dom';



class Navbar extends Component{


    logout(e){
        e.preventDefault();
        localStorage.removeItem("userToken");// "Give back" the keys 
        this.props.history.push("/");// send their ass to homepage
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
            <div>
                {
                    localStorage.userToken ? userNav : welcomeNav
                }
            </div>
        
        )
    }
}

export default withRouter(Navbar);