import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { updateCart } from "../../actions/carAction";
import {connect} from 'react-redux';

function CarDetail(props) {
  const [booking, setBooking] = useState([]);
  const [car, setCar] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/CarBookingList`)
      .then((res) => {
        setBooking(res.data);
      });

    axios.get(`http://localhost:3000/carList/${props.match.params.index}`)
    .then((res) => {
      setCar(res.data);
    })
  }, []);

  const query = (item) => {
    let date = item.date;
   if(item.carBrand === car.carBrand){
     return <h6>{date.substr(0,10)}</h6>
   }
    
  }

  return (
    <div>
    <Link to="/CreateBooking" style={{marginLeft: "200px"}} className="btn btn-primary" >Go back</Link>
    <div className="carDetailContainer">
      <div>
        <img
          id="carImage"
          src={`https://drive.google.com/uc?export=view&id=${car.imageID}`}
          alt="..."
        ></img>
      </div>
      <div>
        <span>
          <h2>Car Brand:</h2>
          <p>{car.carBrand}</p>
        </span>
        <span>
          <h2>Car Model No:</h2>
          <p>{car.modelNo}</p>
        </span>
        <span>
          <h2>Car Rent Per Day:</h2>
          <p>{car.price}&nbsp; Rupees</p>
        </span>
        <button className="btn btn-primary" onClick={() => props.updateCart(car.id)}>Add To Cart</button>
        {/* <span><h1>Car Mileage:</h1><p>{car.features.mileage}</p></span>
            <span><h1>Engine Type:</h1><p>{car.features.engineType}</p></span>
            <span><h1>Car Category:</h1><p>{car.features.carType}</p></span> */}
      </div>
    </div>
    <div className="notAvailable">
            <h2>Bookings not available on these dates:</h2>
            {
              booking.map((item) => query(item))
            }
    </div>
    </div>
  );
}


export default connect(null,{updateCart})(CarDetail);

