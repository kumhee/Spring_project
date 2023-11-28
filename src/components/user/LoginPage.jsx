import axios from 'axios';
import React, { useState } from 'react'
import { Col, Form, InputGroup, Row, Button, Card } from 'react-bootstrap';
import { setCookie } from '../../common';

const LoginPage = () => {
  const [checked, setChecked] = useState(false);

  const [form, setForm] = useState({
    uid: '',
    upass: ''
  });

  const {uid, upass} = form;

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/user/login", form);
    if(res.data === 0) {
      alert("아이디가 존재하지 않습니다.");
    } else if(res.data === 2) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      if(checked) {
        setCookie("uid", uid, 7);
      }
      
      sessionStorage.setItem("uid", uid);
      if(sessionStorage.getItem("target")) {
        window.location.href = sessionStorage.getItem("target");
      } else {
        window.location.href = "/";
      }
    }
  }

  return (
    <div className='wrap'>
      <div className='contents_title_wrap'>
        <div className='contents_title'> Login </div>
      </div>

      <div className='contents_wrap'>
        <Row className='justify-content-center'>
          <Col md={4} className='mx-3'>
            <Card className='p-4'>
              <Form onSubmit={onSubmit}>
                <InputGroup className='mb-3'>
                  <InputGroup.Text>아이디</InputGroup.Text>
                  <Form.Control name='uid' value={uid} onChange={onChange}/>
                </InputGroup>

                <InputGroup className='mb-3'>
                  <InputGroup.Text>비밀번호</InputGroup.Text>
                  <Form.Control name='upass' value={upass} onChange={onChange} type='password'/>
                </InputGroup>
                <Button type='submit' variant='dark' className='w-100' size='sm'>로그인</Button>
              </Form>

              <div className='login_save'>
                <input type="checkbox" checked={checked} onChange={(e) => {setChecked(e.target.checked)}}/><span> 로그인 상태저장 </span>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default LoginPage