import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import getAllCars from '../redux/actions/CarsActions';
import { Button,Row, Col,Divider,DatePicker,Checkbox } from 'antd';
import Spinner from '../components/Spinner';
import moment from 'moment'
import Bookcar from '../redux/actions/BookActions';



function BookingCar() {
  const { cars } = useSelector(state => state.CarsReducer);
  const { loading } = useSelector(state => state.AlertReducer);
  const { RangePicker } = DatePicker;
  const { carid } = useParams();
  const [car, setCar] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalhours, setTotalhours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalamount, setTotalamount] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
    if (cars.length > 0) {
      setCar(cars.find(o => o._id === carid));
    }
  }, [cars, carid]);

  function SelectTimeSlots(values) {
    setFrom(moment(values[0]).format('MMM DD YYYY HH:mm'));
    setTo(moment(values[1]).format('MMM DD YYYY HH:mm'));
    setTotalhours(values[1].diff(values[0], 'hours'));
  }
  function Booknow(){
    const reqObj={
      user: JSON.parse(localStorage.getItem('user'))._id,
      car: car._id,
      totalhours,
      totalamount,
      driverRequire: driver,
      bookedtimeslots:{
        to,
        from
      }
    }
    dispatch(Bookcar(reqObj))
  }

  useEffect(() => {
    if (car) {
      setTotalamount((totalhours * car.rentperdays) + (driver ? totalhours * 3 : 0));
    }
  }, [driver, totalhours, car]);

  return (
    <DefaultLayout>
      <Row justify='center' className='d-flex align-items-center' style={{ minHeight: '80vh' }}>
        {car && (
          <Col lg={10} sm={24} xs={24}>
            <img src={car.image} className='carimg2 bs1' alt={car.name} />
          </Col>
        )}
        <Col lg={10} sm={24} xs={24} className='text-right'>
          <Divider type="horizontal" dashed style={{ borderColor: 'black' }}> Car Info</Divider>
          <div style={{ textAlign: 'right' }}>
            <p>{car?.name}</p>
            <p>{car?.rentperdays} Rent per Hour</p>
            <p>Fuel: {car?.fueltype}</p>
            <p>Capacity: {car?.capacity}</p>
          </div>
          <Divider type="horizontal" dashed style={{ borderColor: 'black' }}> Select Time</Divider>
          <div style={{ textAlign: 'right' }}>

          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format='MMM DD YYYY HH:mm'
            onChange={SelectTimeSlots}
          />
          <p>Total Hours:  {totalhours}</p>
          <p>Rent per Hour: {car?.rentperdays} DT</p>
          <p> Driver Required : <Checkbox onChange={(e) => setDriver(e.target.checked)}></Checkbox></p>
          <h3>Total Amount:{totalamount} DT</h3>
          <button className='btn1' onClick={Booknow}>Book Now</button>
          </div>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default BookingCar;
