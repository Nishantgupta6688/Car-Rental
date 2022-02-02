import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomerComponent from "../CustomerComponent";
import Carousel from "../Reusable/Carousel";
import lembo from "../../media/Images/Lamborgini-aventador.jpeg";
import bmw from "../../media/Images/BMW.jpeg";
import audi from "../../media/Images/Audi.jpeg";
import { connect } from "react-redux";
import { getAllBookings } from "../../actions/customerActions";


function Homepage(props) {
  const isLoggedIn = JSON.parse(localStorage.getItem("login"));
  const [links, setLinks] = useState([]);
  const [userData, setUserData] = useState(0)

  useEffect(() => {
    axios
      .get("http://localhost:3000/carList")
      .then((res) => setLinks(res.data));
    axios.get("http://localhost:3000/users")
    .then((res) => setUserData(res.data))
    props.getAllBookings();
  }, []);

  const displayRequestCount = () => {
    let count = 0;
    props.request.map((req) => {
      if(req.bookingStatus === "pending"){
        count += 1
      }
    })
    return count;
  }

  const displayUserOperation = (user) => {
    if (user === "owner") {
      return (
        <div className="homepageContainer">
          <div className="homepageFlex">
            <div className="borderBox one">
              <h2>Number of cars:</h2>
              <h4>{links.length}</h4>
              <Link className="btn btn-primary" to="/AddCar">Add a New Car</Link>&nbsp;&nbsp;
              <Link className="btn btn-primary" to="/ListCars">List All Cars</Link>
            </div>
            <div className="borderBox two">
            <h2>Number of customers:</h2>
              <h4>{userData.length}</h4>
            </div>
            <div className="borderBox three">
            <h2>Number of Requests:</h2>
              <h4>{displayRequestCount()}</h4>
              <Link className="btn btn-primary" to='/CheckBooking'>Check pending Booking</Link>
            </div>
          </div>
          <div></div>
        </div>
      );
    } if (user === "customer") {
      return (
        <div>
          <CustomerComponent />
          <div>
            <div></div>
            <div></div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-heading">
                  <h2>Offers</h2>
                  <Link to="/CreateBooking">
                    view more <i className="fa fa-angle-right"></i>
                  </Link>
                </div>
              </div>
              <div className="col-md-4">
                <div className="product-item">
                  <Link to="/CreateBooking">
                    <img src={bmw} alt="" />
                  </Link>
                  <div className="down-content">
                    <Link to="offers.html">
                      <h4>BMW 5 Series</h4>
                    </Link>
                    <h6>
                      <small>from</small> $120 <small>per weekend</small>
                    </h6>
                    <p>
                      The mid-range 540i continues to be the best value in the
                      5-series lineup, offering a nice balance of performance
                      and comfort.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="product-item">
                  <Link to="/CreateBooking">
                    <img src={audi} alt="" />
                  </Link>
                  <div className="down-content">
                    <Link to="offers.html">
                      <h4>Audi A4</h4>
                    </Link>
                    <h6>
                      <small>from</small> $150 <small>per weekend</small>
                    </h6>
                    <p>
                      The mid-range 540i continues to be the best value in the
                      5-series lineup, offering a nice balance of performance
                      and comfort.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="product-item">
                  <Link to="/CreateBooking">
                    <img src={lembo} alt="" />
                  </Link>
                  <div className="down-content">
                    <Link to="offers.html">
                      <h4>Lamborgini Aventador</h4>
                    </Link>
                    <h6>
                      <small>from</small> $150 <small>per weekend</small>
                    </h6>
                    <p>
                      The mid-range 540i continues to be the best value in the
                      5-series lineup, offering a nice balance of performance
                      and comfort.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="homepageContainer">
      {isLoggedIn && isLoggedIn.userLogin ? (
        <div className="container">
          <span>
            <h2>Welcome </h2>
            <h4>{isLoggedIn.userName}</h4>
          </span>
          <br/>
          <br/>
          {displayUserOperation(props.user.role)}
          <div className="latest-products"></div>
        </div>
      ) : (
        <div>
          <h1>RULE THE ROAD IN YOUR OWN WAY</h1>
          <h3>BOOK A RIDE TODAY</h3>
          <div className="carouselContainer">
            <Carousel links={links} />
          </div>
          <h3>
            Your dream car is just Link <Link to="/login">Login</Link> away
          </h3>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return{
    request: state.data.bookings
  }
}

export default connect(mapStateToProps,{getAllBookings})(Homepage);
