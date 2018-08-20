import React, { Component } from 'react'
import axios from 'axios';


export default class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state= {
            product_name:'',
            product_price:'',
            images:'',

        }
    }
 
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-8 mx-auto">
                        
                    </div>
                </div>
            </div>
        )
    }
}
