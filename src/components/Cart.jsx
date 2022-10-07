import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartThunk, purshaseCartThunk} from '../store/slices/cart.slice';
import getConfig from '../utils/getConfig';

const Cart = ({show, setShow}) => {

        const cart = useSelector(state => state.cart)
            const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getCartThunk())
    }, [])

    const deleteProduct = (productId) =>{
        axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${productId}`, getConfig())
            .then(()=> dispatch(getCartThunk()))
    }
    
    const handleClose = () => setShow(false);

    const purshaseCart = () =>{
        dispatch(purshaseCartThunk())
        alert('producto comprado')
    }

    const [qty, setQty] = useState(0)

    const updateCartMin = (productId, qtyMinus) =>{

        setQty(qtyMinus -1)

        const upCart = {
                            id: productId,
                            newQuantity: qty
                        }
        axios.patch('https://ecommerce-api-react.herokuapp.com/api/v1/cart', upCart, getConfig())
            .then(()=> dispatch(getCartThunk()))

    }

    const updateCartMax = (productId, qtyMax) =>{

        setQty(qtyMax +1)

        const upCart = {
                            id: productId,
                            newQuantity: qty
                        }
        axios.patch('https://ecommerce-api-react.herokuapp.com/api/v1/cart', upCart, getConfig())
            .then(()=> dispatch(getCartThunk()))

    }

    return (
            <Offcanvas show={show} onHide={handleClose}  placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='mx-auto'>My Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body style={{height: '100px'}}>
                    {
                        cart.length === 0 &&
                        <div className='d-flex flex-column align-items-center justify-content-center' style={{height: '100%'}}>
                            <img className='img-fluid p-5' src="./img/cart_empty.png" alt="" />
                            <h2>You Cart is Empty</h2>
                        </div>
                    }
                    <ListGroup>
                        {
                            cart.map(product=>(
                                <ListGroup.Item className='d-flex position-relative' 
                                                key={product.productsInCart.id}
                                                >
                                    <div>
                                        <Link to={`/product/${product.id}`}>
                                            <h2 style={{fontSize: '15px'}}>{product.title}</h2>
                                        </Link>
                                            <p>$ {product.price}</p>
                                        <div className='d-flex'>
                                            <Button className='me-4' onClick={()=> updateCartMin(product.id, product.productsInCart.quantity)}>-</Button>
                                        
                                            <p>{product.productsInCart.quantity}</p>
                                            
                                            <Button className='ms-4' onClick={()=> updateCartMax(product.id, product.productsInCart.quantity)}>+</Button>
                                        </div>
                                    </div>
                                    <Button variant='danger d-flex justify-content-center align-items-center position-absolute end-0 me-3' onClick={()=> deleteProduct(product.id)} style={{width: '5px', height: '90%'}}>
                                        <i className="fa-solid fa-trash"></i></Button>
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Offcanvas.Body>
                <Button variant='success' onClick={purshaseCart}>
                        Checkout
                </Button>
            </Offcanvas>
    );
};

export default Cart;