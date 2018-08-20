import React, { Component } from 'react';
import './../App.css';
import Title from './Title';
import Product from './Product';
import axios from 'axios';

const getProductData = () => {
  return axios.get('/getdata01')
    .then((response) => response.data);
}
const addProductData = (product_name, product_price, images) => {
  return axios.post('/add', { product_name, product_price, images })
    .then((response) => response.data);
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    }
  }

  componentWillMount() {
    if (this.state.data === null) {
      getProductData().then((res) => {
        this.setState({
          data: res
        })
      })

    }
  }
  addNewProduct = (data) => {
    this.setState({
      data: data
    })
  }
  showProduct = () => {
    if (this.state.data != null) {
      return this.state.data.map((value, key) => {
        return (<Product key={key} product_name={value.product_name} product_price={value.product_price} images={value.images} />)
      })
    }
  }
  isChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      [name]: value
    })
  }
  addNewProduct = () => {
    var { product_name, product_price, images } = this.state;
    var dataTemp= [];
    var item ={}
    item.product_name = product_name;
    item.product_price = product_price;
    item.images = images;

    dataTemp = this.state.data;
    if(product_name !=''){
      dataTemp.push(item);
      this.setState({
        data:dataTemp
      });
    }

    
    addProductData(product_name, product_price, images).then((response) => {
      console.log(response);
    });
  }
  render() {
    return (
      <div>
        <Title />
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="row">
                {this.showProduct()}
              </div>
            </div>
            <div className="col-3">
              <form>
                <div className="form-group">
                  <label htmlFor="product_name">Tên sản phẩm</label>
                  <input onChange={(event) => this.isChange(event)} type="text" className="form-control" name="product_name" id="product_name" aria-describedby="name_p" placeholder="Nhập tên sản phẩm ...." />
                  <small id="name_p" className="form-text text-muted">Nhập text vào </small>
                </div>
                <div className="form-group">
                  <label htmlFor="product_price">Giá sản phẩm</label>
                  <input onChange={(event) => this.isChange(event)} type="text" className="form-control" name="product_price" id="product_price" aria-describedby="price_p" placeholder="Nhập giá sản phẩm ...." />
                  <small id="price_p" className="form-text text-muted">Nhập text vào </small>
                </div>
                <div className="form-group">
                  <label htmlFor="images">Link ảnh sản phẩm</label>
                  <input onChange={(event) => this.isChange(event)} type="text" className="form-control" name="images" id="images" aria-describedby="images_p" placeholder="Nhập link ảnh sản phẩm ...." />
                  <small id="images_p" className="form-text text-muted">Nhập link vào </small>
                </div>
                <button type="reset" className="btn btn-info btn-block" onClick={(data) => this.addNewProduct(data)}>Thêm mới</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
