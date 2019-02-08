import React, { Component } from "react";
import "../support/css/main1.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Table } from "reactstrap";
import { connect } from "react-redux";

const rupiah = new Intl.NumberFormat("in-Rp", {
  style: "currency",
  currency: "IDR"
});
class HistoryBertasbih extends Component {
  state = { listHistory: [], selectedEdit: 0 };

  componentDidMount() {
    this.getHistoryList();
  }

  getHistoryList = () => {
    axios
      .get("http://localhost:1997/history", {
        params: {
          username: this.props.username
        }
      })
      //krn pake params hasilnya array, klo pake id baru objek
      .then(res => {
        //hasil respon dari api berbentuk array of objek
        console.log(res.data);
        this.setState({ listHistory: res.data, selectedEdit: 0 });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onBtnDetailClick = id => {
    var nama = this.refs.namaEdit.value;
    var merk = this.refs.merkEdit.value;
    var harga = this.refs.hargaEdit.value;
    var img = this.refs.imgEdit.value;
    var description = this.refs.descEdit.value;

    axios
      .put("http://localhost:1997/popok/" + id, {
        nama,
        merk,
        harga,
        img,
        description
      })
      .then(res => {
        this.getPopokList();
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderTotalHarga = () => {
    var a = 0;
    for (let i = 0; i < this.state.listHistory.length; i++) {
      a += this.state.listHistory[i].total;
    }
    return (
      <div className="col-2">
        <p>{rupiah.format(a)}</p>
      </div>
    );
  };

  // .map selalu membuat array baru
  renderBodyHistory = () => {
    var listJSXPopok = this.state.listHistory.map((item, index) => {
      if (item.id !== this.state.selectedEdit) {
        var temp = 0;
        for (let j = 0; j < this.state.listHistory[index].order.length; j++) {
          temp += this.state.listHistory[index].order[j].total;
        }
        return (
          //utk memberi key yg unik
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.order[index].username}</td>
            <td>{item.order[index].date}</td>
            <td>{item.order.length}</td>
            <td>{rupiah.format(temp)}</td>
            <td>
              <input
                className="btn btn-primary"
                type="button"
                value="Detail"
                onClick={() => this.onBtnDetailClick(item.id)}
              />
            </td>
          </tr>
        );
        // })

        // }
      }
      // return<Redirect to={`/detailtransaksi?transaksiid=${item.id}`}/>
    });
    return listJSXPopok;
  };

  render() {
    if (this.state.listHistory.length > 0) {
      return (
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
                        <th scope="row" />
                      </tr>
                    </thead>
                    <tbody>{this.renderBodyHistory()}</tbody>
                  </table>
                </center>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <center>
          <div>
            <h1>Anda tidak punya history transaksi</h1>
          </div>
        </center>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username
  };
};

export default connect(mapStateToProps)(HistoryBertasbih);
