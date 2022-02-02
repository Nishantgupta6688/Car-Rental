import React from 'react';
import { Link } from 'react-router-dom';
import steer from '../media/Images/Steering.png';

function CustomerComponent() {
    return (
        <div>
            <Link className='btn btn-primary' to='/CreateBooking'>Book a car</Link>&nbsp;&nbsp;
            <Link className='btn btn-primary' to='/ListBooking'>List my bookings</Link>
        </div>
    )
}

export default CustomerComponent;
