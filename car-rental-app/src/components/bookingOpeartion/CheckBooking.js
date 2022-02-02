import React from "react";
import { connect } from "react-redux";
import { getAllBookings } from "../../actions/customerActions";
import { approveBooking, rejectBooking } from './../../actions/customerActions';


class CheckBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      searchTerm: ""
    };
  }

  componentDidMount() {
    this.props.getAllBookings();
  }

  confirmApprove(booking,id,history){
    if(window.confirm("Are you sure you want to approve this booking")){
      this.props.approveBooking(booking,id,history)
    }
    else{
      window.alert("Booking aprroval was canceled")
    }
  }

  rejectBooking(booking,id,history){
    let message = window.prompt("Enter reason of cancelling the booking")
    if(window.confirm("Are you sure you want to approve this booking")){
      this.props.rejectBooking({...booking,rejectionQuery: message,bookingStatus: "cancelled"},id,history)
    }
    else{
      window.alert("Booking rejection was canceled")
    }
  }

  renderPendingBookings(user) {
    if (user.bookingStatus === "pending") {
      return (
        <div className="bookingCard">
          <div className="bookingCardImage">
            <img src={`https://drive.google.com/uc?export=view&id=${user.imageID}`} alt="..." />
          </div>
          <div className="bookingCardAvailablity">
           <span><h3>Booking Date:</h3>&nbsp;&nbsp;&nbsp;{user.date.substr(0,10)}</span>
           <span><h3>Available quantity:</h3>&nbsp;&nbsp;&nbsp;5</span>
          </div>
          <div className="bookingCardData">
            <span><h3>Booked by:</h3>&nbsp;&nbsp;&nbsp;{user.user}</span>
            <span><h3>Booking car:</h3>&nbsp;&nbsp;&nbsp;{user.carBrand}&nbsp;{user.modelNo}</span>
            <span><h3>Car Type:</h3>&nbsp;&nbsp;&nbsp;{user.carType}&nbsp;</span>
          </div>
          <div className="bookingCardButton">
            <button className="btn btn-primary" onClick={() => this.confirmApprove({...user,bookingStatus: "booked"},user.id,this.props.history) }>Accept</button>
            <button className="btn btn-danger" onClick={() => this.rejectBooking(user,user.id,this.props.history) }>Reject</button>
          </div>
        </div>
      );
    }
  }

  handleChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  render() {
    return (
      <div className="ListCar">
        <input className="ListCarInput" type="text" value={this.state.searchTerm} onChange={this.handleChange} placeholder="Type here to search by car type" />
        {this.state.searchTerm ? this.props.bookings.filter(data => data.carType.includes(this.state.searchTerm)).map((user) => {
          return <div key={user.id}>{this.renderPendingBookings(user)}</div>;
        }): this.props.bookings.map((user) => {
          return <div key={user.id}>{this.renderPendingBookings(user)}</div>;
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookings: state.data.bookings,
  };
};

export default connect(mapStateToProps, { getAllBookings, approveBooking, rejectBooking })(CheckBooking);
