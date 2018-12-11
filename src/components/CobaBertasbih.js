import React, { Component } from 'react';

class CobaBertasbih extends Component {
    render() {
        return (
            <center>
            <div>
                <h1>{this.props.headerText}</h1>
                {/* <p>Lagi-lagi gua datang telat lagi</p> */}
                {this.props.children}
            </div>

            </center>
            
        )
    }
}

export default CobaBertasbih;