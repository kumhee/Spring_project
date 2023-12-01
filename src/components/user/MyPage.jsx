import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import ModalPost from './ModalPost';

const MyPage = () => {
  const [form, setForm] = useState('');

  const { uid, uname, address1, address2, phone } = form;

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

  const onReset = (e) => {
    e.preventDefault();
    getUser();
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("수정한 내용을 저장하시겠습니까?")) {
      // 수정하기
      await axios.post("/user/update", form);
      alert("수정이 완료되었습니다.");
      window.location.href = "/";
    }
  }

  return (
    <div className='wrap'>
      <div className='contents_title_wrap'>
        <div className='contents_title'> MyPage </div>
      </div>

      <div className='contents_wrap'>
        <div className='mypage_wrap'>
          <form onSubmit={onSubmit} onReset={onReset}>
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
              
            <div className='mypagelist_btnwrap'>
              <Button variant='dark' size='sm' type='submit' className='px-3'> 수정 </Button>
              <Button variant='outline-dark' size='sm' type='reset' className='px-3'> 취소 </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
