import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setFilteredCategory } from '../store/slices/filteredCategory.slice';

const Home = () => {
    
    const navigate = useNavigate()
      const dispatch = useDispatch()
        const [categories, setCategories] = useState([])
          const products = useSelector(state => state.products)

    useEffect(()=>{

        axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))

    }, [])

    const [productFiltered, setProductFiltered] = useState([])

    const filterCategory = (categoryId) =>{
      const filtered = products.filter(product => product.category.id === categoryId)
      dispatch(setFilteredCategory(filtered))
      
    }

    useEffect(() => {

      const category = products.filter(product => product.category.id)

      setProductFiltered(category)

    }, [])

    return (
        <>
            <Carousel fade>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="./img/gamer.jpg"
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="./img/culture.jpg"
                    alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="./img/alexa.jpg"
                    alt="Third slide"
                    />
                </Carousel.Item>
                </Carousel>
        
            <Container className='mt-5'>
              <Row xs={1} md={2} lg={4} 
                  className="g-4 d-flex justify-content-center align-items-center"
              >
                  {
                    localStorage.getItem('token') === '' &&
                        <Col >
                            <Card className='text-center' style={{ height: '130px' }}>
                              <Card.Body>
                                <Card.Title>Sign in for the best experience</Card.Title>
                                <Button onClick={() => navigate('/login')}>
                                  Sign in securely
                                </Button>
                              </Card.Body>
                            </Card>
                        </Col>
                  }    
                  {
                    categories.map(category => (
                        <Col key={category.id}>
                          <Card onClick={()=> filterCategory(category.id)} 
                                to='/product' as={Link}
                                style={{ height: '130px' }}
                          >
                            <Card.Body className='d-flex align-items-center justify-content-center'
                            >
                              <Card.Title className='text-center'>{category.name}</Card.Title>
                            </Card.Body>
                          </Card>
                        </Col>
                     ))   
                    }
                </Row>
            </Container>
         </>
    );
};

export default Home;