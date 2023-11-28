import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../Pagination.css';
import Pagination from 'react-js-pagination';

const ReviewPage = ({ pid }) => {
  const [body, setBody] = useState('');
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const size = 3;

  const getList = async () => {
    const res = await axios(`/review/list.json?page=${page}&size=${size}&pid=${pid}`);
    let data = res.data.list.map(r => r && { ...r, ellipsis: true, view: true, text: r.body });
    setList(data);
    setTotal(res.data.total);
  };

  useEffect(() => {
    getList();
  }, [page]);

  const onRegister = async () => {
    if (body === "") {
      alert("리뷰를 입력해주세요.");
    } else {
      const data = { pid, uid: sessionStorage.getItem("uid"), body };
      await axios.post("/review/insert", data);
      setBody("");
      getList();
    }
  };

  const onClickLogin = () => {
    // target에 돌아올 주소 저장
    sessionStorage.setItem("target", `/shop/info/${pid}`);
    // 로그인으로 이동
    window.location.href = "/user/login";
  };

  // ellipsis 
  const onClickBody = (cid) => {
    const data = list.map(r => r.cid === cid ? { ...r, ellipsis: !r.ellipsis } : r);
    setList(data);
  };

  // 리뷰 삭제버튼 눌렀을때
  const onDelete = async (cid) => {
    if (window.confirm(`${cid}번 리뷰를 삭제하시겠습니까?`)) {
      await axios.post(`/review/delete/${cid}`);
      getList();
    }
  };

  // 수정버튼 눌렀을때
  const onClickUpdate = (cid) => {
    const data = list.map(r => r.cid === cid ? { ...r, view: false } : r);
    setList(data);
  }

  // 리뷰 수정하고 취소버튼 눌렀을때
  const onClickCancle = (cid) => {
    const data = list.map(r => r.cid === cid ? { ...r, view: true, body: r.text } : r);
    setList(data);
  }

  // 리뷰 수정하고 취소눌렀을때 수정한내용이 초기화되게
  const onChangeBody = (e, cid) => {
    const data = list.map(r => r.cid === cid ? { ...r, body: e.target.value } : r);
    setList(data);
  }

  // 리뷰 수정하고 저장버튼 눌렀을때
  const onClickSave = async (cid, body, text) => {
    if (body === text) {
      onClickCancle(cid);
    } else {
      if (window.confirm(`${cid}번 리뷰를 수정하시겠습니까?`)) {
        await axios.post("/review/update", {cid, body});
        alert("수정이 완료되었습니다.")
        getList();
      }
    }
  }

  return (
    <div className='wrap'>
      <div className='contents_wrap'>
        {sessionStorage.getItem("uid") ?
          <div>
            <Form.Control onChange={(e) => setBody(e.target.value)} value={body} as="textarea" rows={5} placeholder='리뷰내용을 입력하세요.' />
            <div className='text-end mt-2'>
              <Button onClick={onRegister} variant='dark' size='sm' className='px-5'> 등록 </Button>
            </div>
          </div>
          :
          <div className='mb-5'>
            <Button variant='dark' size='sm' className='w-100' onClick={onClickLogin}> 로그인 </Button>
          </div>
        }
        <div>
          <div className='review_count'>
            <span> 리뷰수: {total} </span>
          </div>
          {list.map(r =>
            <div className='review_box' key={r.cid}>
              <div className='review_writer'>
                <div className='mb-2'>
                  <small> {r.regdate} </small>
                  <small> [{r.uid}] </small>
                </div>
                {r.view ?
                  <div>
                    <div className={`review_body ${r.ellipsis && 'ellipsis2'}`} style={{ cursor: 'pointer' }} onClick={() => onClickBody(r.cid)}>
                      <span>[{r.cid}]</span> {r.text}
                    </div>
                    {sessionStorage.getItem("uid") === r.uid &&
                      <div className='review_bodybtn text-end'>
                        <Button variant='outline-dark' size='sm' onClick={() => onClickUpdate(r.cid)}> 수정 </Button>
                        <Button variant='dark' size='sm' onClick={() => onDelete(r.cid)}> 삭제 </Button>
                      </div>
                    }
                  </div>
                  :
                  <div className='mt-2'>
                    <Form.Control as='textarea' rows={5} value={r.body} onChange={(e) => onChangeBody(e, r.cid)} />
                    <div className='text-end mt-2'>
                      <Button variant='outline-dark' size='sm' className='px-3' onClick={()=>onClickSave(r.cid, r.body, r.text)}>저장</Button>
                      <Button variant='outline-dark' size='sm' className='px-3 ms-2' onClick={() => onClickCancle(r.cid)}>취소</Button>
                    </div>
                  </div>
                }
                <hr />
              </div>
            </div>
          )}
        </div>
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
  );
};

export default ReviewPage;
