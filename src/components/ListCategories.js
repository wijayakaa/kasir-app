import React, { Component } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../utils/constants';

export default class ListCategories extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         categories: []
      }
    }

    componentDidMount(){
        axios.get(API_URL + "products") 
          .then(res => {
            const categories     = res.data;
            this.setState({ categories });
          })
          .catch(error => {
            console.log('Error ya', error); 
          })
      }

    render() {
        const {categories} = this.state;
        console.log("Categories : ", this.state.categories);
        return(
            <Col md={2} mt={2}>
                <h4><strong>Daftar kategori</strong></h4>
                <hr/>
                <ListGroup>
                    {categories && categories.map((category) => (
                        <ListGroup.Item>
                            {category.nama}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        )
    }
}