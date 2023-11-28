import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Spinner, Card, Col, Row, InputGroup, Button, Form } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import './Pagination.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoHeartFill } from "react-icons/go";
import { BsChatText } from "react-icons/bs";

const HomePage = () => {
  const navi = useNavigate();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const size = 6;
  const page = search.get("page") ? parseInt(search.get("page")) : 1;

  const [query, setQuery] = useState('');
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getList = async () => {
    setLoading(true);
    const res = await axios(`/shop/list.json?page=${page}&size=${size}&query=${query}`);
    console.log(res.data);
    setList(res.data.list);
    setTotal(res.data.total);
    setLoading(false);
  };

  useEffect(() => {
    getList();
  }, [location]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (query === "") {
      navi(`/?page=1&size=${size}&query=${query}`)
      alert("검색어를 입력하세요!");
    } else {
      getList();
    }
  }

  if (loading) return <div className='my-5 text-center'><Spinner /></div>;

  return (
    <div className='wrap'>
      <div className='contents_title_wrap'>
        <div className='contents_title'> . </div>
      </div>

      <div className='contents_wrap'>
        <section className='section1_wrap'>
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

          <Row className='hompage_card_wrap'>
            {list.map(shop =>
              <Col key={shop.pid} xs={6} md={4} lg={2} className='Hcard_wrap'>
                <div className='hompage_card'>
                  <Link to={`/shop/info/${shop.pid}`}>
                    <Card.Body>
                      <img src={`/display?file=${shop.image}`} width='90%' className='mb-4' />
                      <div className='ellipsis' style={{ fontSize: '14px' }}> [{shop.pid}]{shop.title} </div>
                      <div className='price' style={{ fontSize: '14px', fontWeight: 'bold', color: '#000' }}> {shop.fmtprice}원 </div>
                      <div className='like'>
                        <span > <GoHeartFill className='heart'/> {shop.fcnt} </span>
                        &nbsp;
                        <span > <BsChatText /> {shop.reviewcnt} </span>
                      </div>
                    </Card.Body>
                  </Link>
                </div>
              </Col>
            )}
          </Row>

          <div className='home_pagination'>
            {total > size &&
              <Pagination
                activePage={page}
                itemsCountPerPage={size}
                totalItemsCount={total}
                pageRangeDisplayed={10}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={(page) => { navi(`/?page=${page}&size=${size}&query=${query}`) }} />
            }
          </div>

        </section>
      </div>
    </div >
  );
};

export default HomePage;
