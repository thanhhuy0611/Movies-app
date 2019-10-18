import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonToolbar,Modal, Navbar, NavDropdown, Carousel, Collapse, ListGroupItem, Nav, Form, FormControl, Button, Row, Col, Container, Card, ListGroup, } from 'react-bootstrap';
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

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
     
      <Modal.Body className={'Modal'}>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/L61p2uyiMSo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </Modal.Body>

    </Modal>
  );
}

function App() {
  // declaring--------------
  const [MoviesObject, setMoviesObject] = useState([]);
  const [Page, setPage] = useState(1)
  const [Query, setQuery] = useState("")
  const [ListGenre, setListGenre] = useState([])
  const [isSort, setIsSort] = useState(false);
  const [IdSortNow, setIdSortNow] = useState(null)
  const [modalShow, setModalShow] = React.useState(false);
  //--Mounting---------------
  const GetGenre = async () => {
    const reponsive = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=f07284f1ade881c56e1508bbd16a384c&language=en-US`)
    const data = await reponsive.json();
    setListGenre(data.genres)
  }
  useEffect(() => { GetGenre() }, [])

  const SortByGenre = async (IDgenre, objectAdded = MoviesObject) => {
    const dataSort = objectAdded.filter((movie) => movie.genre_ids.includes(IDgenre));
    setMoviesObject(dataSort);
    setIsSort(true);
    setIdSortNow(IDgenre);
  }

  const GetData = async () => {
    const reponsive = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=f07284f1ade881c56e1508bbd16a384c&page=${Page}`)
    const data = await reponsive.json();
    const objectAdded = MoviesObject.concat(data.results);
    setMoviesObject(objectAdded);
    if (isSort) {
      SortByGenre(IdSortNow, objectAdded)
    }
  }


  const Search = async () => {
    const reponsive = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=f07284f1ade881c56e1508bbd16a384c&language=en-US&query=${Query}&page=1&include_adult=false`);
    const data = await reponsive.json();
    console.log('searchdata', data);
    setMoviesObject(data.results);
  }

  const LoadMore = () => {
    setPage(Page + 1);
  }

  // updating------------------
  useEffect(() => { GetData() }, [Page]);

  // console.log('objectapi', MoviesObject && MoviesObject);

  // render UI-----------------
  return (
    <div className="App">
      <ButtonToolbar>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Launch vertically centered modal
        </Button>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </ButtonToolbar>


      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home" onClick={() => { window.location.reload(true) }}>HUYMovies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => { window.location.reload(true) }} href="#">Home</Nav.Link>
            {/* <Nav.Link href="#link">Link</Nav.Link> */}
            <NavDropdown title="Movies by genre" id="basic-nav-dropdown">
              {ListGenre.map((Genre) => {
                return <NavDropdown.Item onClick={() => SortByGenre(Genre.id)} href="#action/3.1">{Genre.name}</NavDropdown.Item>
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
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`https://image.tmdb.org/t/p/original${MoviesObject[4] && MoviesObject[4].backdrop_path}`}
                alt="First slide"
              />
              <Carousel.Caption className={'carouselCaption'}>
                <h3>{MoviesObject[4] && MoviesObject[4].title}</h3>
                <p><a href={`#${MoviesObject[4] && MoviesObject[4].id}`}>See more here...</a></p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`https://image.tmdb.org/t/p/original${MoviesObject[5] && MoviesObject[5].backdrop_path}`}
                alt="First slide"
              />
              <Carousel.Caption className={'carouselCaption'}>
                <h3>{MoviesObject[5] && MoviesObject[5].title}</h3>
                <p><a href={`#${MoviesObject[5] && MoviesObject[5].id}`}>See more here...</a></p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`https://image.tmdb.org/t/p/original${MoviesObject[1] && MoviesObject[1].backdrop_path}`}
                alt="Third slide"
              />
              <Carousel.Caption className={'carouselCaption'}>
                <h3>{MoviesObject[1] && MoviesObject[1].title}</h3>
                <p><a href={`#${MoviesObject[1] && MoviesObject[1].id}`}>See more here...</a></p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`https://image.tmdb.org/t/p/original${MoviesObject[2] && MoviesObject[2].backdrop_path}`}
                alt="Third slide"
              />
              <Carousel.Caption className={'carouselCaption'}>
                <h3>{MoviesObject[2] && MoviesObject[2].title}</h3>
                <p><a href={`#${MoviesObject[2] && MoviesObject[2].id}`}>See more here...</a></p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Row>
        <Row className={'row'}>
          {MoviesObject && MoviesObject.map(movie => {
            return (
              <Col xs={6} md={4} className={'column'}>
                <Card className={'card'}>
                  <Card.Img id={movie.id} variant="top"
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

