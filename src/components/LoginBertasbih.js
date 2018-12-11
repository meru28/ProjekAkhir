import React, { Component } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import '../support/css/main1.css';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { onUserLogin } from '../actions';


const cookies = new Cookies();

class LoginBertasbih extends Component {
  
  //ke trigger saat ada props baru & masuk ke dalam newProps
  //will risif prop jalan sebelum render lagi
  componentWillReceiveProps(newProps) {
    if(newProps.username !== ''){
      //bikin cookie nama dataUser yg dicatat adalah username
      cookies.set('dataUser', newProps.username, { path: '/' })//path: '/' supaya bisa diakses di semua page
    }
  }

  onBtnLoginClick = () => {
    //ambil input dari teksbox username & password
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    //dikirim atau dipanggil action creator utk dikirim ke global state (action creator adlh sbuah function)
    //
    this.props.onUserLogin({username, password})//username & password disini maksudnya di dalam objek dan ini adalah satu parameter krn di dalam objek yg diambil dari variabel di atas baris ini

  }

renderError = () => {
  if(this.props.error.length > 0) {
    return <p className="alert alert-danger">{this.props.error}</p>;
  }
}

renderButton = () => {
  //return dibawah ini adalah boolean jika true maka loading jika false maka akan execute button login
  if(this.props.loading) {
    return <i className="fa fa-spinner fa-spin"></i>
  }
  return <div className="container-login100-form-btn">
  <div className="wrap-login100-form-btn">
    <div className="login100-form-bgbtn" />
    <button className="login100-form-btn" type="button" onClick={this.onBtnLoginClick}>
      Login
    </button>
  </div>
</div>
  // <Button color="success"
  // onClick={this.onBtnLoginClick}>Login</Button>
}

    render () {
      if(this.props.username === ""){
        return (
          <div>
              {/* <center><h1>Login Bertasbih</h1></center>
              <br></br>
              <Form style={{ margin: "0 auto"}} className="col-3">
          <FormGroup>
            <Label for="exampleEmail">Username</Label>
            <Input type="text" name="username" ref="username" innerRef="tbUsername" id="exampleUsername" placeholder="masukkan username" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" ref="password" innerRef="tbPassword" id="examplePassword" placeholder="passwordmu le" />
          </FormGroup> */}
          <div className="limiter bg-gra-02">
        <div className="container-login100">
          <div className="wrap-login100 p-l-30 p-r-30 p-t-40 p-b-34">
            <form className="login100-form validate-form">
              <span className="login100-form-title p-b-49">
                Login
              </span>
              <div className="wrap-input100 validate-input m-b-23">
                <span className="label-input100">Username</span>
                <input className="input100" type="text" name="username" ref="username" placeholder="Ketikkan username kamu" />
                <span className="focus-input100" data-symbol="" />
              </div>
              <div className="wrap-input100 validate-input">
                <span className="label-input100">Password</span>
                <input className="input100" type="password" name="pass" ref="password" placeholder="Ketikkan password kamu" />
                <span className="focus-input100" data-symbol="" />
              </div>
              <NavItem>
                <Link to="/register">
                  <NavLink>
                    <div className="text-right p-t-8 p-b-31">
                      <a href="#" className="txt2">Lupa password?</a>
                    </div>
                  </NavLink>
                </Link>
              </NavItem>
              {this.renderError()}
              {this.renderButton()}
              <div className="txt1 text-center p-t-20 p-b-20">
                <span>
                  Or Login Using
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
                  Belum punya akun?
                </span>
                <NavItem>
                        <Link to="/register"><NavLink><a href="#" className="txt2">
                  Sign Up
                </a></NavLink></Link>
                </NavItem>
                
              </div>
            </form>
          </div>
        </div>
      </div>
          
          
          
        {/* </Form> */}
          </div>
          );
      }; 
      return <Redirect to="/" />
        
    }

}

//ambil data dari global state
const mapStateToProps = (state) => {
  return { username: state.auth.username, 
           error: state.auth.error, 
           loading: state.auth.loading };
}

//hubungkan ke global state menggunakan connect(di dalam connect ada 2 jalur kiri dan kanan, kiri utk ambil data dari global state ke kompononen
//utk jalur kanan adalah utk merubah )
export default connect(mapStateToProps, { onUserLogin })(LoginBertasbih);
//guna export adalah utk bisa diimport

//pada baris export default ada kata connect utk menghubungkan action creator ke semua reducer
//ada(null) dalam paramater karena tidak membutuhkan mapStateToProps utk mengambil data
//dari global state ke komponen, maka hanya diberi parameter action creater yaitu onUserLogin.
//connect biasanya mempunyai dua parameter yaitu mapStateTopProps, actionCreator & class itu sendiri
//utk menghubungkan data tsb ke komponen


