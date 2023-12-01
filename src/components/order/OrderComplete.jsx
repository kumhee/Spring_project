import React from 'react'
import { useParams } from 'react-router-dom'
import { BsCartCheck } from "react-icons/bs";

const OrderComplete = () => {
  const { oid } = useParams();

  return (
    <div className='wrap'>
      <div className='contents_wrap'>
        <div className='cart_complete text-center' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '2em' }} className='mb-3'><BsCartCheck /></span>
          <div className='cart_complete_title'>주문이 완료되었습니다.</div>
          <p>주문번호: {oid}</p>
        </div>
      </div>
    </div>

  )
}

export default OrderComplete