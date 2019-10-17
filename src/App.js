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
  const [ListGenre, setListGenre] = useState([])
  //--Mounting---------------
  const GetGenre = async () => {
    const reponsive = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=f07284f1ade881c56e1508bbd16a384c&language=en-US`)
    const data = await reponsive.json();
    setListGenre(data.genres)
  }
  useEffect(() => { GetGenre() }, [])
  const SortByGenre = async (genre) => {
    const reponsive = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=f07284f1ade881c56e1508bbd16a384c&page=2&genre=${genre}`)
    const data = await reponsive.json();
    setMoviesObject(data.results)
  }

  const GetData = async () => {
    const reponsive = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=f07284f1ade881c56e1508bbd16a384c&page=${Page}`)
    const data = await reponsive.json();
    setMoviesObject(MoviesObject.concat(data.results));
  }
  useEffect(() => { GetData() }, [Page]);

  const Search = async () => {
    const reponsive = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=f07284f1ade881c56e1508bbd16a384c&language=en-US&query=${Query}&page=1&include_adult=false`);
    const data = await reponsive.json();
    console.log('searchdata', data);
    setMoviesObject(data.results);
  }


  // updating------------------
  const LoadMore = () => {
    setPage(Page + 1);
  }

  // console.log('objectapi', MoviesObject && MoviesObject);



  // render UI-----------------
  return (
    <div className="App">

      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home" onClick={() => { window.location.reload(true) }}>HUYMovies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => { SortByGenre() }} href="#">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Movies by genre" id="basic-nav-dropdown">
              {ListGenre.map((Genre) => {
                return <NavDropdown.Item onClick={() => SortByGenre(Genre.name)} href="#action/3.1">{Genre.name}</NavDropdown.Item>
              })}
            </NavDropdown>
          </Nav>
          <Form inline onChange={(e) => setQuery(e.target.value)}>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button onClick={() => { Search() }} variant="outline-success">Search</Button>
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
          onClick={() => { LoadMore() }}
        >
          Load more
        </Button>
      </Container>
    </div>
  );
}

export default App;

