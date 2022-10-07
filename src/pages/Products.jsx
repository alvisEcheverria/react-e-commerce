import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, CardGroup, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilteredCategory } from '../store/slices/filteredCategory.slice';
import { getProductsThunk } from '../store/slices/products.slice';
import '../styles/home.css'

const Products = () => {

    const dispatch = useDispatch()
        const navigate = useNavigate()
            const products = useSelector(state => state.products)
                const [categories, setCategories] = useState([])

    const filteredCategory = useSelector(state => state.filteredCategory)

    useEffect(()=>{

        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))

    }, [])

    const filterCategory = (categoryId) =>{
        const filtered = products.filter(product => product.category.id === categoryId)
        dispatch(setFilteredCategory(filtered))
    }

    return (
        <Container className='mt-5 mb-5'>
             <Row>
                <Col xs={10} lg={2} className='mb-5'>

                    <ListGroup as="ul">
                        <ListGroup.Item as="li" action
                                                onClick={()=>dispatch(setFilteredCategory(products))}
                                                style={{cursor: 'pointer'}}
                        >
                            All Products
                        </ListGroup.Item>
                            {
                                categories.map(category =>(
                                    <ListGroup.Item as="li" action
                                                            key={category.id} 
                                                            onClick={()=> filterCategory(category.id)}
                                                            style={{cursor: 'pointer'}}
                                    >
                                        {category.name}
                                    </ListGroup.Item>
                                ))
                            }
                    </ListGroup>
                </Col>
                <Col lg={10}>
                    <CardGroup>
                        <Row xs={1} md={2} lg={3} className="g-5">
                                {
                                    filteredCategory.map(product =>(
                                    <Col key={product.id}>
                                        <Card className='me-5 ms-5'  style={{width: '250px', height: '360px', cursor: 'pointer'}} 
                                                onClick={()=> navigate(`/product/${product.id}`)}>  
                                            <Card.Img   variant="top" 
                                                        src={product.productImgs[2]} 
                                                        alt="product"
                                                        className='img-fluid ps-5 pe-5 mt-4 mb-4'
                                                        style={{height: '150px'}} 
                                                        
                                            />
                                            <Card.Body className='border-top'>
                                            <Card.Text style={{fontWeight: '700', color: 'black', fontSize: '10px'}}>
                                                    {product.category.name}
                                                </Card.Text>
                                                <Card.Title>
                                                    {product.title} 
                                                </Card.Title>
                                                <Card.Text style={{textAlign: 'end', fontWeight: '700', color: 'black'}}>
                                            
                                                <small> <b>$ {product.price}</b> </small>
                                                </Card.Text>
                                            </Card.Body>
                                    </Card> 
                                    </Col>  
                                ))}
                        </Row>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Products;