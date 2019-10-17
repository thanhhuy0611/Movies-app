import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavDropdown, Collapse, ListGroupItem, Nav, Form, FormControl, Button, Row, Col, Container, Card, ListGroup, } from 'react-bootstrap';
import './App.css';

function Example(props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        See more...
      </Button>
      <Collapse in={open}>
        <ListGroup className="list-group-flush">
          <ListGroupItem>{props.overview}</ListGroupItem>
          <ListGroup className="list-group-flush">
            <ListGroupItem>IMDB: {props.imdb}<Card.Link href="#">(Trailer)</Card.Link></ListGroupItem>
          </ListGroup>
        </ListGroup>
      </Collapse>
    </>
  );
}


function App() {
  // declaring--------------
  const [MoviesObject, setMoviesObject] = useState([]);
  const [Page, setPage] = useState(1)
  const [Query, setQuery] = useState(null)
  //--Mounting---------------
  const GetData = async () => {
    const reponsive = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=f07284f1ade881c56e1508bbd16a384c&page=${Page}`)
    let data = await reponsive.json();
    setMoviesObject(MoviesObject.concat(data.results));
  }
  useEffect(() => { GetData() }, [Page]);

  // updating------------------
  const LoadMore = ()=>{
    setPage(Page+1);
  }
  
  // console.log('objectapi', MoviesObject && MoviesObject);
  console.log('Query',  Query);

  
  // render UI-----------------
  return (
    <div className="App">

      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">HUYMovies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline onClick={Search()}>
            <FormControl onChange={(e)=> setQuery(e.target.value)} type="text" placeholder="Search" className="mr-sm-2" />
            <Button type={'submit'} variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <Container className={'container'}>
        <Row className={'row'}>
          {MoviesObject && MoviesObject.map(movie => {
            return (
              <Col xs={6} md={4} className={'column'}>
                <Card className={'card'}>
                  <Card.Img variant="top"
                    src={`https://image.tmdb.org/t/p/w500${movie && movie.poster_path}`} />
                  <Card.Body className={'card-body'}>
                    <Card.Title className={'card-title'}>{(movie && movie.title)}</Card.Title>
                    <Card.Text className={'card-text'}>
                      <Example
                        overview={movie && movie.overview}
                        imdb={movie && movie.vote_average}
                      />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}

        </Row>
        <Button variant="secondary" size="lg" block
          onClick={()=>{LoadMore()}}
        >
          Load more
        </Button>
      </Container>
    </div>
  );
}

export default App;
