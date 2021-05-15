import React, {Component} from 'react';
import {Nav,Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class Header extends Component{
    render(){
        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand><Link to='/home' style={{color:"white",fontSize:"25px"}}>API</Link></Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link><Link to='/hello'>Chart</Link></Nav.Link>
                    <Nav.Link><Link to='/form'>Form</Link></Nav.Link>
                </Nav>
            </Navbar>

        );
    }
}

export default Header;