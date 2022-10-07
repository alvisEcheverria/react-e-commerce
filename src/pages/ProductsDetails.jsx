import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { postProdCartThunk } from '../store/slices/cart.slice';

const ProductsDetails = () => {
    
    const { id } = useParams()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const products = useSelector(state => state.products) 

    const productDetail = products.find(product => product.id === Number(id))
    
    const relatedProducts = 
                products.filter(product => 
                    product.category.id === productDetail.category.id)
                        .filter(listFilter => listFilter.id !== Number(id))

    const [qty, setQty] = useState(1)

    const prodToCart = () => {
    
        const addToCart = {
                            id: +id,
                            quantity: qty
                        }
    
        dispatch(postProdCartThunk(addToCart))
    }
    
    const [productImg, setProductImg] = useState({})

    useEffect(()=>{

        const img = productDetail?.productImgs[0]

        setProductImg(img)

    },[id])

    return (

        <Container className='mt-5 mb-5'>
            <Row>
                <Col lg={7}>
                    <div className='text-center' style={{width: '100%'}}>
                        <img className='img-fluid' style={{height: '300px'}} src={productImg} alt="" />
                    </div>
                    <div className='d-flex justify-content-center gap-5'>

                        <img className='img-fluid border mt-5 p-2' onClick={()=> setProductImg(productDetail?.productImgs[0])} style={{height: '100px', cursor: 'pointer'}} src={productDetail?.productImgs[0]} alt="" />
                    
                        <img className='img-fluid border mt-5 p-2' onClick={()=> setProductImg(productDetail?.productImgs[1])} style={{height: '100px', cursor: 'pointer'}} src={productDetail?.productImgs[1]} alt="" />
                    
                        <img className='img-fluid border mt-5 p-2'  onClick={()=> setProductImg(productDetail?.productImgs[2])} style={{height: '100px', cursor: 'pointer'}} src={productDetail?.productImgs[2]} alt="" />
                        
                    </div>

                </Col>
                <Col    lg={5} style={{height: '450px'}} 
                        className='d-flex flex-column justify-content-center align-items-center gap-5 border p-5 text-center'>
                        
                    <h1>{productDetail?.title}</h1>

                    <h2 style={{fontWeight: '700'}}> $ {productDetail?.price}</h2>
                    
                    
                    <div className='d-flex align-items-center'>

                        <Button className='me-5' onClick={() => setQty(qty - 1)} disabled={qty === 1} style={qty === 1 ? {cursor: 'not-allowed'} : null}>
                            -
                        </Button>

                        <h3>{qty}</h3>

                        <Button className='ms-5' onClick={() => setQty(qty + 1)}>
                            +
                        </Button>
                    </div>

                        <Button style={{width: '100%'}} type='button' onClick={prodToCart}>
                            Add to Cart
                        </Button>
                </Col>

                <div>
                    <h2 className='text-center m-5'>About this item</h2>
                    <p className='text-center mb-5'>{productDetail?.description}</p>
                </div>

                <h2 className='text-center border-top p-4'>Compare with similar items</h2>
            <Container className='border p-5'>
                <Row xs={1} md={2} lg={3} className="g-5">
                    {
                        relatedProducts.map(products => (
                            <Col key={products.id} className='d-flex justify-content-center'>
                                <Card style={{ width: '250px', height: '310px', cursor: 'pointer' }}
                                    onClick={() => navigate(`/product/${products.id}`)}>
                                    <Card.Img variant="top"
                                        src={products?.productImgs[2]}
                                        alt="product"
                                        className='img-fluid ps-5 pe-5 mt-4 mb-4'
                                        style={{height: '150px'}} 
                                    />
                                    <Card.Body className='border-top'>
                                        <Card.Title>
                                            {products.title}
                                        </Card.Title>
                                        <Card.Text style={{ textAlign: 'end', fontWeight: '700', color: 'black' }}>
                                            <small> <b>$ {products.price}</b> </small>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
                </Container>  
            </Row>
        </Container>
    );
};

export default ProductsDetails;