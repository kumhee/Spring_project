import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalOrder = ({ p }) => {
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getOrders = async () => {
    const res = await axios(`/purchase/list.json/${p.oid}`);
    //console.log(res.data);
    setOrders(res.data);
  }

  useEffect(() => {
    getOrders();
  }, [])

  return (
    <>
      <Button variant="dark" size="sm" onClick={handleShow}> 상세보기 </Button>

      <Modal size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title> 주문번호: {p.oid} </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Card style={{ padding: '20px' }}>
            <Card.Body>
              <div>
                <p> 주문자: {p.uname} [{p.uid}] </p>
                <p> 전화번호: {p.phone} </p>
                <p> 주소: {p.address1} {p.address2} </p>
                <p style={{ marginBottom: '0' }}> 총액: {p.fmtsum} </p>
              </div>
            </Card.Body>
          </Card>
          <div>
            <h4 className='text-center mt-5 mb-3' style={{ fontWeight: 'bold' }}> 주문상품 </h4>

            <Table bordered hover responsive="sm" className='list_table'>
              <thead>
                <tr className='text-center'>
                  <th colSpan={2}> 상품명 </th>
                  <th> 금액 </th>
                  <th> 수량 </th>
                  <th> 합계 </th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o =>
                  <tr key={o.oid} className='text-center' style={{ cursor: 'pointer', letterSpacing:'-1px' }} >
                    <td><img src={`/display?file=${o.image}`} width="30" alt="" /></td>
                    <td> [{o.pid}] {o.title} </td>
                    <td> {o.fmtprice} </td>
                    <td> {o.qnt} </td>
                    <td> {o.fmtsum} </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}> Close </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalOrder