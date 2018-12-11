import React, { Component } from 'react';
import '../support/css/main1.css';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { Redirect, Link } from 'react-router-dom';
import { onUserRegister } from '../actions';
import { NavItem, NavLink } from 'reactstrap';

const cookies = new Cookies();

class RegisterBertasbih extends Component {

    componentWillReceiveProps(newProps) {
        if(newProps.username !== ''){
          cookies.set('dataUser', newProps.username, { path: '/' })
        }
      }

    onBtnRegisterClick = () =>{
        var username = this.refs.username.value;
        var email = this.refs.email.value;
        var phone = this.refs.phone.value; 
        var password = this.refs.password.value;
        console.log(username)
        console.log(email)
        console.log(phone)
        console.log(password)
        this.props.onUserRegister({ username, email, phone, password });
    }

    renderError = () => {
        if(this.props.error.length > 0) {
          return <p className="alert alert-danger">{this.props.error}</p>;
        }
      }

    renderButton = () => {
        if(this.props.loading) {
          return <i className="fa fa-spinner fa-spin"></i>
        }
        return <div className="container-login100-form-btn">
        <div className="wrap-login100-form-btn">
          <div className="login100-form-bgbtn" />
          <button className="login100-form-btn" type="button" onClick={this.onBtnRegisterClick}>
            Sign up
          </button>
        </div>
      </div>
        // <Button color="success" 
        // onClick={this.onBtnRegisterClick}>Register</Button>
      }

    render(){
        if(this.props.username === ""){
        return(
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-l-30 p-r-30 p-t-40 p-b-34">
                        <form className="login100-form validate-form">
                            <span className="login100-form-title p-b-30">
                                Sign up to see more
                            </span>
                            <div className="wrap-input100 validate-input m-b-10">
                                <span className="label-input100">Username</span>
                                <input className="input100" type="text" name="username" ref="username" placeholder="Ketikkan username kamu" />
                                <span className="focus-input100" data-symbol="" />
                            </div>
                            <div className="wrap-input100 validate-input m-b-10">
                                <span className="label-input100">Email</span>
                                <input className="input100" type="text" name="email" ref="email" placeholder="Ketikkan email kamu" />
                                <span className="focus-input100" data-symbol="&#x40;" />
                            </div>
                            <div className="wrap-input100 validate-input m-b-10">
                                <span className="label-input100">No. Handphone</span>
                                <input className="input100" type="text" name="phone" ref="phone" placeholder="Ketikkan no. handphone kamu" />
                                <span className="focus-input100" data-symbol="&#x260F;" />
                            </div>
                            <div className="wrap-input100 validate-input">
                                <span className="label-input100">Password</span>
                                <input className="input100" type="password" name="pass" ref="password" placeholder="Ketikkan password kamu" />
                                <span className="focus-input100" data-symbol="" />
                            </div>
                            <div className="text-right p-t-8 p-b-10">
                            </div>
                            {this.renderError()}
                            {this.renderButton()}
                            <div className="txt1 text-center p-t-20 p-b-20">
                                <span>
                                Or Sign Up Using
                                </span>
                            </div>
                            <div className="flex-c-m">
                                <a href="#" className="login100-social-item bg1">
                                    <i className="fa fa-facebook" />
                                </a>
                                <a href="#" className="login100-social-item bg2">
                                    <i className="fa fa-twitter" />
                                </a>
                                <a href="#" className="login100-social-item bg3">
                                    <i className="fa fa-google" />
                                </a>
                            </div>
                            <div className="flex-col-c p-t-23">
                                <span className="txt1 p-b-17">
                                    Sudah punya akun?
                                </span>
                                <NavItem>
                                    <Link to="/login">
                                        <NavLink><a href="#" className="txt2">Login</a></NavLink>
                                    </Link>
                                </NavItem>
                            </div>
                    </form>
                </div>
            </div>
      </div>
            // <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
            //     <div className="wrapper wrapper--w680">
            //         <div className="card card-4">
            //             <div className="card-body">
            //                 <h2 className="title">Registration Form Popok Club</h2>
            //                     <div className="form-group-1">
            //                         <FormGroup>
            //                             <Label for="exampleEmail">Username</Label>
            //                             <Input type="text" name="username" ref="username" innerRef="tbUsername" id="exampleUsername" placeholder="masukkan username" />
            //                         </FormGroup>
            //                         <FormGroup>
            //                             <Label for="exampleEmail">Email</Label>
            //                             <Input type="text" name="email" ref="email" innerRef="tbEmail" id="exampleEmail" placeholder="emailmu bang" />
            //                         </FormGroup>
            //                         <FormGroup>
            //                             <Label for="examplePhoneNumber">Phone Number</Label>
            //                             <Input type="text" name="phonenumber" ref="phone" innerRef="tbPhone" id="examplePhoneNumber" placeholder="telponmu le" />
            //                         </FormGroup>
            //                         <FormGroup>
            //                             <Label for="examplePassword">Password</Label>
            //                             <Input type="password" name="password" ref="password" innerRef="tbPassword" id="examplePassword" placeholder="passwordmu le" />
            //                         </FormGroup>
            //                         {this.renderError()}
            //                     {this.renderButton()}
            //             </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
                )
         }
         return <Redirect to="/" />
    }
}


const mapStateToProps = (state) => {
    return { username: state.auth.username, 
             error: state.auth.error, 
             loading: state.auth.loading };
  }

export default connect(mapStateToProps, {onUserRegister})(RegisterBertasbih);