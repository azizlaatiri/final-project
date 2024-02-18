import axios from "axios";
import { message } from 'antd';

const Bookcar = (reqObj) => async (dispatch) => {
  dispatch({ type: 'Loading', payload: true });
  try {
    const response = await axios.post("/api/bookings",reqObj);
    message.success('You booked successfully');
  } catch (error) {
    console.log(error);
    dispatch({ type: 'Loading', payload: false });
    message.error('Booking failed');
  }
};

export default Bookcar;
