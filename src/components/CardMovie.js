import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Card, Col } from 'react-bootstrap';
import 'react-input-range/lib/css/index.css';
import CardExpand from './CardExpand'


export default function CardMovie(props) {
    return (
        <>
            <Col xs={6} md={4} className={'column'}>
                <Card className={'card'}>
                    <Card.Img id={props.movie.id && props.movie.id} variant="top"
                        src={`https://image.tmdb.org/t/p/w500${props.movie && props.movie.poster_path}`} />
                    <Card.Body className={'card-body'}>
                        <Card.Title className={'card-title'}>{(props.movie && props.movie.title)}</Card.Title>
                        <Card.Text className={'card-text'}>

                            <CardExpand
                                keyTrailer={props.keyTrailer}
                                modalShow={props.modalShow}
                                setModalShow={props.setModalShow}
                                overview={props.movie && props.movie.overview}
                                imdb={props.movie && props.movie.vote_average}
                                getKeyTrailer={props.getKeyTrailer}
                                movieId={props.movieId}
                            />

                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}

