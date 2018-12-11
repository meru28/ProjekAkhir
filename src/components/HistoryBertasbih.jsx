import React, { Component } from 'react';
import '../support/css/main1.css';
import axios from 'axios';
import { Table } from 'reactstrap';


class HistoryBertasbih extends Component {
    state = { listHistory: [], selectedEdit: 0}

    componentDidMount(){
        this.getHistoryList();
    }

    getHistoryList = () => {
        axios.get('http://localhost:1997/history')
        .then((res) => {
            //hasil respon dari api berbentuk array of objek
            console.log(res.data)
            this.setState({ listHistory: res.data, selectedEdit: 0})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnDetailClick = (id) => {
        var nama = this.refs.namaEdit.value;
        var merk = this.refs.merkEdit.value;
        var harga = this.refs.hargaEdit.value;
        var img = this.refs.imgEdit.value;
        var description = this.refs.descEdit.value;

        axios.put('http://localhost:1997/popok/' + id, {
            nama, merk, harga, img, description
        }).then((res) => {
            this.getPopokList();
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    //.map selalu membuat array baru
    renderBodyHistory = () => {
    var listJSXPopok = this.state.listHistory.map((item) => {
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td></td>
                    <td></td>
                    <td>{item.total}</td>
                    <td><input className="btn btn-primary" type="button" value="Detail" onClick={() => this.onBtnDetailClick(item.id)}/></td>
                </tr>
            )   
        
        })
        return listJSXPopok;
    }

    render(){
        return(
            
            <div className="container-table100 backNih">
            <h2>History Transaksi</h2>
            <div className="text-center">
            <div class="wrap-table100">
				<div class="table100">
              <center>
            <table className="asp.ex1">
                <thead>
                    <tr class="table100-head">
                        <th scope="row align-content: center">ID</th>
                        <th scope="row align-center">Username</th>
                        <th scope="row">Tanggal Transaksi</th>
                        <th scope="row">Total Item</th>
                        <th scope="row">Total Price</th>
                        <th scope="row"></th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderBodyHistory()}
                </tbody>
            </table>
            </center>
            </div>
            </div>
            </div>
            </div>
        );
    }
}

export default HistoryBertasbih;
