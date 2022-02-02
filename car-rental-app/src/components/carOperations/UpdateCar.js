import React, { Component } from "react";
import { connect } from "react-redux";
import { getCar, updateCar } from "./../../actions/carAction";
import { PropTypes } from "prop-types";

class UpdateCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carBrand: "",
      modelNo: "",
      price: "",
      imageID: "",
      features: {
        mileage: "",
        engineType: "",
        carType: "",
      },
    };
  }

  componentDidMount() {
    const { index } = this.props.match.params;
    this.props.getCar(index);
  }

  componentWillReceiveProps(nextProps) {
    const {
      carBrand,
      modelNo,
      price,
      imageID,
      features: { mileage, engineType, carType },
    } = nextProps.car;
    this.setState({
      carBrand,
      modelNo,
      price,
      imageID,
      features: {
        mileage,
        engineType,
        carType,
      },
    });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeTwo = (event) => {
    this.setState({
      features: {
        ...this.state.features,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { index } = this.props.match.params;
    const newCar = {
      carBrand: this.state.carBrand,
      modelNo: this.state.modelNo,
      price: this.state.price,
      imageID: this.state.imageID,
      features: {
        mileage: this.state.features.mileage,
        engineType: this.state.features.engineType,
        carType: this.state.features.carType,
      },
    };

    this.props.updateCar(index, newCar, this.props.history);
  };

  render() {
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Edit Car form</h5>
              <hr />
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg "
                    placeholder="Car Brand"
                    name="carBrand"
                    value={this.state.carBrand}
                    onChange={this.handleChange}
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Unique Car Model Number"
                    name="modelNo"
                    value={this.state.modelNo}
                    onChange={this.handleChange}
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    placeholder="Car Price"
                    name="price"
                    value={this.state.price}
                    onChange={this.handleChange}
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Car Image Google Drive ID"
                    name="imageID"
                    value={this.state.imageID}
                    onChange={this.handleChange}
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    placeholder="Car Mileage"
                    name="mileage"
                    value={this.state.features.mileage}
                    onChange={this.handleChangeTwo}
                  />
                </div>
                <br />
                <select
                  className="form-select"
                  name="engineType"
                  aria-label="Default select example"
                  defaultValue={this.state.features.engineType}
                  onChange={this.handleChangeTwo}
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                </select>
                <br />
                <select
                  className="form-select"
                  name="carType"
                  aria-label="Default select example"
                  defaultValue={this.state.features.carType}
                  onChange={this.handleChangeTwo}
                >
                  <option value="Hatchback">Hatchback</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                </select>
                <br />
                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateCar.propsTypes = {
  getCar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  car: state.data.car,
});

export default connect(mapStateToProps, { getCar, updateCar })(UpdateCar);
