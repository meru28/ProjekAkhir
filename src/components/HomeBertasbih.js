import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class HomeBertasbih extends Component {
    state = { listPopok: [] }

    componentWillMount(){
        axios.get('http://localhost:1997/popok')
        .then((res) => {
            //hasil respon dari api berbentuk array of objek
            console.log(res.data)
            this.setState({ listPopok: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    //.map selalu membuat array baru
    renderListPopok = () => {
        var listJSXPopok = this.state.listPopok.map((item) => {
            return (
                <div>
                    <h3>{item.nama}</h3>
                    <p>{item.description}</p>
                </div>
                )
        })
        return listJSXPopok;
    }
    render(){
        return(
            <div>
                <center><h1>Ini Home</h1></center>
                {/* {this.renderListPopok()}
                <h2>{this.props.pikachu}</h2> */}

            </div>
        )
    }
}



const mapStateToProps = (state) => {
return {pikachu: state.pikachu}
};
export default connect(mapStateToProps)(HomeBertasbih);