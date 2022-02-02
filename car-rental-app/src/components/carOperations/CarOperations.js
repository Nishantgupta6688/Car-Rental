import React from "react";
import { Link } from "react-router-dom";


function CarOperations() {

    return (
      <div>
      <h1>C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,R&nbsp;,U&nbsp;,D</h1>
        <Link className="btn btn-primary" to="/AddCar">Add a New Car</Link>&nbsp;&nbsp;&nbsp;
        <Link className="btn btn-primary" to="/ListCars">List all the Cars</Link>&nbsp;&nbsp;&nbsp;
      </div>
    );
  
}


export default CarOperations;
