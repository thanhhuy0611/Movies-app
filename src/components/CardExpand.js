import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonToolbar, Modal, Collapse, ListGroupItem, Button, ListGroup, } from 'react-bootstrap';
import 'react-input-range/lib/css/index.css';

export default function CardExpand(props) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button
                onClick={() => {
                    setOpen(!open);
                    props.getKeyTrailer(props.movieId);
                }} // open movie detail
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                See more...
      </Button>
            <Collapse in={open}>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>{props.overview}</ListGroupItem>
                    <ListGroupItem>IMDB: {props.imdb}</ListGroupItem>
                    <ListGroupItem>
                        <ButtonToolbar>
                            <Button variant="primary" onClick={() => props.setModalShow(true)}>
                                See Trailer
              </Button>
                            <MyVerticallyCenteredModal
                                show={props.modalShow}
                                onHide={() => props.setModalShow(false)}
                                keyTrailer={props.keyTrailer}
                            />
                        </ButtonToolbar>
                    </ListGroupItem>
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
          <iframe width="560" height="315"
            src={`https://www.youtube.com/embed/${props.keyTrailer}`}
            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Modal.Body>
  
      </Modal>
    );
  }