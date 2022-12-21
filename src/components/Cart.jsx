import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartThunk, purshaseCartThunk} from '../store/slices/cart.slice';
import getConfig from '../utils/getConfig';
import ModalShow from './ModalShow';

const Cart = ({show, setShow}) => {

        const cart = useSelector(state => state.cart)
            const dispatch = useDispatch()
                const [showModal, setShowModal] = useState(false);
                    const handleShowModal = () => setShowModal(true);

    useEffect(()=>{
        dispatch(getCartThunk())
    }, [])

    const deleteProduct = (productId) =>{
        axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${productId}`, getConfig())
            .then(()=> dispatch(getCartThunk()))
    }
    
    const handleClose = () => setShow(false);

    const purshaseCart = () =>{
        dispatch(purshaseCartThunk())
        handleShowModal()
    }

    const [qtyMin, setQtyMin] = useState('')
    const [productIdMin, setProductIdMin] = useState('')

        const upCartMin = {
            id: productIdMin,
            newQuantity: qtyMin
        }

    const updateCartMin = (productId, qtyMinus) =>{

        setProductIdMin(productId)
        setQtyMin(qtyMinus -1)

    }

    useEffect(() =>{

        if(qtyMin === 0){
            null
        }
        else{
           axios.patch('https://e-commerce-api.academlo.tech/api/v1/cart', upCartMin, getConfig())
            .then(()=> dispatch(getCartThunk())) 
        } 

    },[qtyMin])


    const [qtyMax, setQtyMax] = useState('')
    const [productIdMax, setProductIdMax] = useState('')

        const upCartMax = {
            id: productIdMax,
            newQuantity: qtyMax
        }

    const updateCartMax = (productId, qtyMax) =>{

        setProductIdMax(productId)
        setQtyMax(qtyMax +1)

    }

    useEffect(()=> {

        if(qtyMax === ''){
            null
        }
        else{
            axios.patch('https://e-commerce-api.academlo.tech/api/v1/cart', upCartMax, getConfig())
            .then(()=> dispatch(getCartThunk()))
        }

    },[qtyMax])

    const [total, setTotal] = useState(0)

    useEffect(()=>{

        let newTotal = 0

        cart.forEach(product =>{
            newTotal += +product.price * product.productsInCart.quantity
        })

        setTotal(newTotal)

    }, [cart])
   
    return (
        <>
            <ModalShow showModal={showModal} setShowModal={setShowModal}/>
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
                                <ListGroup.Item className='d-flex position-relative mt-3 border' 
                                                key={product.productsInCart.id}
                                                >
                                    <div>
                                        <Link to={`/product/${product.id}`}>
                                            <h2 className='pe-5' style={{fontSize: '15px'}}>{product.title}</h2>
                                        </Link>
                                            <p>$ {product.price}</p>
                                        <div className='d-flex align-items-center'>
                                            <Button className='me-4' 
                                                    onClick={()=> updateCartMin(product.id, product.productsInCart.quantity)}
                                                    disabled={product.productsInCart.quantity === 1}
                                            >
                                                -
                                            </Button>
                                        
                                            <p>{product.productsInCart.quantity}</p>
                                            
                                            <Button className='ms-4' 
                                                    onClick={()=> updateCartMax(product.id, product.productsInCart.quantity)}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </div>
                                        <Button variant='danger d-flex justify-content-center align-items-center position-absolute end-0 me-3' 
                                                onClick={()=> deleteProduct(product.id)} 
                                                style={{width: '5px', height: '90%'}}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </Button>
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Offcanvas.Body>
                        <p  className='text-end border-top pt-4 pe-5 position-relative'
                            style={{color: 'black', fontWeight: '700'}}
                        >
                            <span   className='position-absolute start-0 ps-5' 
                                    style={{color: 'gray'}}
                            >
                                Total
                            </span> 
                            $ {total}
                        </p>
                <Button variant='success' 
                        className='m-3 mt-0'
                        onClick={purshaseCart}
                        disabled={cart.length === 0}
                >
                        Checkout <i className="fa-regular fa-circle-check"></i>
                </Button>
            </Offcanvas>
        </>
    );
};

export default Cart;