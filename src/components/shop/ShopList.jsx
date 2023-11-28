import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Spinner, Table, InputGroup, Button, Form } from 'react-bootstrap';
import '../Pagination.css'
import Pagination from 'react-js-pagination';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ShopList = () => {
  const navi = useNavigate();
  const location = useLocation();
  const search = new URLSearchParams(location.search);

  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const size = 5;
  const page = search.get("page") ? parseInt(search.get("page")) : 1;

  const getList = async () => {
    setLoading(true);
    const res = await axios.get(`/shop/list.json?page=${page}&size=${size}&query=${query}`);
    //console.log(res.data);
    setList(res.data.list);
    setTotal(res.data.total);
    setLoading(false);
  }

  useEffect(() => {
    getList();
  }, [location]);

  const onSubmit = (e) => {
    e.preventDefault();
    navi(`/shop/list?page=1&size=${size}&query=${query}`);
  }

  const onDelete = async (shop) => {
    if (window.confirm(`${shop.pid}번 상품을 삭제하시겠습니까?`)) {
      await axios.get(`/shop/delete?pid=${shop.pid}`);
      await axios.get(`/deleteFile?file=${shop.image}`);
      alert("상품이 삭제되었습니다.");
      navi(`/shop/list?page=1&siez=${size}&query=${query}`);
    }
  }

  if (loading) return <div className='my-5 text-center'><Spinner /></div>

  return (
    <div className='wrap'>
      <div className='contents_title_wrap'>
        <div className='contents_title'> 상품목록 </div>
      </div>

      <div className='contents_wrap'>
        <div className='search_inputbox_wrap'>
          <div className='search_inputbox_top'>
            <form onSubmit={onSubmit}>
              <InputGroup>
                <Form.Control placeholder='상품명, 제조사' value={query} onChange={(e) => setQuery(e.target.value)} />
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
              <th colSpan={2}> ID </th>
              <th> 상품명 </th>
              <th> 상품가격 </th>
              <th> 제조사 </th>
              <th> 등록일 </th>
              <th>조회수</th>
              <th>  </th>
            </tr>
          </thead>
          <tbody>
            {list.map(s =>
              <tr key={s.pid} className='text-center' style={{ cursor: 'pointer' }} >
                <td> {s.pid} </td>
                <td><img src={`/display?file=${s.image}`} alt={s.title} width="50" /></td>
                <td>
                  <Link to={`/shop/update/${s.pid}`} style={{ textDecoration: 'none' }}>
                    <div className='ellipsis'> {s.title} </div>
                  </Link>
                </td>
                <td>{s.lprice}원 </td>
                <td> {s.maker} </td>
                <td> {s.fmtdate} </td>
                <td> {s.viewcnt} </td>
                <td><Button variant='dark' size='sm' onClick={() => onDelete(s)}> Delete </Button></td>
              </tr>
            )}
          </tbody>
        </Table>
        {total > size &&
          <Pagination
            activePage={page}
            itemsCountPerPage={size}
            totalItemsCount={total}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={(clickpage) => { navi(`/shop/list?page=${clickpage}&size=${size}&query=${query}`) }} />
        }
      </div>
    </div>
  )
}

export default ShopList