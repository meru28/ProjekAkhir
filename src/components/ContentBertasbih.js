import React, { Component } from 'react';

class ContentBertasbih extends Component {
    render() {
        return (
            <div>
                <center>
                    <h1>{this.props.contentHeader}</h1>
                        {this.props.children}
                </center>
            </div>
                )
            }
    }

export default ContentBertasbih;