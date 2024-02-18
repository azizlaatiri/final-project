import React from 'react';
import { Form, Input, Row, Col } from 'antd';
import {Link} from 'react-router-dom';
import { useDispatch,useSelector} from 'react-redux'
import { userRegister } from '../redux/actions/UserActions';
import Spinner from '../components/Spinner';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
// ..
AOS.init();



function Register() {
  const dispatch = useDispatch();
  const  {loading}=useSelector(state=>state.AlertReducer)

  function onFinish(values){
    console.log(values)
    dispatch(userRegister(values))
  }
  return (
    
    <div className='login'>
              {loading && (<Spinner/>)}

      <Row gutter={16} className='d-flex align-items-center'>
        <Col lg={16} style={{position:'relative'}}>
<img data-aos='slide-left'
data-aos-duration='1500'
className='image-preview'src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJsYWNrJTIwY2FyfGVufDB8fDB8fHww" alt="" />
        <h1 className='login-logo'>CarSito</h1>        
        </Col>
        <Col lg={8} className='text-left p-5'>
          <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
            <h1 className='login-heading'>Register</h1>
            <Form.Item name='username' label='Username' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='password' label='Password' rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item name='cpassword' label=' Confirm Password' rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <div style={{ display: 'flex', alignItems: 'center' }}>
  <button className='btn1 mt-2 mb-2' style={{ marginRight: '20px' }}>Register</button>
  <Link to='/login' className='mt-2 mb-2'>Click Here to login</Link>
</div>


          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
