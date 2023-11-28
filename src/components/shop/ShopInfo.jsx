import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { GoHeart, GoHeartFill } from "react-icons/go";
import ReviewPage from './ReviewPage';

const ShopInfo = () => {
  const { pid } = useParams();
  const [shop, setShop] = useState('');
  const { title, maker, image, fmtprice, fmtdate, ucnt, fcnt } = shop;

  const getShop = async () => {
    const res = await axios(`/shop/info/${pid}?uid=${sessionStorage.getItem("uid")}`);
    //console.log(res.data)
    setShop(res.data);
  }

  useEffect(() => {
    getShop();
  }, [])

  const onClickGoHeart = async () => {
    if (!sessionStorage.getItem("uid")) {
      sessionStorage.setItem("target", `/shop/info/${pid}`)
      window.location.href = "/user/login";
    } else {
      await axios(`/shop/insert/favorite?pid=${pid}&uid=${sessionStorage.getItem("uid")}`)
      getShop();
    }
  }

  const onClickGoHeartFill = async () => {
    await axios(`/shop/delete/favorite?uid=${sessionStorage.getItem("uid")}&pid=${pid}`);
    getShop();
  }

  const onClickCart = async () => {
    await axios.post("/cart/insert", {uid:sessionStorage.getItem("uid"), pid})
    if(window.confirm("쇼핑을 계속하시겠습니까?")) {
      window.location.href = "/";
    } else {
      window.location.href = "/cart/list";
    }
  }

  return (
    <div className='wrap'>
      <div className='contents_title_wrap'>
        <div className='contents_title'> 상품정보 </div>
      </div>

      <div className='contents_wrap'>
        <div className='info_box_wrap'>
          <div className='info_box'>
            <div className='info_img_wrap'>
              <img src={`/display?file=${image}`} width="60%" alt="" />
            </div>

            <div className='info_article_wrap'>
              <p className='info_article_title'>
                [{pid}] {title}
                <span className='heart'>{ucnt === 0 ? <GoHeart onClick={onClickGoHeart} /> : <GoHeartFill onClick={onClickGoHeartFill} />}</span>
                <span style={{ fontSize: '12px' }}> {fcnt} </span>
              </p>
              <hr />
              <p> 가격: {fmtprice}원 </p>
              <p> 제조사: {maker} </p>
              <p> 등록일: {fmtdate} </p>
            </div>

            <div className='info_btn_wrap'>
              <Button variant='dark' size='sm' className='px-4'> 바로구매 </Button>
              <Button variant='outline-dark' size='sm' className='px-4' onClick={onClickCart}> 장바구니 </Button>
            </div>
          </div>
        </div>
      </div>
      <Tabs defaultActiveKey="profile" id="fill-tab-example" className="mb-3" fill>
        <Tab eventKey="home" title="상세설명"> 상세설명 </Tab>
        <Tab eventKey="profile" title="상품리뷰"> <ReviewPage pid={pid}/> </Tab>
      </Tabs>
    </div>
  )
}

export default ShopInfo