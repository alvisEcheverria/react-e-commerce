import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, CardGroup, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PriceFilter from '../components/PriceFilter';
import { setFilteredCategory } from '../store/slices/filteredCategory.slice';
import '../styles/home.css'

const Products = () => {

    const dispatch = useDispatch()
        const navigate = useNavigate()
            const products = useSelector(state => state.products)
                const [categories, setCategories] = useState([])

    const filteredCategory = useSelector(state => state.filteredCategory)

    useEffect(()=>{

        axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))

    }, [])

    const filterCategory = (categoryId) =>{
        
        const filtered = products.filter(product => product.category.id === categoryId)
        dispatch(setFilteredCategory(filtered))

    }

    return (
        <Container className='m-auto mt-5'>
             <Row>
                <Col>
                    <ListGroup as="ul">
                        <ListGroup.Item as="li" action
                                                onClick={()=>dispatch(setFilteredCategory(products))}
                                                style={{cursor: 'pointer'}}
                                                className='text-center'
                        >
                            All Products
                        </ListGroup.Item>
                            {
                                categories.map(category =>(
                                    <ListGroup.Item as="li" action
                                                            key={category.id} 
                                                            onClick={()=> filterCategory(category.id)}
                                                            style={{cursor: 'pointer'}}
                                                            className='text-center'
                                    >
                                        {category.name}
                                    </ListGroup.Item>
                                ))
                            }
                    </ListGroup>
                    
                    <PriceFilter/>
                </Col>

                {
                filteredCategory.length === 0 &&
                    <Col lg={10}>
                        <img className='img-fluid p-5' src="./img/not_found.jpg" alt="" />
                    </Col>
                }
                <Col lg={10} className='mx-auto'>
                    <Row xs={1} md={2} lg={3} className="g-5">
                        {
                            filteredCategory.map(product =>(
                            <Col >
                                <Card className='m-auto' style={{width: '250px', height: '360px', cursor: 'pointer', marginRight: '10rem'}} 
                                        onClick={()=> navigate(`/product/${product.id}`)}>  
                                    <Card.Img   variant="top" 
                                                src={product.productImgs[0]} 
                                                alt="product"
                                                className='img-fluid ps-3 pe-3 mt-4 mb-4'
                                                style={{height: '150px', objectFit: 'contain'}} 
                                                
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
                </Col>
            </Row>
        </Container>
    );
};

export default Products;