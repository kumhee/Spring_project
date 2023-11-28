import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Spinner, Table, InputGroup, Button, Form } from 'react-bootstrap';

const SearchPage = () => {
  const [list, setList] = useState([]);
  const [query, setQuery] = useState("애플");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [cnt, setCnt] = useState(0);

  const getList = async () => {
    setLoading(true);
    const res = await axios(`/search/list.json?page=${page}&size=5&query=${query}`);
    //console.log(res.data);
    let data = res.data.items.map(s => s && { ...s, title: stripHtmlTags(s.title) });
    data = data.map(item => item && { ...item, checked: false });
    setList(data);
    setTotal(res.data.total);
    setLoading(false);
  }

  useEffect(() => {
    getList();
  }, [page]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (query === "") {
      alert("검색어를 입력하세요!");
    } else {
      getList();
    }
  }

  // HTML 태그를 제거하는 함수
  const stripHtmlTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    return doc.body.textContent || "";
  }

  const onSave = async (shop) => {
    if (window.confirm("상품을 등록하시겠습니까?")) {
      await axios.post("/shop/insert", shop);
      alert("상품이 등록되었습니다.")
    }
  }

  const onChangeAll = (e) => {
    const data = list.map(item => item && { ...item, checked: e.target.checked });
    setList(data);
  };

  const onChangeSingle = (e, pid) => {
    const data = list.map(item => item.productId === pid ? { ...item, checked: e.target.checked } : item);
    setList(data);
  }

  // checked가 true인 아이템을 찾아 chk 값을 업데이트하고, setCnt 함수를 사용하여 상태를 업데이트
  useEffect(() => {
    let chk = 0;
    list.forEach(item => {
      if (item.checked) chk++;
    });
    //console.log(chk);
    setCnt(chk);
  }, [list]);

  const onCheckedSave = async () => {
    if (cnt === 0) {
      alert("저장할 상품을 선택해주세요!")
    } else {
      // 선택된 상품 저장
      if (window.confirm(`${cnt}개 상품을 등록하시겠습니까?`)); {
        setLoading(true);
        for (const item of list) {
          if (item.checked) {
            await axios.post("/shop/insert", item);
          }
        }
        setLoading(false);
        alert("상품이 등록되었습니다.")
        getList();
      }
    }
  }

  if (loading) return <div className='my-5 text-center'><Spinner /></div>

  return (
    <div className='wrap'>
      <div className='contents_title_wrap'>
        <div className='contents_title'> 상품검색 </div>
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

        <div className='mb-3'>
          <Button variant='outline-dark' size='sm' onClick={onCheckedSave}> 선택저장 </Button>
        </div>

        <Table bordered hover responsive="sm" className='search_table'>
          <thead>
            <tr className='text-center'>
              <th><input type='checkbox' onChange={onChangeAll} checked={list.length === cnt} /></th>
              <th> ID </th>
              <th> Image </th>
              <th> 제목 </th>
              <th> 가격 </th>
              <th> 제조사 </th>
              <th>  </th>
            </tr>
          </thead>
          <tbody>
            {list.map(s =>
              <tr key={s.productId} className='text-center' style={{ cursor: 'pointer' }} >
                <td><input type='checkbox' checked={s.checked} onChange={(e) => onChangeSingle(e, s.productId)} /></td>
                <td> {s.productId} </td>
                <td><img src={s.image} alt={s.title} width="50" /></td>
                <td><div className='ellipsis'> {s.title} </div></td>
                <td> {s.lprice}원 </td>
                <td> {s.maker} </td>
                <td><Button variant='dark' size='sm' onClick={() => onSave(s)}> 상품등록 </Button></td>
              </tr>
            )}
          </tbody>
        </Table>

        <div className='text-center search_pagination'>
          <Button variant='outline-dark' size='sm' onClick={() => setPage(page - 1)} disabled={page === 1}> 이전 </Button>
          <span className='mx-2'> {page} / {total} </span>
          <Button variant='outline-dark' size='sm' onClick={() => setPage(page + 1)} disabled={page === 10}> 다음 </Button>
        </div>
      </div>
    </div>
  )
}

export default SearchPage