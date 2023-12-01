import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Table, InputGroup, Form, Button } from 'react-bootstrap';
import ModalPost from '../user/ModalPost';

const OrderPage = ({ list, checkSum }) => {
  const [form, setForm] = useState('');
  const { uid, uname, phone, address1, address2 } = form;

  const getUser = async () => {
    const res = await axios(`/user/read?uid=${sessionStorage.getItem("uid")}`);
    setForm(res.data);
  }

  useEffect(() => {
    getUser();
  }, []);

  const onChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const onPostcode = (address) => {
    setForm({
      ...form,
      address1: address
    });
  }

  const onOrder = async () => {
    if (window.confirm("위 상품을 주문하시겠습니까?")) {
      const orders = list.filter(s => s.checked);
      const res = await axios.post("/purchase/insert",
        {
          ...form,
          sum: checkSum,
          orders
        });
        for(const order of orders) {   // 장바구니 비우기
          await axios.post(`/cart/delete/${order.cid}`);
        }    
      window.location.href = `/order/complete/${res.data}`;
    }
  }

  return (
    <div className='wrap'>
      <div className='contents_title_wrap'>
        <div className='contents_title'> 주문하기 </div>
      </div>

      <div className='contents_wrap'>
        <Table bordered hover responsive="sm" className='search_table'>
          <thead>
            <tr className='text-center'>
              <th>  </th>
              <th> 상품명 </th>
              <th> 가격 </th>
              <th> 수량 </th>
              <th> 합계 </th>
            </tr>
          </thead>
          <tbody>
            {list.map(s => s.checked &&
              <tr key={s.cid} className='text-center' style={{ cursor: 'pointer' }} >
                <td>[{s.cid}]<img src={`/display?file=${s.image}`} width="30" alt="" /></td>
                <td> {s.title} </td>
                <td> {s.fmtprice} </td>
                <td> {s.qnt} </td>
                <td> {s.fmtsum} </td>
              </tr>
            )}
          </tbody>
        </Table>

        <div className='cart_sum text-center'>
          <div className='cart_sum_text'>총 합계: {checkSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
        </div>

        <div className='order_infowrap'>
          <div className='order_title text-center'> 주문자 정보 </div>
          <div className='order_info'>
            <form>
              <InputGroup className='mb-3'>
                <InputGroup.Text> 아이디 </InputGroup.Text>
                <Form.Control value={uid} name="uid" readOnly />
              </InputGroup>

              <InputGroup className='mb-3'>
                <InputGroup.Text> 회원명 </InputGroup.Text>
                <Form.Control value={uname} name="uname" onChange={onChangeForm} />
              </InputGroup>

              <InputGroup className='mb-3'>
                <InputGroup.Text> 전화번호 </InputGroup.Text>
                <Form.Control value={phone} name="phone" onChange={onChangeForm} />
              </InputGroup>

              <InputGroup className='mb-1'>
                <InputGroup.Text> 주소 </InputGroup.Text>
                <Form.Control value={address1} name="address1" readOnly />
                <ModalPost onPostcode={onPostcode} />
              </InputGroup>

              <Form.Control value={address2} placeholder='상세주소' name="address2" onChange={onChangeForm} />
            </form>

            <div className='text-center mt-3'>
              <Button variant='dark' className='px-3' onClick={onOrder}> 주문하기 </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPage