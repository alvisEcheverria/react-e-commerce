import React, { useEffect } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurshasesThunk } from '../store/slices/purshase.slice';

const Purshase = () => {

    const dispatch = useDispatch()
    const purshases = useSelector(state => state.purshases)
    const navigate = useNavigate()

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
            <h1 className='border-bottom'>My Purshases</h1>

            <ListGroup as="ul">
            {
                purshases.map(purshase => (
                    <ListGroup.Item className='mt-5 p-4 border' as="li" key={purshase.id} style={{background: 'black'}}>
                        <p  style={{color: 'whitesmoke', fontWeight: '700'}}>{va()}</p>
                        {
                            purshase.cart.products.map(products =>(
                                <ListGroup.Item key={products.id} onClick={()=> navigate(`/product/${products.id}`)}>
                                    <p>{products.brand}</p>
                                    <h5>{products.title}</h5>
                                    <div className='d-flex position-relative'>
                                        <p className='text-start'>Quantity: {products.productsInCart.quantity}</p>
                                        <p className='position-absolute end-0' style={{fontWeight: '700'}}>$ {products.price}</p>
                                    </div>
                                    <p className='text-end' style={{color: 'red', fontWeight: '700'}}>Total: 500</p>
                                </ListGroup.Item>
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