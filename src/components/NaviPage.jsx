import React, { useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import { getCookie, delCookie } from '../common';

const NaviPage = () => {
  const location = useLocation();
  const path = location.pathname;

  const uid = getCookie("uid");
  if (uid) sessionStorage.setItem("uid", uid);

  const onLogout = (e) => {
    e.preventDefault();
    if (window.confirm("로그아웃 하시겠습니까?")) {
      sessionStorage.clear();
      delCookie("uid");
      window.location.href = "/"
    }
  }

  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="/" className="NavLogo_font">LOGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {sessionStorage.getItem("uid") === 'admin' &&
              <>

                <Nav.Link href="/shop/search" className={path.indexOf('/shop/search') !== -1 && 'active'}>상품검색</Nav.Link>
                <Nav.Link href="/shop/list" className={path.indexOf('/shop/') !== -1 && 'active'}>상품관리</Nav.Link>
                <Nav.Link href="/admin/purchase" className={path.indexOf('/admin/') !== -1 && 'active'}>주문관리</Nav.Link>
                <Nav.Link href="/admin/chart" className={path.indexOf('/chart/') !== -1 && 'active'}>그래프</Nav.Link>
              </>
            }
            {(sessionStorage.getItem("uid") && sessionStorage.getItem("uid") !== 'admin') &&
              <>
                <Nav.Link href="/order/list" className={path.indexOf('/order/') !== -1 && 'active'}>주문목록</Nav.Link>
                <Nav.Link href="/cart/list" className={path.indexOf('/cart/') !== -1 && 'active'}>장바구니</Nav.Link>
              </>
            }

            {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>

          <Nav>
            {sessionStorage.getItem('uid') ?
              <>
                <Nav.Link href="/user/mypage" className={path.indexOf('/user/mypage') !== -1}>
                  {sessionStorage.getItem('uid')} 님
                </Nav.Link>
                <Nav.Link href="/logout" onClick={onLogout}> Logout </Nav.Link>
              </>
              :
              <>
                <Nav.Link href="/user/login" className={path.indexOf('/user/login') !== -1}> Login </Nav.Link>
                <Nav.Link eventKey={2} href="/" className={path.indexOf('/signup') !== -1}> Signup </Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NaviPage;