import React from "react";
import { connect } from "react-redux";
import { addCar } from "../../actions/carAction";
import PropTypes from "prop-types";

class AddCar extends React.Component {
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

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangetwo = (event) => {
    this.setState({
      features: {
        ...this.state.features,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
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
    this.props.addCar(newCar, this.props.history);
  };

  render() {
    return (
      <div className="loginContainer">
        <form className="loginFormContainer" onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Car Name</label>
            <input
              type="text"
              name="carBrand"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={this.state.carBrand}
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Model Number</label>
            <input
              type="text"
              name="modelNo"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={this.state.modelNo}
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Google Drive Image ID</label>
            <input
              type="text"
              name="imageID"
              className="form-control"
              value={this.state.imageID}
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mileage</label>
            <input
              type="number"
              name="mileage"
              className="form-control"
              aria-describedby="emailHelp"
              value={this.state.features.mileage}
              onChange={this.handleChangetwo}
            />
          </div>
          <select
            className="form-select"
            name="engineType"
            aria-label="Default select example"
            value={this.state.features.engineType}
            onChange={this.handleChangetwo}
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
          </select>
          <br />
          <select
            className="form-select"
            name="carType"
            aria-label="Default select example"
            value={this.state.features.carType}
            onChange={this.handleChangetwo}
          >
            <option value="Hatchback">Hatchback</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
          </select>
          <br />
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

AddCar.propTypes = {
  addCar: PropTypes.func.isRequired,
};

export default connect(null, { addCar })(AddCar);
