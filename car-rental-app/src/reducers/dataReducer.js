import { GET_BOOKINGS, GET_CAR, GET_CARS, UPDATE_CART, GET_BOOKING, GET_CART} from './../actions/types';

const initialState = {
    cars: [],
    car: {},
    bookings: [],
    booking: {},
    cart: {},
    users: []
}

function dataReducer(state = initialState, action){
    switch (action.type){
        case GET_CARS:
            return {
                ...state,
                cars: action.payload
            }
        case GET_BOOKINGS:
            return {
                ...state,
                bookings: action.payload
            }
        case GET_CAR:
            return {
                ...state,
                car: action.payload
            }
        case UPDATE_CART:
            return {
                ...state,
                cart: action.payload
            }
        case GET_BOOKING:
            return {
                ...state,
                booking: action.payload
            }
        case GET_CART:
            return {
                ...state,
                cart : action.payload
            }
        
        default:
            return state;
    
}
}

export default dataReducer;
