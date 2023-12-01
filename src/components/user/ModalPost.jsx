import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DaumPostcodeEmbed from 'react-daum-postcode';

const ModalPost = ({onPostcode}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onCompleted = (e) => {
    console.log(e);
    const address = e.address;
    const building = e.buildingName && `(${e.buildingName})`;
    onPostcode(address + building);
    handleClose();
  }

  return (
    <>
      <Button variant="dark" onClick={handleShow}> 주소검색 </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title> 주소검색 </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <DaumPostcodeEmbed onComplete={onCompleted} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}> Close </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalPost