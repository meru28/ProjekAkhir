import React, { Component } from 'react';
import '../support/css/main1.css';
import axios from 'axios';
import { Table, Input} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })
class CartBertasbih extends Component{
    state = { listCart : [], selectedEdit: 0}

    componentDidMount(){
        this.renderlistCart()
      }
    
      renderlistCart = () => {
        axios.get('http://localhost:1997/order' , {
          params : {
            username : this.props.username
          }
        })
        .then((res) => {
          console.log(res)
          this.setState({listCart : res.data, selectedEdit: 0 })
        })
        .catch((err) => {
            console.log(err)
        })
        var listJsx = this.state.listCart.map((item) => {
            if(this.state.selectedEdit === item.id){
            return(  
              <tr>
                <td>{item.id}</td>
                <td>{item.nama_produk}</td>
                <td><img src={item.img} width="50px" alt={item.id}/></td>
                <td>{rupiah.format(item.harga_produk)}</td>
                <td style={{width:'20px'}}><input ref="hargaEdit" type="number" defaultValue={item.kuantitas}/></td>
                <td style={{width:'20px'}}>{rupiah.format(item.total)}</td>
                <td><input className="btn btn-primary" type="button" value="Save" onClick={() => this.setState({selectedEdit: item.id})}/></td> 
              </tr>
          )
            }
            return(
                <tr>
                <td>{item.id}</td>
                <td>{item.nama_produk}</td>
                <td><img src={item.img} width="50px" alt={item.id}/></td>
                <td>{rupiah.format(item.harga_produk)}</td>
                <td style={{width:'20px'}}>{item.kuantitas}</td>
                <td style={{width:'20px'}}>{rupiah.format(item.total)}</td>
                <td><input className="btn btn-primary" type="button" value="Edit" onClick={() => this.setState({selectedEdit: item.id})}/></td>
                <td><input className="btn btn-danger" type="button" value="Remove" onClick={() => this.onBtnDelClick(item.id)}/></td>
                </tr>
            )
        })
    
        return listJsx;
      }

      onBtnDelClick = (id) => {
        if(window.confirm('Yakin nih bro?')){
            axios.delete('http://localhost:1997/order/' + id)
            .then((res) =>{
                this.renderlistCart();
            }).catch((err) => {
                console.log(err);
            })
        }
    }


      onCheckOutClick = () => {
        if(window.confirm('Yakin mau checkout nih bro?')){
        axios.post('http://localhost:1997/history', {
            username : this.props.username,
            order : this.state.listCart
            })
                .then((res) => {
                    console.log(res)
                        for(let i = 0 ; i < this.state.listCart.length ; i ++){
                        axios.delete('http://localhost:1997/order/' + this.state.listCart[i].id    
                        ).then((res) => {
                        console.log(res)     
                        this.renderListCart()      
                        })
                        .catch((err) => {
                            console.log(err);
                        })
            }
            
            })
        
      }
    }

      renderTotalHarga = () => {
        var a = 0
        for(let i = 0; i < this.state.listCart.length ; i++){
          a += this.state.listCart[i].total
        }
        return(
          <div className='col-2'>
          <h3>{rupiah.format(a)}</h3>
           <Input className="btn-primary" type='button' value='Checkout' onClick ={this.onCheckOutClick}/>
          </div>
        )
      }

    render(){
        if(this.state.listCart.length > 0){
      return (
        <div className='container'>
        <center>
            <h1 style={{marginTop:'20px'}}>
                Cart
            </h1>
        </center>
      <Table style={{marginTop:'40px'}}>
        <thead>
          <tr class="table100-head">
            <th>Nomor</th>
            <th>Nama</th>
            <th>Image</th>
            <th>Harga Barang</th>
            <th>Kuantitas</th>
            <th>Total Harga</th>
            <th>Edit</th>
            <th>Hapus</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
        {this.renderlistCart()}
        
      </Table>
      <center>
          {this.renderTotalHarga()}
      </center>
      </div>
    );
    }else{
      return(
        <center>
          <div className='col-4'>
          <h1>Anda tidak punya belanjaan</h1>
          <Link to='/popoklist'><Input type="button" className='btn-primary' value="Lanjutkan Belanja"/></Link>          
          </div>
        </center>
      )
    }
    
  }
}
const mapStateToProps = (state) => {
  return{
    username : state.auth.username
  }
}
    

export default connect(mapStateToProps)(CartBertasbih);