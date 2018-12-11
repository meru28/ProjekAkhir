import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { onUserLogout, keepLogin } from '../actions';


const cookies = new Cookies();

class HeaderCoba extends Component {
    // state = { nyinyong: 'Teletubies', monyong: 'Monyong Lo'}

    // componentWillMount(){
    //     console.log('Ini Will Mount')
    // }
    // //fungsi yg dijalankan sblm render

    // componentDidMount(){
    //     console.log('Ini did Mount')
    //     this.setState({ nyinyong: 'Martabak', inyong: 'Saya kunyong' })
    // }
    // //fungsi yg dijalankan setelah render

    // componentWillUpdate(){
    //     console.log('Ini Will Update')
    // }

    // componentDidUpdate(){
    //     console.log('Ini Did Update')
    // }
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      onLogOutSelect = () => {
        console.log()
        this.props.onUserLogout();
        cookies.remove('dataUser');
      }

    render() {
        if(this.props.username === ""){
            return(
                <div>
                <Navbar color="light" light expand="md">
                  <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    {this.props.children}
                      <NavItem>
                        <Link to="/popoklist"><NavLink>Browse Popok</NavLink></Link>
                      </NavItem>
                      <NavItem>
                        <Link to="/register"><NavLink>Register</NavLink></Link>
                      </NavItem>
                      <NavItem>
                        <Link to="/login"><NavLink>Login</NavLink></Link>
                      </NavItem>
                      {/* <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                          Hello, {this.props.username}
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem>
                            Option 1
                          </DropdownItem>
                          <DropdownItem>
                            Option 2
                          </DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem>
                            Reset
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown> */}
                    </Nav>
                  </Collapse>
                </Navbar>
              </div>
            )
        }
        return(
            <div>
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                {/* {this.props.children} */}
                <NavItem>
                        <NavLink href="/popoklist">Browse Popok</NavLink>
                      </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Hello, {this.props.username}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <Link to="/managepopok">Manage Popok</Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link to="/cart">Cart</Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link to="/history">History</Link>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={this.onLogOutSelect}>
                        <Link to="/">Logout</Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        )
        
    //     console.log('Ini Render')
    //     console.log(this.state)
    //    // console.log(this.state.nyinyong)
    //     return(
    //         <div>
    //             <h2>Ini Function Component</h2>
    //             <h3>{this.state.nyinyong}</h3>
    //             <h3>{this.state.monyong}</h3>
    //         </div>
    //     )
    }
}

const mapStateToProps = (state) => {
    return { username: state.auth.username}
}

export default connect(mapStateToProps, {onUserLogout, keepLogin})(HeaderCoba);