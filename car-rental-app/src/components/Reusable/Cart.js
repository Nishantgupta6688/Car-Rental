import React, { Component } from 'react';
import {connect} from 'react-redux';
import  axios  from 'axios';
import {deleteFromCart} from '../../actions/carAction'
import Card from './Card';
import { withRouter } from "react-router";
import { addBooking } from './../../actions/customerActions';


class Cart extends Component {

    removeFromCart = (id,user) => {
        axios.post("http://localhost:5000/api/auth/deletecartitem",{id,user});
        this.props.deleteFromCart(id)   
    }

    onBook = (cartItem,user) => {
        if(window.confirm("Are you sure you want to book the car")){
            const tourDate = window.prompt("Enter date on which car is required(yyyy-mm-dd)");
            const endDate = window.prompt("Enter date on which tour ends(yyyy-mm-dd)");
            this.props.addBooking({
                carBrand : cartItem.carBrand,
                imageID: cartItem.imageID,
                price: cartItem.price,
                modelNo: cartItem.modelNo,
                date: new Date(),
                tourDate: tourDate,
                endDate: endDate,
                carType: cartItem.features.carType,
                engineType: cartItem.features.engineType,
                mileage: cartItem.features.mileage,
                user: user.userName,
                bookingStatus: "pending"
            },this.props.history)
        }
        else{
            window.alert("booking canceled")
        }
    }

    
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
        return (
            <div>
            <div className="CardDisplay">
               {this.props.cartItem.imageID ? <Card key={this.props.cartItem.imageID ? this.props.cartItem.imageID : 0} car={this.props.cartItem} customer={LoggedInAsCustomer} onCartPage={onCartPage} deleteFromCart={this.removeFromCart} user={this.props.user} /> : ""} 
            </div>
            <div className='container'>
            <div style={{display: "none"}}>{price += this.props.cartItem.price}</div>
            {price ?  <div><span><h2>Total Price:</h2><h4>{price}</h4>&nbsp;<strong>&#8377;&nbsp;</strong></span><button onClick={() => this.onBook(this.props.cartItem,this.props.user)} className='btn btn-primary'>Book Now</button></div> : <p>No Item in the cart</p>}&nbsp;&nbsp;
            
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cartItem: state.data.cart
    }
}

export default connect(mapStateToProps,{deleteFromCart, addBooking})(withRouter(Cart));
