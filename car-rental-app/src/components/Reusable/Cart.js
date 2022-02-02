import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { deleteFromCart } from "../../actions/carAction";
import Card from "./Card";
import { withRouter } from "react-router";
import { addBooking } from "./../../actions/customerActions";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tourStartDate: "",
      tourEndDate: "",
    };
  }

  removeFromCart = (id, user) => {
    axios.post("http://localhost:5000/api/auth/deletecartitem", { id, user });
    this.props.deleteFromCart(id);
  };

  onBook = (cartItem, user) => {
    if (window.confirm("Are you sure you want to book the car")) {
      this.props.addBooking(
        {
          carBrand: cartItem.carBrand,
          imageID: cartItem.imageID,
          price: cartItem.price,
          modelNo: cartItem.modelNo,
          date: new Date(),
          tourDate: this.state.tourStartDate,
          endDate: this.state.tourEndDate,
          carType: cartItem.features.carType,
          engineType: cartItem.features.engineType,
          mileage: cartItem.features.mileage,
          user: user.userName,
          bookingStatus: "pending",
        },
        this.props.history
      );
    } else {
      window.alert("booking canceled");
    }
  };

  handleStartDateChange = (e) => {
    this.setState({
      ...this.state,
      tourStartDate: e.target.value,
    });
  };

  handleEndDateChange = (e) => {
    this.setState({
      ...this.state,
      tourEndDate: e.target.value,
    });
  };

  render() {
    const { location } = this.props;
    if (location.pathname === "/Cart") {
      var LoggedInAsCustomer = true;
      var onCartPage = true;
    } else {
      LoggedInAsCustomer = false;
      onCartPage = false;
    }
    var price = 0;
    var days = 0;
    var month = 0;
    return (
      <div className="cartContainer">
        <div className="CardDisplay">
        <div style={{ display: "none" }}>
              {(price += this.props.cartItem.price)}
              {this.state.tourStartDate && this.state.tourEndDate ? month = this.state.tourEndDate.slice(5,7) - this.state.tourStartDate.slice(5,7): ""}
              {month !== 0 ? days = (Number(this.state.tourEndDate.substr(8, 11)) + 30) - this.state.tourStartDate.substr(8, 11): "" }
              {month == 0 && this.state.tourStartDate && this.state.tourEndDate ? days = this.state.tourEndDate.substr(8, 11) - this.state.tourStartDate.substr(8, 11): ""}
            </div>
          {this.props.cartItem.imageID ? (
            <Card
              key={
                this.props.cartItem.imageID ? this.props.cartItem.imageID : 0
              }
              car={this.props.cartItem}
              customer={LoggedInAsCustomer}
              onCartPage={onCartPage}
              deleteFromCart={this.removeFromCart}
              user={this.props.user}
            />
          ) : (
            ""
          )}
        </div>
        <div className="cartDateContainer">
          {price ? <div>
            <label className="form-label">Tour Start date</label>
            <input
              className="form-control"
              name="tourStartDate"
              type="date"
              placeholder="Tour Start Date"
              value={this.state.tourStartDate}
              onChange={this.handleStartDateChange}
            />
          </div>: ""}
          <br />
          <br />
          {price ? <div>
            <label className="form-label">Tour End date</label>
            <input
              className="form-control"
              name="tourEndDate"
              type="date"
              placeholder="Tour End Date"
              value={this.state.tourEndDate}
              onChange={this.handleEndDateChange}
            />
          </div>: ""}
          <div className="container">
            
            <div style={{ display: "none" }}>
              {this.state.tourStartDate && this.state.tourEndDate
                ? (price =
                    price * days)
                : ""}
            </div>
            {this.state.tourEndDate < this.state.tourStartDate ? (
              <p style={{color: "red"}}>End date should fall after the start date</p>
            ) : (
              ""
            )}
            {days == 0 ? "" : <span><h4>Total days :</h4><p>&nbsp;&nbsp;{Number(days)}</p></span>}
            {price ? (
              <div>
                <span>
                  <h2>Total Price:</h2>
                  <h4>{price}</h4>&nbsp;<strong>&#8377;&nbsp;</strong>
                </span>
                {this.state.tourStartDate && this.state.tourEndDate ? <button
                    onClick={() =>
                      this.onBook(this.props.cartItem, this.props.user)
                    }
                    className="btn btn-primary"
                  >
                    Book Now
                  </button>:
                  <button
                  onClick={() =>
                    this.onBook(this.props.cartItem, this.props.user)
                  }
                  disabled
                  className="btn btn-primary"
                >
                  Book Now
                </button>}
              </div>
            ) : (
              <p>No Item in the cart</p>
            )}
            &nbsp;&nbsp;
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItem: state.data.cart,
  };
};

export default connect(mapStateToProps, { deleteFromCart, addBooking })(
  withRouter(Cart)
);
