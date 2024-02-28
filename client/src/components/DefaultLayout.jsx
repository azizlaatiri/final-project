import React from 'react'
import { Button} from 'antd';
import { Menu,Dropdown,Typography,Row,Col} from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, BookOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';



function DefaultLayout(props) {
  const menuStyle = {
    backgroundColor: 'rgb(204, 206, 185)',
  };
  const { SubMenu } = Menu;
  const { Title } = Typography;
  const user = JSON.parse(localStorage.getItem('user'))
const items = [
  {
    key: '1',
    label: (
      <a href="https://www.antgroup.com">
Home      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a  href="https://www.aliyun.com">
My Bookings      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a  href="https://www.luohanacademy.com">
Update Profil      </a>
    ),
  },
  {
    key: '4',
    label: ( 
      <a  onClick={() => handleLogout()}>Logout      </a>
    ),
  },
];

function handleLogout() {

  window.location.href = "/login"; 
}
  return (
    <div>
    <div className="header bs1">
      <Row gutter={16} justify="center">
        <Col lg={20} sm={24} xs={24}>
          <div className="d-flex justify-content-between">
            <h1>
            CarSito
            </h1>

              
            
            <Menu mode="horizontal" style={menuStyle}>
              <Menu.Item key='home' icon={<HomeOutlined />}>
                <Link to='/'>Home</Link>
              </Menu.Item>
              <Menu.Item key='bookings' icon={<BookOutlined />}>
                <Link to='/bookings'>My Bookings</Link>
              </Menu.Item>
         
              <Menu.Item key='logout' icon={<LogoutOutlined />}>
                <Link to='/login'>Logout</Link>
              </Menu.Item>
            </Menu>




        </div>
          </Col>
        </Row>
        
        
      </div>
      <div className='content'>
            {props.children}
      </div>
    </div>
  )
}

export default DefaultLayout
