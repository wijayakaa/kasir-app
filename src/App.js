import React, { Component } from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import { Hasil, ListCategories, NavbarComponents, Menus } from './components';
import { API_URL } from './utils/constants';
import swal from 'sweetalert';
import axios from 'axios';


export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       menus:[],
       categoryChoosen: 'Minuman',
       keranjangs:[]
    }
  } 

  componentDidMount(){
    axios.get(API_URL + "products?category.nama="+this.state.categoryChoosen) 
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log('Error ya', error); 
      })

      axios.get(API_URL + "keranjangs?category.nama="+this.state.categoryChoosen) 
      .then(res => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch(error => {
        console.log('Error ya', error); 
      })
  }

  componentDidUpdate(prevState){
    if(this.state.keranjangs !== prevState.keranjangs){

      axios.get(API_URL + "keranjangs?category.nama="+this.state.categoryChoosen) 
      .then(res => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch(error => {
        console.log('Error ya', error); 
      })
      
    }
  }

  changeCategory = (value) => {
    this.setState({
      categoryChoosen: value,
      menus: []
    })

    axios.get(API_URL + "products?category.nama="+this.state.categoryChoosen) 
    .then(res => {
      const menus = res.data;
      this.setState({ menus });
    })  
    .catch(error => {
      console.log('Error ya', error); 
    })
    
  }

  masukKeranjang = (value) => {

      axios.get(API_URL + "keranjangs?product.id=" + value.id) 
        .then(res => {
          if (res.data.length === 0) {
            const keranjang = {
              jumlah: 1,
              total_harga: value.harga,
              product: value
            };
    
            axios.post(API_URL + "keranjangs", keranjang)
              .then(() => {
                swal({
                  title: "Berhasil menambahkan keranjang",
                  text: "Berhasil menambahkan keranjang: " + keranjang.product.nama,
                  icon: "success",
                  button: false,
                  timer: 1500,
                });
              })
              .catch(error => {
                console.log('Error ya', error); 
              });
          } else {
            const keranjang = {
              jumlah: res.data[0].jumlah + 1,
              total_harga: res.data[0].total_harga + value.harga,
              product: value
            };
    
            axios.put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
              .then(() => {
                swal({
                  title: "Berhasil menambahkan keranjang",
                  text: "Berhasil menambahkan keranjang: " + keranjang.product.nama,
                  icon: "success",
                  button: false,
                  timer: 1500,
                });
              })
              .catch(error => {
                console.log('Error ya', error); 
              });
          }
        })
        .catch(error => {
          console.log('Error ya', error); 
        });    
  }
  
  render() {
    const{menus, categoryChoosen, keranjangs} = this.state;
    return (
      <div className="App">
        <NavbarComponents />
        <div className='mt-3'>
          <Container fluid>
          <Row>
            <ListCategories changeCategory={this.changeCategory} categoryChoosen={categoryChoosen}/>
            <Col>
              <h4><strong>Daftar Produk</strong></h4>
              <hr />
              <Row>
                {menus && menus.map((menu) => (
                  <Menus 
                    key={menu.id}
                    menu={menu}
                    masukKeranjang={this.masukKeranjang}
                  /> 
                ))}
              </Row>
            </Col>
            <Hasil keranjangs={keranjangs}/>
          </Row>
          </Container>
        </div>
      </div>
    )
  }
}