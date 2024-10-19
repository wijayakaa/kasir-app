import React, { Component } from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import { Hasil, ListCategories, NavbarComponents, Menus } from './components';
import { API_URL } from './utils/constants';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       menus:[],
       categoryChoosen: 'Minuman'
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
  
  render() {
    const{menus, categoryChoosen} = this.state;
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
                  /> 
                ))}
              </Row>
            </Col>
            <Hasil />
          </Row>
          </Container>
        </div>
      </div>
    )
  }
}
