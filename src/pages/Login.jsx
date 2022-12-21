import axios from 'axios';
import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const {register, handleSubmit, reset} = useForm()

    const navigate = useNavigate()

    const submit = (data) => {
       axios.post('https://e-commerce-api.academlo.tech/api/v1/users/login', data)
        .then(res =>{ 
                        localStorage.setItem('token', res.data.data.token)
                        navigate('/')
                    })
            .catch(error => {
                if(error.response.status === 404){
                    alert(error.response.data.message)
                }
            })

       reset({
            email: '',
            password: ''
       })
    }

    return (

        <Container className='mt-3 border'style={{width: '350px'}}>
            <h1 className='text-center m-3'>SIGN IN</h1>
                <p className='border text-center'>
                    Test User
                    <br />
                    User: john@gmail.com
                    <br />
                    Password: john1234
                </p>
            <Form onSubmit={handleSubmit(submit)}>
                <Form.Group className="m-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" 
                    {...register('email')}
                    style={{height: '40px'}}
                    />
                </Form.Group>

                <Form.Group className="m-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" 
                    {...register('password')}
                    style={{height: '40px'}}
                    />
                </Form.Group>
                <div className='m-3'>
                    <Button variant="success" type="submit" style={{width: '100%'}}>
                        Submit
                    </Button>
                </div>
                <div className='p-3 border-top text-center'>
                    New user?
                    <Button to='/create-user' as={Link} style={{width: '100%'}} type='button'>
                        Create New Account
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default Login;