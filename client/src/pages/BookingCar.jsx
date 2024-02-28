import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import getAllCars from '../redux/actions/CarsActions';
import { Button,Row, Col,Divider,DatePicker,Checkbox,Modal } from 'antd';
import Spinner from '../components/Spinner';
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout'
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
  const [ShowModal, SetShowModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
    if (cars.length > 0) {
      setCar(cars.find(o => o._id === carid));
    }
  }, [cars, carid]);

  function SelectTimeSlots(values) {
    const formatString = 'DD MMM YYYY HH:mm';
  
    setFrom(moment(values[0].toDate()).format(formatString));
  
    setTo(moment(values[1].toDate()).format(formatString));
  
    setTotalhours(values[1].diff(values[0], 'hours'));
  }
  function onToken(token){
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

    const reqObj = {
      token,
      user: userFromLocalStorage?.user?._id,
      car: car._id,
      totalhours,
      totalamount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,  // Convertir en chaîne de caractères au format ISO
    to 
      }
    }
  
    console.log('Request Object:', reqObj);
  
    dispatch(Bookcar(reqObj));
  }
  
  
  
  
  function Booknow() {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    console.log('User _id from localStorage:', userFromLocalStorage?.user?._id);
  
    // Log the selected dates and times
    console.log('Selected From:', from);
    console.log('Selected To:', to);
  
    const reqObj = {
      user: userFromLocalStorage?.user?._id,
      car: car._id,
      totalhours,
      totalamount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,  // Convertir en chaîne de caractères au format ISO
    to 
      }
    }
  
    console.log('Request Object:', reqObj);
  
    dispatch(Bookcar(reqObj));
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
          

          <RangePicker
            showTime={{ format: 'HH:mm' }}
           
            onChange={SelectTimeSlots}
          />
          <button className='btn1 mt-2' onClick={()=>SetShowModal(true)}> See Selected Time</button>
          {from && to &&(
            <div style={{ textAlign: 'right' }}>
          
            <p>Total Hours:  {totalhours}</p>
            <p>Rent per Hour: {car?.rentperdays} DT</p>
            <p> Driver Required : <Checkbox onChange={(e) => setDriver(e.target.checked)}></Checkbox></p>
            <h3>Total Amount:{totalamount} DT</h3>
            <StripeCheckout
            shippingAddress
        token={onToken}
        amount={totalamount*100}
        stripeKey="pk_test_51Oo1LICSIxWezHO1Wt7N5QAaFAmmAzpk5YyWoYwpZxRbGD8JxVanA1kuI5kZKJroAy9NFH4b6TiwKPHYbnSK3TZ800BOe88VO4"
      >
        <button className='btn1' onClick={Booknow}>Book Now</button>
        </StripeCheckout>
            

            
            </div>
          )}
          
        </Col>
      </Row>
      <Modal visible={ShowModal} closable={false} footer={false} title='Booked Time Slots'>
    {car && (<div className='p-2'>
          {car.bookedtimeslots.map(slot=>{
            return <button className='btn1 mt-2'>{slot.from}-{slot.to}</button>

          })


          }
        <div style={{ textAlign: 'right', marginTop: '5rem' }}>
  <button className='btn1 mt-2' onClick={() => SetShowModal(false)}>Close</button>
</div>


          </div>)}
      </Modal>
    </DefaultLayout>
  );
}

export default BookingCar;
