import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { InputGroup, Button, Form, Tab, Tabs } from 'react-bootstrap';
import ContentPage from './ContentPage';

const ShopUpdate = () => {
  const { pid } = useParams();
  const [form, setForm] = useState("");
  const ref_file = useRef(null);
  const [src, setSrc] = useState('http://via.placeholder.com/200x200');
  const [file, setFile] = useState(null);
  //console.log("............", pid);

  const getShop = async () => {
    const res = await axios.get(`/shop/read/${pid}`);
    //console.log(res.data);
    setForm(res.data);
  }

  const { title, lprice, image, fmtdate, maker } = form;

  useEffect(() => {
    getShop();
  }, []);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("수정하시겠습니까?"))
      await axios.post("/shop/update", form);
    alert("수정이 완료되었습니다.");
  }

  const onChangeFile = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  }

  const onSaveImage = async () => {
    if (!file) {
      alert("변경할 이미지를 선택해주세요.")
    } else {
      if (window.confirm("이미지를 변경하시겠습니까?")) {
        // 이미지 저장 REST API
        const formData = new FormData();
        formData.append("file", file);
        formData.append("pid", pid);
        await axios.post("/shop/image", formData)
        alert("이미지가 변경되었습니다.");
        await axios.get(`/deleteFile?file=${image}`);
        getShop();
        setSrc('http://via.placeholder.com/200x200');
        setFile(null);
      }
    }
  }

  return (
    <div className='wrap'>
      <div className='contents_title_wrap'>
        <div className='contents_title'> 상품정보수정 </div>
      </div>

      <div className='contents_wrap'>
        <Tabs defaultActiveKey="home" id="fill-tab-example" className="mb-5" fill>
          <Tab eventKey="home" title="상품정보">
            <div className='update_cardwrap'>
              <div className='update_card'>
                <form className="card" onSubmit={onSubmit}>
                  <InputGroup className='update_card_inputgroup mb-2'>
                    <InputGroup.Text>상품번호</InputGroup.Text>
                    <Form.Control value={pid} readOnly />
                  </InputGroup>

                  <InputGroup className='update_card_inputgroup mb-2'>
                    <InputGroup.Text>상품이름</InputGroup.Text>
                    <Form.Control name='title' value={title} onChange={onChange} />
                  </InputGroup>

                  <InputGroup className='update_card_inputgroup mb-2'>
                    <InputGroup.Text>상품가격</InputGroup.Text>
                    <Form.Control name='lprice' value={lprice} onChange={onChange} />
                  </InputGroup>

                  <InputGroup className='update_card_inputgroup mb-2'>
                    <InputGroup.Text>제조사</InputGroup.Text>
                    <Form.Control name='maker' value={maker} onChange={onChange} />
                  </InputGroup>

                  <InputGroup className='update_card_inputgroup'>
                    <InputGroup.Text>등록일</InputGroup.Text>
                    <Form.Control value={fmtdate} readOnly />
                  </InputGroup>

                  <div className='buttongroup'>
                    <Button variant='dark' size='sm' className='mx-2' type='submit'>수정</Button>
                    <Button variant='outline-dark' size='sm' type='reset'>취소</Button>
                  </div>
                </form>
              </div>
            </div>
          </Tab>

          <Tab eventKey="profile" title="상품사진">
            <div className='update_img_wrap'>
              <div className='update_img'>
                <p> 변경 전 </p>
                <div className='text-center image_container'>
                  <img src={`/display?file=${image}`} width="100%" height="300px" alt="상품이미지" />
                </div>
              </div>

              <div className='update_img'>
                <p> 변경 후 </p>
                <div className='text-center image_container'>
                  <img onClick={() => ref_file.current.click()} src={src} width="100%" height="300px" alt="플레이스홀더 이미지" style={{ cursor: 'pointer' }} />
                  <input type="file" style={{ display: 'none' }} ref={ref_file} onChange={onChangeFile} />
                </div>
              </div>
            </div>


            <div className='update_img_btn'>
              <Button variant='dark' onClick={onSaveImage}> 이미지저장 </Button>
            </div>
          </Tab>

          <Tab eventKey="content" title="상세설명">
            <ContentPage pid={pid} form={form} setForm={setForm} getShop={getShop} />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default ShopUpdate