import React from "react";
import { connect } from "react-redux";
import { getCars } from "../../actions/carAction";
import Card from "./Card";

class ListCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCars: "",
    };
  }
  componentDidMount() {
    this.props.getCars();
  }

  filterList(data, query) {
    data.map((car) => {
      return <Card key={data.id} car={data} customer={query} />;
    });
  }

  handleChange = (e) => {
    this.setState({ searchCars: e.target.value });
  };

  render() {
    if (this.props.location.pathname === "/CreateBooking") {
      var LoggedInAsCustomer = true;
    } else {
      LoggedInAsCustomer = false;
    }
    return (
      <div className="ListCar">
        <div className="ListCarInput">
          <input
            className="form-control"
            type="text"
            value={this.state.searchCars}
            onChange={this.handleChange}
            placeholder="Search car Brand of your choice"
          />
        </div>
        <div className="CardDisplay">
          {this.state.searchCars
            ? this.props.cars
                .filter((list) => list.carBrand.toLowerCase().includes(this.state.searchCars))
                .map((car) => {
                  return (
                    <Card
                      key={car.id}
                      car={car}
                      customer={LoggedInAsCustomer}
                    />
                  );
                })
            : this.props.cars.map((car) => {
                return (
                  <Card key={car.id} car={car} customer={LoggedInAsCustomer} />
                );
              })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { cars: state.data.cars };
};

export default connect(mapStateToProps, { getCars })(ListCar);
