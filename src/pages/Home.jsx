import { Button, Card, Col, Container, Row, Carousel } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    
    const navigate = useNavigate()
   
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
           <Row xs={1} md={2} lg={3} className="g-4">
                <Col>
                
                    {   
                        localStorage.getItem('token') === '' &&

                        <Card style={{height: '200px'}}>
                            <Card.Body>
                            <Card.Title>Sign in for the best experience</Card.Title>
                            
                            <Button onClick={()=> navigate('/login')}>
                                Sign in securely
                            </Button>
                            </Card.Body>
                        </Card>
                    }
                    
                    </Col>
               <Col>
               <Card>
                 <Card.Img variant="top" src="holder.js/100px160" />
                 <Card.Body>
                   <Card.Title>Card title</Card.Title>
                   <Card.Text>
                     This is a longer card with supporting text below as a natural
                     lead-in to additional content. This content is a little bit
                     longer.
                   </Card.Text>
                 </Card.Body>
               </Card>
               </Col>
               <Col>
               <Card>
                 <Card.Img variant="top" src="holder.js/100px160" />
                 <Card.Body>
                   <Card.Title>Card title</Card.Title>
                   <Card.Text>
                     This is a longer card with supporting text below as a natural
                     lead-in to additional content. This content is a little bit
                     longer.
                   </Card.Text>
                 </Card.Body>
               </Card>
             </Col>
         </Row>
         </Container>
         </>
    );
};

export default Home;