import React, { useEffect, useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurshasesThunk } from '../store/slices/purshase.slice';

const Purshase = () => {

    const dispatch = useDispatch()
        const purshases = useSelector(state => state.purshases)

    useEffect(()=> {
        dispatch(getPurshasesThunk())
    },[])

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    const va = () =>{
        const date = new Date(purshases[0]?.createdAt)
        return date.toLocaleDateString(undefined, options)
    }

    return (
        <Container className='mt-5 mb-5'>
            <h1 className='border-bottom text-center p-4'>My Purshases</h1>

            <ListGroup as="ul">
            {
                purshases.map(purshase => (
                    <ListGroup.Item className='mt-5 p-4 border mx-auto' as="li" 
                                    key={purshase.id}
                                    style={{listStyle: 'none', width: '70%'}}>
                        <p  style={{color: 'black', fontWeight: '700'}}>{va()}</p>
                        {
                            purshase.cart.products.map((products) =>(
                                <li className='border-top border-bottom' 
                                    key={products.id}
                                >
                                    <p>{products.brand}</p>
                                    <Link to={`/product/${products.id}`}><h5>{products.title}</h5></Link>

                                        <div className='d-flex position-relative'>
                                            <p>Quantity: {products.productsInCart.quantity}</p>
                                            <p  className='position-absolute end-0' 
                                                style={{fontSize: '13px'}}
                                            >
                                                $ {parseInt(products.price)}
                                            </p>
                                        </div>
                                       
                                        <p  className='position-relative' 
                                            style={{color: 'gray'}}
                                        >
                                            Sub-total 
                                            <span   className='position-absolute end-0' 
                                                    style={{color: 'black', fontWeight: '700'}}
                                            >
                                                        $ {products.price * products.productsInCart.quantity}
                                            </span>
                                        </p>
                                </li>
                            ))
                        }
                    </ListGroup.Item>
                ))
            }
            </ListGroup>
        </Container>
    );
};

export default Purshase;
