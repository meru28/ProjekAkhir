import React, { Component } from "react";
import "../support/css/main1.css";
import axios from "axios";
import { Table } from "reactstrap";

class ManagePopok extends Component {
  state = { listPopok: [], selectedEdit: 0 };

  componentDidMount() {
    this.getPopokList();
  }

  getPopokList = () => {
    axios
      .get("http://localhost:1997/popok")
      .then(res => {
        //hasil respon dari api berbentuk array of objek
        console.log(res.data);
        this.setState({ listPopok: res.data, selectedEdit: 0 });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // editPopokList = (id) => {
  //     if(){

  //     }
  //     axios.put('http://localhost:1997/popok' + id)
  //     .then((res) => {
  //         console.log(res.data)
  //         this.getPopokList();
  //     }).catch((err) => {
  //         console.log(err);
  //     })
  // }

  onBtnAddClick = () => {
    var nama = this.refs.namaAdd.value;
    var merk = this.refs.merkAdd.value;
    var harga = parseInt(this.refs.hargaAdd.value);
    var img = this.refs.imgAdd.value;
    var description = this.refs.descAdd.value;

    axios
      .post("http://localhost:1997/popok", {
        nama,
        merk,
        harga,
        img,
        description
      })
      .then(res => {
        this.getPopokList();
      })
      .catch(err => {
        console.log(err);
      });
  };

  onBtnDelClick = id => {
    if (window.confirm("Yakin nih bro?")) {
      axios
        .delete("http://localhost:1997/popok/" + id)
        .then(res => {
          this.getPopokList();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  onBtnSaveClick = id => {
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

  //.map selalu membuat array baru
  renderBodyPopok = () => {
    var listJSXPopok = this.state.listPopok.map(item => {
      if (this.state.selectedEdit === item.id) {
        return (
          <tr>
            <td>{item.id}</td>
            <td>
              <input ref="namaEdit" type="text" defaultValue={item.nama} />
            </td>
            <td>
              <input ref="merkEdit" type="text" defaultValue={item.merk} />
            </td>
            <td>
              <input ref="hargaEdit" type="number" defaultValue={item.harga} />
            </td>
            <td>
              <input ref="imgEdit" type="text" defaultValue={item.img} />
            </td>
            <td>
              <input
                ref="descEdit"
                type="text"
                defaultValue={item.description}
              />
            </td>
            <td>
              <input
                className="btn btn-primary"
                type="button"
                value="Save"
                onClick={() => this.onBtnSaveClick(item.id)}
              />
            </td>
            <td>
              <input
                className="btn btn-danger"
                type="button"
                value="Cancel"
                onClick={() => this.setState({ selectedEdit: 0 })}
              />
            </td>
          </tr>
        );
      }
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.nama}</td>
          <td>{item.merk}</td>
          <td>Rp. {item.harga}</td>
          <td>
            <img src={item.img} width="50px" alt={item.id} />
          </td>
          <td>{item.description}</td>
          <td>
            <input
              className="btn btn-primary"
              type="button"
              value="Edit"
              onClick={() => this.setState({ selectedEdit: item.id })}
            />
          </td>
          <td>
            <input
              className="btn btn-danger"
              type="button"
              value="Delete"
              onClick={() => this.onBtnDelClick(item.id)}
            />
          </td>
        </tr>
      );
    });
    return listJSXPopok;
  };

  render() {
    return (
      <div className="container-table100 backNih">
        <h2>Manage Popok</h2>
        <div className="text-center">
          <div class="wrap-table100">
            <div class="table100">
              <center>
                <table className="asp.ex1">
                  <thead>
                    <tbody>
                      <tr className="table100-head">
                        <th scope="row align-content: center">ID</th>
                        <th scope="row align-center">Nama</th>
                        <th scope="row">Merk</th>
                        <th scope="row">Harga</th>
                        <th scope="row">Image</th>
                        <th scope="row">Description</th>
                        <th scope="row" />
                        <th scope="row" />
                      </tr>
                    </tbody>
                  </thead>
                  <tbody>{this.renderBodyPopok()}</tbody>
                  <tfoot>
                    <td />
                    <td>
                      <input
                        ref="namaAdd"
                        type="text"
                        placeholder="Nama Produk"
                      />
                    </td>
                    <td>
                      <select ref="merkAdd">
                        <option>Pampers Ultraman</option>
                        <option>Kancut Gajah</option>
                        <option>Kancut Singa</option>
                      </select>
                    </td>
                    <td>
                      <input ref="hargaAdd" type="number" placeholder="Harga" />
                    </td>
                    <td>
                      <input ref="imgAdd" type="text" placeholder="Image Url" />
                    </td>
                    <td>
                      <textarea
                        ref="descAdd"
                        type="text"
                        placeholder="Enter the Description here"
                      />{" "}
                      />
                    </td>
                    <td>
                      <input
                        type="button"
                        className="btn btn-success"
                        value="Add"
                        onClick={this.onBtnAddClick}
                      />
                    </td>
                  </tfoot>
                </table>
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ManagePopok;
