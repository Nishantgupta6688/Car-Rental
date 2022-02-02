import axios from "axios";
import { GET_BOOKINGS,GET_BOOKING, UPDATE_CART } from "./types";

export const addBooking = (booking,history) => async(dispatch) => {
    
    try{
        await axios.post("http://localhost:3000/CarBookingList",booking)
        .then(
            dispatch({
                type: UPDATE_CART,
                payload: {}
            })
        )
        window.alert("Your car was successfully booked! the driver will contact you on your tour date")
        history.push("/")        
    }catch(error){
        console.log(error);
    }
}

export const getBookings = (user) => async(dispatch) => {
    let res = await axios.get('http://localhost:3000/CarBookingList');
    let filterRes = res.data.filter(data => data.user === user);
    console.log(user)

    dispatch({
        type: GET_BOOKINGS,
        payload: filterRes
    })
};

export const getBooking = (bookingDataIndex) => async(dispatch) => {
    let res = await axios.get(`http://localhost:3000/carBookingList/${bookingDataIndex}`);
    dispatch({
        type: GET_BOOKING,
        payload: res.data
    })
};

export const getAllBookings = () => async(dispatch) => {
    let res = await axios.get(`http://localhost:3000/carBookingList`);
    dispatch({
        type: GET_BOOKINGS,
        payload: res.data
    })
};



export const approveBooking = (booking,bookingIndex,history) => async(dispatch) => {
    try {
        await axios.put(
          `http://localhost:3000/carBookingList/${bookingIndex}`,
          booking
        );
        history.push("/");
      } catch (error) {
        console.log(error);
      }
}

export const rejectBooking = (booking,bookingIndex,history) => async(dispatch) => {
    try {
        await axios.put(
          `http://localhost:3000/carBookingList/${bookingIndex}`,
          booking,
        );
        history.push("/");
      } catch (error) {
        console.log(error);
      }
}