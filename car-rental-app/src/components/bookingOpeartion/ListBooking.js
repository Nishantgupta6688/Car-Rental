import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getBookings } from "./../../actions/customerActions";
import {Link} from 'react-router-dom'

function ListBooking(props) {
  useEffect(() => props.getBookings(props.user.userName), []);

  const bar = (status) => {
    if (status === "pending") {
      return (
        <>
          <div className="pending">
            <br />
            <strong>Pending</strong>
          </div>
          <div className="checkingLeft">
            <br/>
          Checking
          </div>
          <div className="confirmationLeft">
            <br/>
            Booked
          </div>
        </>
      );
    }
    if (status === "booked") {
      return (
        <>
          <div className="pendingLeft">
            <br/>
            Pending
          </div>
          <div className="checkingLeft">
            <br/>
            Checking
          </div>
          <div className="booked">
            <br />
            <strong>Booked</strong>
          </div>
        </>
      );
    }
    if (status === "cancelled") {
      return (
        <>
          <div className="cancelled">
            <br />
            Cancelled
          </div>
          <div className="checkingLeft">
            <br/>
            Checking
          </div>
          <div className="confirmationLeft">
            <br/>
            Booked
          </div>
        </>
      );
    }
  };

  
  return (
    <div className="listbookingContainer">
    <Link className="btn btn-primary" style={{marginLeft : "50px"}} to="/">Go back</Link>
      {props.bookings ? props.bookings.map((item, index) => (
        
        <div key={index} className="listbooking">
        
          <div className="listBookingUpper">
            <div className="listbookingCard">
              <span>
                <h4>Booked On:</h4> <h5>{index + 1}</h5>
              </span>
              <br />
              <span>
                <h4>Booking Date:&nbsp;</h4>
                {item.date.substr(0,10)}
              </span>
            </div>
            <div className="listbookingCard">
              <span>
                <h4>Customer Email:</h4> <h5>{item.user}</h5>
              </span>
              <br/>
              <span>
                <h4>Booked Car:</h4> <h5>{item.carBrand}</h5>
              </span>
            </div>
            <div className="listbookingCard">
              {item.tourDate ? <span><h4>Tour Date:&nbsp;</h4><h5>{item.tourDate}</h5></span>: <></>}
              {item.rejectionQuery ? <span>
                <h4>Rejected due to:</h4> <h5>{item.rejectionQuery}</h5>
              </span>: <></>}
              
            </div>
          </div>
          <div className="listBookingLower">
            <div className="progressbar">{bar(item.bookingStatus)}</div>
          </div>
        </div>
      )): <div><h2>Sorry no orders made till now</h2></div>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    bookings: state.data.bookings,
  };
};
export default connect(mapStateToProps, { getBookings })(ListBooking);
