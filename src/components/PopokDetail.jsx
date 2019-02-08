import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { select_popok } from "../actions";
import queryString from "query-string";

class PopokDetail extends Component {
  //cara mendapat ID dari url
  componentDidMount() {
    //utk get
    console.log(this.props.location.search);
    var params = queryString.parse(this.props.location.search);
    console.log(params);
    var popokID = params.popokid;
    //var popokID = this.props.match.params.id;
    console.log(popokID);
    axios
      .get(`http://localhost:1997/popok/${popokID}`)
      .then(res => {
        console.log(res);
        //mengirim ke global stae
        this.props.select_popok(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  onBtnAddtoCart = () => {
    var IDproduk = this.props.popok.id;
    var namaproduk = this.props.popok.nama;
    var img = this.props.popok.img;
    var hargaProduk = this.props.popok.harga;
    var qty = this.refs.qtyAdd.value;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var min = today.getMinutes();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = mm + "/" + dd + "/" + yyyy + ", " + "Jam " + hour + ":" + min;

    axios
      .post("http://localhost:1997/order", {
        username: this.props.username,
        id_produk: IDproduk,
        nama_produk: namaproduk,
        img: img,
        harga_produk: hargaProduk,
        kuantitas: qty,
        total: hargaProduk * qty,
        id_order: 1,
        date: today
      })
      .then(res => {
        console.log(res);
        alert("Produknya udah masuk dalam cart");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    var { nama, harga, img, description, merk } = this.props.popok;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-4">
            <img alt={img} src={img} className="img-responsive" />
          </div>
          <div className="col-8">
            <div className="row">
              <h1>{nama}</h1>
            </div>
            <div className="row">
              <h7>{merk}</h7>
            </div>
            <br />
            <div className="row">
              <h2>Rp. {harga}</h2>
            </div>
            <div className="row">
              <p>{description}</p>
            </div>
            <span className="label-input100">Kuantiti</span>
            <br />
            <input ref="qtyAdd" type="number" defaultValue="1" />
            <br />
            <input
              type="button"
              className="btn btn-success"
              value="Add to Cart"
              onClick={this.onBtnAddtoCart}
            />
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { popok: state.selectedPopok, username: state.auth.username };
};

export default connect(
  mapStateToProps,
  { select_popok }
)(PopokDetail);
