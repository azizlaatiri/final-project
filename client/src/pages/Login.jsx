import React from 'react';
import { Form, Input, Row, Col } from 'antd';
import {Link} from 'react-router-dom';
import { useDispatch} from 'react-redux'
import { userLogin } from '../redux/actions/UserActions';


function Login() {
  const dispatch = useDispatch();
  function onFinish(values){
    console.log(values)
    dispatch(userLogin(values))
  }
 


  return (
    <div className='login'>
      <Row gutter={16} className='d-flex align-items-center'>
        <Col lg={16} style={{position:'relative'}}>
<img className='image-preview'src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJsYWNrJTIwY2FyfGVufDB8fDB8fHww" alt="" />
        <h1 className='login-logo'>CarSito</h1>        
        </Col>
        <Col lg={8} className='text-left p-5'>
          <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
            <h1 className='login-heading'>Login</h1>
            <Form.Item name='username' label='Username' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='password' label='Password' rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <div style={{ display: 'flex', alignItems: 'center' }}>
  <button className='btn1 mt-2 mb-2' style={{ marginRight: '20px' }}>Login</button>
  <Link to='/register' className='mt-2 mb-2'>Click Here to Register</Link>
</div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
