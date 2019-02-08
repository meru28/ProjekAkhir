import React, { Component } from 'react';
import { connect } from 'react-redux'
import HeaderCoba from './components/HeaderCoba';
import { Route, withRouter } from 'react-router-dom';
import LoginBertasbih from './components/LoginBertasbih';
import HomeBertasbih from './components/HomeBertasbih';
import RegisterBertasbih from './components/RegisterBertasbih';
import PopokListBertasbih from './components/PopokListBertasbih';
import ManagePopok from './components/ManagePopok';
import Cookies from 'universal-cookie';
import { keepLogin, cookieChecked } from './actions';
import PopokDetail from './components/PopokDetail';
import CartBertasbih from './components/CartBertasbih';
import HistoryBertasbih from './components/HistoryBertasbih';

const cookies = new Cookies();

class App extends Component {
  state = { content : 'Ini Content'}

  componentDidMount(){
    //setelah get dataUser disimpan di var username
    const username = cookies.get('dataUser');
    if(username !== undefined) {
      this.props.keepLogin(username);
    }
    //jika user tidak ada akan melakukan function cookiechecked
    else{
      this.props.cookieChecked();
    }
  }

  // onBtnOkClick = () => {
  //   this.setState({ content: 'Ini comberan'})
  // }
 
  render() {
    // var {content} = this.state;
    //props.cookie datang dari global state
    if(this.props.cookie) {
      return (
        <div>
          {/* <CobaBertasbih headerText="Bertasbih Commerce"/>
          <CobaBertasbih headerText="Telo"/>
          <CobaBertasbih headerText="Sempak busuk"/>
          <CobaBertasbih>
            <p>emang ga pernah lo cuci</p>
            <h2>Kampret lu njas</h2>
          </CobaBertasbih> */}
          <HeaderCoba navBrand={"Bertasbih"}/>
          <div>
          <Route exact path="/" component={HomeBertasbih}/>
          <Route path="/login" component={LoginBertasbih}/>
          <Route path="/register" component={RegisterBertasbih}/>
          <Route path="/popoklist" component={PopokListBertasbih}/>
          <Route path="/managepopok" component={ManagePopok}/>
          <Route path="/popokdetail" component={PopokDetail}/>
          <Route path="/cart" component={CartBertasbih}/>
          <Route path="/history" component={HistoryBertasbih}/>
          </div>
          {/* <ContentBertasbih contentHeader={content}>
          </ContentBertasbih> */}
          {/* <Button color="danger" className="btn btn-primary"
          onClick={this.onBtnOkClick}>danger</Button>
           */}
  
        </div>
      );
    }
    return (<div>
          <center><h1>Loading...</h1></center>
    </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return { cookie: state.auth.cookie }
}
//withRouter gunanya utk routingnya tetep jalan jika app js menggunakan connect/ akses ke global state
export default withRouter (connect(mapStateToProps, { keepLogin, cookieChecked })(App));
