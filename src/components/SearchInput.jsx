import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, ListGroup, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFilteredCategory } from '../store/slices/filteredCategory.slice';
import '../styles/searchInput.css'

const SearchInput = () => {

    const [categories, setCategories] = useState([])

    useEffect(()=>{

        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))
    
    }, [])

    const dispatch = useDispatch()

    const products = useSelector(state => state.products)

    const [searchValue, setSearchValue] = useState('')

    const [nameCategory, setNameCategory] = useState('All')

    const searchInput = () =>{
        const filtered = products.filter(product => product.title.toLowerCase().includes(searchValue.toLowerCase()))
        dispatch(setFilteredCategory(filtered))
        setSearchValue('')
    }

    let [productsSearch, setProductsSearch] = useState([])

    if(!searchValue){
        productsSearch = []
    }
    else{
        if(nameCategory === 'All'){
            productsSearch = products.filter(product => product.title.toLowerCase().includes(searchValue.toLowerCase()))
        }
        else{
            productsSearch = productsSearch.filter(product => product.title.toLowerCase().includes(searchValue.toLowerCase())) 
        }
        
    }

    const clickSearch = () =>{
        dispatch(setFilteredCategory(productsSearch))
        setSearchValue('')
    }

    const dropdownCategory = (nameCategory, categoryId) =>{
        setNameCategory(nameCategory)
        const filtered = products.filter(product => product.category.id === categoryId)
        setProductsSearch(filtered)
    }
    
    return (
        <>
            <Form className='d-flex' onSubmit={searchInput} style={{ height: '40px' }} >
                <div    className='d-flex align-items-center'
                        style={{ fontSize: '10px', textTransform: 'capitalize'}}>
                    <NavDropdown
                        title={nameCategory}
                        id="basic-nav-dropdown"
                    >
                        <NavDropdown.Item href="#"
                            onClick={() => dropdownCategory('All')}>
                            All
                        </NavDropdown.Item>

                        {
                            categories.map(category => (
                                <NavDropdown.Item href="#"
                                    key={category.id}
                                    onClick={() => dropdownCategory(category.name, category.id)}>
                                    {category.name}
                                </NavDropdown.Item>
                            ))
                        }

                    </NavDropdown>
                </div>
                <InputGroup className='position-relative'>
                    <Form.Control
                        type="text"
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        placeholder='What are you looking for?'
                        style={{ height: '40px' }}
                    />
                    <Button variant='success' id="button-addon2" style={{ height: '40px' }}>
                        <span style={{ fontSize: '20px' }}> <i className="fa-solid fa-magnifying-glass"></i></span>
                    </Button>

                    <ListGroup className='position-absolute' style={{ width: '89.3%', top: '40px', zIndex: '100', cursor: 'pointer', fontSize: '10px' }}>
                        {
                            productsSearch.map(product => (
                                <ListGroup.Item key={product.id} onClick={clickSearch} to='/product' as={Link}>
                                    {product.title}
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </InputGroup>
            </Form>

        </>

    );
};

export default SearchInput;