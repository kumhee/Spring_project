import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { Table, InputGroup, Button, Form } from 'react-bootstrap';
import '../Pagination.css'
import Pagination from 'react-js-pagination';
import ModalOrder from './ModalOrder';

const OrderList = () => {
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const size = 3;

  const getList = async () => {
    const res = await axios(`/purchase/list.json?uid=${sessionStorage.getItem("uid")}&page=${page}&size=${size}`);
    //console.log(res.data);
    setList(res.data.list);
    setTotal(res.data.total);
  }

  useEffect(() => {
    getList()
  }, [page]);

  return (
    <div className='wrap'>
      <div className='contents_title_wrap'>
        <div className='contents_title'> 주문목록 </div>
      </div>

      <div className='contents_wrap'>
        <div className='search_inputbox_wrap'>
          <div className='search_inputbox_top'>
            <form>
              <InputGroup>
                <Form.Control placeholder='상품명, 제조사' />
                <Button variant="dark" type='submit'> 검색 </Button>
              </InputGroup>
            </form>
          </div>

          <div className='search_inputbox_btm'>
            <p> 검색수: {total}건 </p>
          </div>
        </div>

        <Table bordered hover responsive="sm" className='list_table'>
          <thead>
            <tr className='text-center'>
              <th> 주문번호 </th>
              <th> 주문자명 </th>
              <th> 주문일 </th>
              <th> 배송지 </th>
              <th> 전화번호 </th>
              <th> 금액 </th>
              <th> 상세보기 </th>
            </tr>
          </thead>
          <tbody>
            {list.map(p =>
              <tr key={p.oid} className='text-center' style={{ cursor: 'pointer' }} >
                <td> {p.oid} </td>
                <td> {p.uname} </td>
                <td> {p.fmtdate} </td>
                <td> {p.address1} {p.address2} </td>
                <td> {p.phone} </td>
                <td> {p.fmtsum} </td>
                <td> <ModalOrder p={p}/> </td>
              </tr>
            )}
          </tbody>
        </Table>
        {total > size &&
          <Pagination
            activePage={page}
            itemsCountPerPage={size}
            totalItemsCount={total}
            pageRangeDisplayed={10}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={(page) => setPage(page)} />
        }
      </div>
    </div>
  )
}

export default OrderList