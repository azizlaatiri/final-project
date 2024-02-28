import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import getAllCars from '../redux/actions/CarsActions'
import moment from 'moment'
import { Button,Row, Col,Divider,DatePicker,Checkbox } from 'antd';
import  {Link} from 'react-router-dom'
import Spinner from '../components/Spinner';
function Home() {
  const {cars} = useSelector(state => state.CarsReducer);
  const {loading} = useSelector(state => state.AlertReducer);
  const { RangePicker } = DatePicker;
  const [totalcars,setTotalcars]=useState([])


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    setTotalcars(cars || []); 
  }, [cars]);
  

  function setFilter(values) {
    var temp = [];
    var selectedfrom = moment(values[0]);
    var selectedto = moment(values[1]);
  
    for (var car of totalcars) {
      let overlap = false;
  
      if (!car.bookedtimeslots || car.bookedtimeslots.length === 0) {
        temp.push(car);
      } else {
        for (var booking of car.bookedtimeslots) {
          if (
            selectedfrom.isBetween(booking.from, booking.to, null, '[]') ||
            selectedto.isBetween(booking.from, booking.to, null, '[]') ||
            moment(booking.from).isBetween(selectedfrom, selectedto, null, '[]') ||
            moment(booking.to).isBetween(selectedfrom, selectedto, null, '[]')
          ) {
            overlap = true;
            break; 
          }
        }
  
        if (!overlap) {
          temp.push(car);
        }
      }
    }
  
    setTotalcars(temp);
  }
  
  return (
  
      <DefaultLayout>
       
          <Row className='mt-3' justify='center'>
            <Col lg={20} sm={24} className=' d-flex justify-content-left'>
              <RangePicker showTime={{ format: 'HH:mm' }}
            format='MMM DD YYYY HH:mm' onChange={setFilter}/>
            </Col>
      
          </Row>
        {loading==true && (<Spinner/>)}
              <Row justify='center' gutter={16}>
                {totalcars.map(car=>{
                  return <Col lg={5} sm={24} xs={24}>
                    <div className='car p-2 bs1'>
                    <img src={car.image} className='caring' />
                    <div className='car-content d-flex align-items-center justify-content-between '>
                      <div>
                      <p>{car.name}</p>
                      <p>{car.rentperdays} DT Per Hour</p>
                      </div>
                 
                      <div>
                      <button className='btn1 mr-2'>
  <Link to={`/bookingcar/${car._id}`}>Book Now</Link>
</button>


 </div>
                    </div>
                    </div>
                  
                  </Col>

                })}
              </Row>

        </DefaultLayout>

      
      
    
  )
}

export default Home
