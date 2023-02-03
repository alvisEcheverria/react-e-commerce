import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredCategory } from '../store/slices/filteredCategory.slice';

const PriceFilter = () => {

            const products = useSelector(state => state.products)
                const filteredCategory = useSelector(state => state.filteredCategory)
                    const dispatch = useDispatch()
                        const [min, setMin] = useState('')
                            const [max, setMax] = useState('')

    const filteredPrice = () => {
        if(filteredCategory.length === 0){
            if(min && max){
                const filtered = products.filter(product => Number(product.price) >= min)
                                            .filter(product => Number(product.price) <= max)
                return dispatch(setFilteredCategory(filtered))
            }
            else if(min){
                const filtered = products.filter(product => Number(product.price) >= min)
                return dispatch(setFilteredCategory(filtered))
            }
            else{
                const filtered = products.filter(product => Number(product.price) <= max)
                return dispatch(setFilteredCategory(filtered))
            }
        }
        else{
            if(min && max){
                const filtered = filteredCategory.filter(product => Number(product.price) >= min)
                                            .filter(product => Number(product.price) <= max)
                return dispatch(setFilteredCategory(filtered))
            }
            else if(min){
                const filtered = filteredCategory.filter(product => Number(product.price) >= min)
                return dispatch(setFilteredCategory(filtered))
            }
            else{
                const filtered = filteredCategory.filter(product => Number(product.price) <= max)
                return dispatch(setFilteredCategory(filtered))
            }
        }
       
    }

    return (
        <Form className='mt-5 mb-5'>
            <p className='border-bottom pb-2'>Price</p>
            <InputGroup>
                <div className='mb-3'>
                    <Form.Control
                        type="number" 
                        value={min}
                        onChange={e => setMin(e.target.value)}
                        placeholder='Insert Min'
                        style={{ height: '40px' }}
                    />
                </div>
                <div className='mb-3'>
                    <Form.Control
                        type="number" 
                        value={max}
                        onChange={e => setMax(e.target.value)}
                        placeholder='Insert Max'
                        style={{ height: '40px' }}
                    />
                </div>

                    <Button onClick={filteredPrice} 
                            className='d-flex align-items-center justify-content-center' 
                            variant='success' 
                            id="button-addon2" 
                            style={{ width: '100%', height: '40px', textTransform: 'capitalize'}}
                            type='submit'
                    >
                        Filter price
                    </Button>
                </InputGroup>
            </Form>
        );
    };

export default PriceFilter;