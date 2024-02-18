import axios from "axios";
import { message } from 'antd';

export const userLogin = (reqObj) => async (dispatch) => {

  dispatch({ type: 'Loading', payload: true });
  try {
    const response = await axios.post("/api/users/login", reqObj);
    localStorage.setItem('user', JSON.stringify(response.data));
    message.success("Login Success");
    setTimeout(()=>{
        window.location.href='/'
    })



    dispatch({ type: "Loading", payload: response.data });
  } catch (error) {
    console.error(error);
    message.error('Login Failed');
  }
};


export const userRegister = (reqObj) => async (dispatch) => {
    dispatch({ type: 'Loading', payload: true });
    try {
      const response = await axios.post("/api/users/registe", reqObj);
      localStorage.setItem('user', JSON.stringify(response.data))
      message.success("Register Success")
      setTimeout(()=>{
        window.location.href='/login'
    })
      dispatch({ type: "Loading", payload: response.data });
    } catch (error) {
      console.error(error);
      message.error('Register Failed')
    } 
  };

  
