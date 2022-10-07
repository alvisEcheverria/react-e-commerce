import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalShow = ({showModal, setShowModal}) => {

    const handleCloseModal = () => setShowModal(false);

    return (
        <div>
            <>
                <Modal  show={showModal} 
                        onHide={handleCloseModal} 
                        animation={true} 
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Thanks!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, your purchase was successful!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="success" onClick={handleCloseModal}>
                        <i class="fa-solid fa-check"></i>
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    );
};

export default ModalShow;