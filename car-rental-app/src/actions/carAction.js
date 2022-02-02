import axios from "axios";
import { GET_CARS,GET_CAR, UPDATE_CART ,GET_CART} from "./types";

export const addCar = (car,history) => async(dispatch) => {
    try{
        await axios.post("http://localhost:3000/carList",car);
        history.push("/")        
    }catch(error){
        console.log(error);
    }
}

export const getCars = () => async(dispatch) => {
    let res = await axios.get('http://localhost:3000/carList');
    dispatch({
        type: GET_CARS,
        payload: res.data
    })
};

export const getCar = (carDataIndex) => async(dispatch) => {
    let res = await axios.get(`http://localhost:3000/carList/${carDataIndex}`);
    dispatch({
        type: GET_CAR,
        payload: res.data
    })
};

export const updateCar = (carDataIndex,carDetail,history) => async(dispatch) => {
    try{
        await axios.put(`http://localhost:3000/carList/${carDataIndex}`,carDetail);
        window.alert("Car updated Successfully")
        history.push("/ListCars")
    }catch(error){
        console.log(error);
    }
};

export const deleteCar = (carDataIndex) => async(dispatch) => {
    if(window.confirm("Are you sure you want to delete this Car from the database")){
        await axios.delete(`http://localhost:3000/carList/${carDataIndex}`)
        .then(window.alert("Car details have been successfully removed from the database"));
        window.location.reload(true);
    }
}

export const getCart = () => async(dispatch) => {
    var cartData;
    if(localStorage.hasOwnProperty("userData")){
    cartData = (JSON.parse(localStorage.getItem("userData"))).cart
    }else{
        cartData = {}
    }
    dispatch({
        type: GET_CART,
        payload : cartData
    })
}

export const updateCart = (carDataIndex) => async(dispatch) => {
    var cartData;
    var userData;
    if(localStorage.hasOwnProperty("userData")){
    userData = JSON.parse(localStorage.getItem("userData"))
    cartData = userData.cart
    }else{
        cartData = {}
    }
    await axios.get(`http://localhost:3000/carList/${carDataIndex}`)
    .then(
        res => {
            if(cartData.carBrand){
                window.alert("you can book one car at a time");
            }
            else{
                cartData = res.data;
                userData.cart = cartData;
            localStorage.setItem("userData",JSON.stringify(userData))
            dispatch({
                type: UPDATE_CART,
                payload: cartData
            })   
            }
            
    }
    )
    axios.post("http://localhost:5000/api/auth/updateuser", userData)
    
    
}

export const deleteFromCart = () => async(dispatch) => {
    var cartData;
    var userData;
    if(localStorage.hasOwnProperty("userData")){
    userData = JSON.parse(localStorage.getItem("userData"))
    cartData = {}
    }else{
        cartData = {}
    }

    userData.cart = cartData;
    localStorage.setItem("userData",JSON.stringify(userData))
    dispatch({
        type: UPDATE_CART,
        payload: cartData
    })
    
    
}

export const resetCart = () => async(dispatch) => {
    dispatch({
        type: UPDATE_CART,
        payload: []
    })
}

