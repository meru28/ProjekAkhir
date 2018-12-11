import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { select_popok } from '../actions';
import queryString from 'query-string';

class PopokDetail extends Component {
    //cara mendapat ID dari url
    componentDidMount(){
        //utk get 
        console.log(this.props.location.search)
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        var popokID = params.popokid;
        //var popokID = this.props.match.params.id;
        console.log(popokID)
        axios.get(`http://localhost:1997/popok/${popokID}`)
            .then((res) => {
                console.log(res)
                //mengirim ke global stae
                this.props.select_popok(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render(){
        var { nama, harga, img, description, merk } = this.props.popok;
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <img alt={img} src={img} className="img-responsive"/>
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <h1>{nama}</h1>
                        </div>
                        <div className="row">
                            <h3>{merk}</h3>
                        </div>
                        <div className="row">
                            <h2>Rp. {harga}</h2>
                        </div>
                        <div className="row">
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { popok: state.selectedPopok }

}

export default connect(mapStateToProps, { select_popok })(PopokDetail);