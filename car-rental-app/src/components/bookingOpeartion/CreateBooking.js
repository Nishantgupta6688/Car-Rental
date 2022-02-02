import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import { getCars } from '../../actions/carAction';
import Card from '../Reusable/Card';


class CreateBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
          searchCars: "",
        };
      }
    
      handleChange = (e) => {
        this.setState({ searchCars: e.target.value });
      };

    componentDidMount(){
       this.props.getCars();
    }

    render() {
        if(this.props.location.pathname === "/CreateBooking"){
            var LoggedInAsCustomer  = true
        }else {
            LoggedInAsCustomer  = false
        }
        return (
            <React.Fragment>
            <div className="ListCarInput">
          <input
            className="form-control"
            type="text"
            value={this.state.searchCars}
            onChange={this.handleChange}
            placeholder="Search car Brand of your choice"
          />
        </div>
            <div className='CardDisplay'>
            {this.props.cars.filter((list) => list.carBrand.toLowerCase().includes(this.state.searchCars))
                .map(car => {
                    return <Card key={car.id} car={car} customer={LoggedInAsCustomer} />
                })}
            </div>
            </React.Fragment>
        )
    }
}

CreateBooking.propTypes = {
    getCars : PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
        cars: state.data.cars
})

export default connect(mapStateToProps, {getCars})(CreateBooking);
