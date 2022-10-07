import { useState } from 'react';
import { Navbar, Container, Nav, Toast, Button, NavDropdown, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Cart from './Cart';
import SearchInput from './SearchInput';

function MainNav() {

  const navigate = useNavigate()

  const logout = () =>{
      localStorage.setItem('token', '')
      navigate('/login')
  }
  
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const cart = useSelector(state => state.cart)

  return (
    <>
      <Navbar bg="primary" variant="dark" expand='lg'>
      <Container>
          <Navbar.Brand to='/' as={Link} href="#home">E-commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Brand style={{width: '100%'}}><SearchInput/></Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='d-flex align-items-center'>
                <NavDropdown title={ localStorage.getItem('token') === '' ?
                                    'Hello, sign in'
                                    :
                                    (<i className="fa-solid fa-user"></i>)
                                    } 
                                    id="basic-nav-dropdown"
                >
                  {
                    localStorage.getItem('token') !== '' ?
                    (
                    <>
                      <NavDropdown.Item href="#" to='/purshase' as={Link}>Purchase</NavDropdown.Item>
                      <NavDropdown.Item href="#" onClick={logout}>logout</NavDropdown.Item>
                    </>
                    )
                  :
                    (
                    <>
                      <NavDropdown.Item to='/login' as={Link}>Sign In</NavDropdown.Item>
                      <NavDropdown.Item to='/create-user' as={Link}>Create New Account</NavDropdown.Item>
                    </>
                    )
                  }
                </NavDropdown>
                  <Nav.Link  className='d-flex align-items-center' onClick={handleShow} style={{fontSize: '20px', color: 'green'}}><i className="fa-solid fa-cart-shopping"></i><span>{cart.length}</span></Nav.Link>
                  <Cart show={show} setShow={setShow}/>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MainNav;