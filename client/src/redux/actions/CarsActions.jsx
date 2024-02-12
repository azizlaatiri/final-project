import axios from "axios";

const getAllCars = () => async (dispatch) => {
  dispatch({ type: 'Loading', payload: true });
  try {
    const response = await axios.get("/api/cars");
    dispatch({ type: "get_all_cars", payload: response.data });
  } catch (error) {
    console.error('Error fetching cars:', error);
  } finally {
    dispatch({ type: 'Loading', payload: false });
  }
};

export default getAllCars;
