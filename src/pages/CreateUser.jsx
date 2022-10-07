import axios from 'axios';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const CreateUser = () => {

    const { register, handleSubmit, reset } = useForm()
    const navigate = useNavigate()

    const submit = data => {
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users', data)
            .catch(error => {
                    alert(error.response.data.message)
                    console.log(error.response)
            
                    })
        navigate('/')
    }

    return (
    <Container className='mt-2 border'style={{width: '350px'}}>
        <h1 className='mt-3 mb-3 text-center' style={{fontSize: '28px'}}>Create account</h1>
        <Form onSubmit={handleSubmit(submit)}>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" 
                        {...register('firstName')}
                        style={{height: '40px'}}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" 
                        {...register('lastName')}
                        style={{height: '40px'}}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" 
                {...register('email')}
                style={{height: '40px'}}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" 
                {...register('password')}
                style={{height: '40px'}}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="number" placeholder="Phone"
                {...register('phone')}
                style={{height: '40px'}}
                />
            </Form.Group>
            <Button variant="success" type="submit" style={{width: '100%'}}>
                Submit
            </Button>
            <div className='pt-3 border-top text-center'>
                    <p>Already have an account?
                    <Link to='/login'> Sign in</Link>
                    </p> 
            </div>
        </Form>
    </Container>
    );
};

export default CreateUser;