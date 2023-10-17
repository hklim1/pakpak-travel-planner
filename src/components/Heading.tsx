import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

function NavScrollExample() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container fluid className='mx-0'>
        <Navbar.Brand href="/">PakPak</Navbar.Brand>
        <Navbar.Toggle aria-controls="PakPak" />
        <Navbar.Collapse id="PakPak">
          <Nav
            className="me-auto my-0 my-lg-0"
            style={{ maxHeight: '100px'}}
            navbarScroll
          >
            <Nav.Link href="/plan" className='px-2'>PLAN</Nav.Link>
            <Nav.Link href="#action2" className='px-2'>UPCOMING</Nav.Link>
            <Nav.Link href="#" disabled className='px-2'>PAST</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              style={{ maxHeight: '40px'}}
              aria-label="Search"
            />
            <Button variant="outline-success" style={{ maxHeight: '40px', maxWidth: '80px'}}>Search</Button>
            <Nav className="ml-auto px-4">
                <Nav.Link href="/register">REGISTER</Nav.Link>
                <Nav.Link href="#">LOGIN</Nav.Link>
            </Nav>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;