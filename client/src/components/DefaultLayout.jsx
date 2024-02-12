import React from 'react'
import { Button, Col } from 'antd';

function DefaultLayout(props) {
  return (
    <div>
      <div className='header bs1'>
        <div className='d-flex justify-content-between'>
            <h1>CarSito</h1>
            <Button>User</Button>
        </div>

      </div>
      <div className='content'>
            {props.children}
      </div>
    </div>
  )
}

export default DefaultLayout
