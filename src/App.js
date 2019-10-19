import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Navbar,  Button, Row, Container, } from 'react-bootstrap';
import './App.css';
import 'react-input-range/lib/css/index.css';
import InputRange from 'react-input-range';
import NavbarSection from './components/Navbar'
import CarouselMovie from './components/CarouselMovie'
import CardMovie from './components/CardMovie'


function App() {
  // declaring--------------
  const [MoviesObject, setMoviesObject] = useState([]); // 1.set Array to render deskcard
  const [isSort, setIsSort] = useState(false); // 1. check sorting
  const [Query, setQuery] = useState("") // 2. keyword to search
  const [Page, setPage] = useState(1) // 3.set Page from URL to get API
  const [ListGenre, setListGenre] = useState([]) // 4. Array contain genre list
  const [IdSortNow, setIdSortNow] = useState(null) // 4. Contain Id of genre need sort
  const [keyTrailer, setKeyTrailer] = useState(null) // 5.set link trailer (component:App->CardMovies->CardExpand)
  const [modalShow, setModalShow] = React.useState(false);// 6. check show modal (component:App->CardMovies->CardExpand)

  const [rangeValue, setRangeValue] = useState({ 'min': 2, 'max': 10 })
  //--Mounting---------------
  const GetData = async () => {       //1.get API to set MoviesObject
    const reponsive = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=f07284f1ade881c56e1508bbd16a384c&page=${Page}`)
    const data = await reponsive.json();
    const objectAdded = MoviesObject.concat(data.results);
    setMoviesObject(objectAdded); //*<here>*
    if (isSort) {                    // if sorting, only show by sort
      SortByGenre(IdSortNow, objectAdded) // *objectAdded* from line above
    }
  }

  const Search = async () => {       //2.get API with Query to set new MoviesObject
    const reponsive = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=f07284f1ade881c56e1508bbd16a384c&language=en-US&query=${Query}&page=1&include_adult=false`);
    const data = await reponsive.json();
    console.log('searchdata', data);
    setMoviesObject(data.results);
  }

  const LoadMore = () => {          //3. change URL of (1)GetData
    setPage(Page + 1);
  }

  const GetGenre = async () => {     //4.get Genre list Object
    const reponsive = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=f07284f1ade881c56e1508bbd16a384c&language=en-US`)
    const data = await reponsive.json();
    setListGenre(data.genres)
  }
  useEffect(() => { GetGenre() }, [])
  const SortByGenre =                //4. filter MoviesObject by sort
    async (IDgenre, objectAdded = MoviesObject) => {
      const dataSort = objectAdded.filter((movie) => movie.genre_ids.includes(IDgenre));
      setMoviesObject(dataSort);
      setIsSort(true);
      setIdSortNow(IDgenre);
    }

  const getKeyTrailer = async (idMovie) => { //5.set API keyTrailer youtube
    const reponsive = await fetch(`https://api.themoviedb.org/3/movie/${idMovie}/videos?language=en-US&api_key=f07284f1ade881c56e1508bbd16a384c`)
    const data = await reponsive.json();
    setKeyTrailer(data.results[0].key);
    console.log('datatrailer', data)
  }


  // updating------------------
  useEffect(() => { GetData() }, [Page]); //3.get API more when Page is changed

  // render UI-----------------
  return (

    <div className="App">

      <NavbarSection
        ListGenre={ListGenre}
        SortByGenre={SortByGenre}
        setQuery={setQuery}
        Search={Search}
      />
      {/* // creat input range */}
      <Navbar bg="light" expand="lg"> 
        <InputRange
          maxValue={20}
          minxValue={0}
          value={rangeValue}
          onChange={value => setRangeValue(value)}
        />
      </Navbar>

      <Container className={'container'}>

        <Row className={'row'}>
          <CarouselMovie MoviesObject={MoviesObject}/>
        </Row>
        
        <Row className={'row'}>
          {/* Card desk section---------------- */}
          {MoviesObject && MoviesObject.map(movie => {
            return (
              <CardMovie 
                movie={movie && movie}
                keyTrailer={keyTrailer}
                modalShow={modalShow}
                setModalShow={setModalShow}
                overview={movie && movie.overview}
                imdb={movie && movie.vote_average}
                getKeyTrailer={getKeyTrailer}
                movieId={movie.id}
              />
            )
          })}
          {/* //----------------------------- */}
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

