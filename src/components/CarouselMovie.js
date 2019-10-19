import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Carousel   } from 'react-bootstrap';
import 'react-input-range/lib/css/index.css';

export default function CarouselMovie(props) {
    return (
        <div>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={`https://image.tmdb.org/t/p/original${props.MoviesObject[4] && props.MoviesObject[4].backdrop_path}`}
                        alt="First slide"
                    />
                    <Carousel.Caption className={'carouselCaption'}>
                        <h3>{props.MoviesObject[4] && props.MoviesObject[4].title}</h3>
                        <p><a href={`#${props.MoviesObject[4] && props.MoviesObject[4].id}`}>See more here...</a></p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={`https://image.tmdb.org/t/p/original${props.MoviesObject[5] && props.MoviesObject[5].backdrop_path}`}
                        alt="First slide"
                    />
                    <Carousel.Caption className={'carouselCaption'}>
                        <h3>{props.MoviesObject[5] && props.MoviesObject[5].title}</h3>
                        <p><a href={`#${props.MoviesObject[5] && props.MoviesObject[5].id}`}>See more here...</a></p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={`https://image.tmdb.org/t/p/original${props.MoviesObject[1] && props.MoviesObject[1].backdrop_path}`}
                        alt="Third slide"
                    />
                    <Carousel.Caption className={'carouselCaption'}>
                        <h3>{props.MoviesObject[1] && props.MoviesObject[1].title}</h3>
                        <p><a href={`#${props.MoviesObject[1] && props.MoviesObject[1].id}`}>See more here...</a></p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={`https://image.tmdb.org/t/p/original${props.MoviesObject[2] && props.MoviesObject[2].backdrop_path}`}
                        alt="Third slide"
                    />
                    <Carousel.Caption className={'carouselCaption'}>
                        <h3>{props.MoviesObject[2] && props.MoviesObject[2].title}</h3>
                        <p><a href={`#${props.MoviesObject[2] && props.MoviesObject[2].id}`}>See more here...</a></p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
