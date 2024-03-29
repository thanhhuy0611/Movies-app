import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavDropdown,  Nav, Form, FormControl, Button, } from 'react-bootstrap';
import 'react-input-range/lib/css/index.css';


export default function NavbarSection(props) {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home" onClick={() => { window.location.reload(true) }}>HUYMovies</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => { window.location.reload(true) }} href="#">Home</Nav.Link>
                        {/* <Nav.Link href="#link">Link</Nav.Link> */}
                        <NavDropdown title="Movies by genre" id="basic-nav-dropdown">
                            {props.ListGenre.map((Genre) => {
                                return <NavDropdown.Item onClick={() => props.SortByGenre(Genre.id)} href="#action/3.1">{Genre.name}</NavDropdown.Item>
                            })}
                        </NavDropdown>

                    </Nav>
                    <Form inline onChange={(e) => props.setQuery(e.target.value)}>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button onClick={() => { props.Search() }} variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
