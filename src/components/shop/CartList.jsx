import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react';
import { Spinner, Table, InputGroup, Button, Form } from 'react-bootstrap';
import '../Pagination.css'
import Pagination from 'react-js-pagination';

const CartList = () => {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [sum, setSum] = useState(0);
  const [cnt, setCnt] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const size = 3;
  const uid = sessionStorage.getItem("uid");

  const getList = async () => {
    setLoading(true);
    const res = await axios(`/cart/list.json?page=${page}&size=${size}&uid=${uid}`);
    const data = res.data.list.map(c => c && { ...c, checked: false });
    setList(data);
    setTotal(res.data.total);
    setSum(res.data.sum);
    setLoading(false);
  }

  useEffect(() => {
    getList();
  }, [page]);

  useEffect(() => {
    let count = 0;
    list.forEach(c => c.checked && count++);
    setCnt(count);
  }, [list]);

  // 삭제버튼 함수
  const onDelete = async (cid) => {
    await axios.post(`/cart/delete/${cid}`)
    getList();
  }

  // 전체선택/해제 함수
  const onChangeAll = (e) => {
    const data = list.map(c => c && { ...c, checked: e.target.checked })
    setList(data);
  }

  // 하나만 체크 해제할 수 있는 함수
  const onChangeSingle = (e, cid) => {
    const data = list.map(c => c.cid === cid ? { ...c, checked: e.target.checked } : c);
    setList(data);
  }

  const onDeleteChecked = async () => {
    if (cnt === 0) {
      alert("삭제할 상품을 선택해주세요.");
    } else {
      for (const c of list) {
        if (c.checked) {
          await axios.post(`/cart/delete/${c.cid}`);
        }
      }
      getList();
    }
  }

  const onChangeQnt = (e, cid) => {
    const data = list.map(c => c.cid === cid ? { ...c, qnt: e.target.value } : c);
    setList(data);
  }

  const onUpdateQnt = async (cid, qnt) => {
    await axios.post("/cart/update/qnt", { cid, qnt });
    getList();
  }

  if (loading) return <div className='my-5 text-center'><Spinner /></div>

  return (
    <div className='wrap'>
      <div className='contents_title_wrap'>
        <div className='contents_title'> 장바구니 </div>
      </div>

      <div className='contents_wrap'>
        <div className='cartlist_top_wrap'>
          <div className='search_inputbox_top'>
            <Button variant='outline-dark' size='sm' onClick={onDeleteChecked}> 선택삭제 </Button>
          </div>

          <div className='search_inputbox_btm'>
            <p> 상품수: {total}개 </p>
          </div>
        </div>
        <Table bordered hover responsive="sm" className='search_table'>
          <thead>
            <tr className='text-center'>
              <th><input type="checkbox" onChange={onChangeAll} checked={list.length === cnt} /></th>
              <th>  </th>
              <th>  </th>
              <th> 상품명 </th>
              <th> 가격 </th>
              <th> 수량 </th>
              <th> 합계 </th>
              <th>  </th>
            </tr>
          </thead>
          <tbody>
            {list.map(c =>
              <tr key={c.cid} className='text-center' style={{ cursor: 'pointer' }} >
                <td><input type="checkbox" checked={c.checked} onChange={(e) => onChangeSingle(e, c.cid)} /></td>
                <td> [{c.cid}] </td>
                <td><img src={`/display?file=${c.image}`} width="30" alt="" /></td>
                <td> [{c.pid}] {c.title} </td>
                <td> {c.fmtprice} </td>
                <td>
                  <InputGroup className="cart_input_group">
                    <Form.Control type='number' min={0} value={c.qnt} onChange={(e) => { onChangeQnt(e, c.cid) }} />
                    <Button variant='outline-dark' onClick={() => onUpdateQnt(c.cid, c.qnt)}>변경</Button>
                  </InputGroup>
                </td>
                <td style={{fontWeight:'bold'}}>{c.fmtsum}원</td>
                <td><Button variant='dark' size='sm' onClick={() => onDelete(c.cid)}>Delete</Button></td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className='cart_sum text-end'>
          <div>총 합계: {sum}원</div>
        </div>
        {total > size &&
          <Pagination
            activePage={page}
            itemsCountPerPage={size}
            totalItemsCount={total}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={(page) => setPage(page)} />
        }
      </div>
    </div>
  )
}

export default CartList