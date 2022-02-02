import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CustomerComponent from "./components/CustomerComponent";
import CarOperations from "./components/carOperations/CarOperations";
import AddCar from "./components/carOperations/AddCar";
import CheckBooking from "./components/bookingOpeartion/CheckBooking";
import CreateBooking from "./components/bookingOpeartion/CreateBooking";
import Homepage from "./components/layout/Homepage";
import ListCar from "./components/Reusable/ListCar";
import HeaderBar from "./components/layout/HeaderBar";
import UpdateCar from "./components/carOperations/UpdateCar";
import CarDetail from "./components/Reusable/CarDetail";
import Cart from "./components/Reusable/Cart";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import axios from "axios";
import { getCart } from "./actions/carAction";
import { connect } from "react-redux";
import ListBooking from "./components/bookingOpeartion/ListBooking";

function App(props) {
  const [user, setUser] = useState("");
  const [logoutUser, setLogoutUser] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/users").then((res) => {
      let userData = res.data.find(
        (person) => person.profile.email === user.userName
      );
      let localData = JSON.parse(localStorage.getItem("login"));
      localStorage.setItem("userData", JSON.stringify(userData));
      if (user === "" && localData) {
        setUser(localData);
        localStorage.setItem("userData", JSON.stringify(userData));
      }
      props.getCart();
    });
  }, [user]);

  return (
    <Router>
      <HeaderBar logoutUser={logoutUser} setLogoutUser={setLogoutUser} />
      <br />
      <br />
      <br />
      <br />
      <Switch>
        <Route exact path="/">
          <Homepage user={user} />
        </Route>
        <Route exact path="/login">
          <Login setLogoutUser={setLogoutUser} setUser={setUser} />
        </Route>
        <Route exact path="/register">
          <Register setLogoutUser={setLogoutUser} />
        </Route>

        <Route exact path="/Customer" component={CustomerComponent} />
        <Route exact path="/CarOperations" component={CarOperations} />
        <Route exact path="/AddCar" component={AddCar} />
        <Route exact path="/ListCars" component={ListCar} />
        <Route exact path="/CreateBooking" component={CreateBooking} />
        <Route exact path="/UpdateCar/:index" component={UpdateCar} />
        <Route exact path="/CarDetail/:index" component={CarDetail} />
        <Route exact path="/CheckBooking" component={CheckBooking} />
        <Route exact path="/Cart">
          <Cart user={user} />
        </Route>
        <Route exact path="/ListBooking">
          <ListBooking user={user} />
        </Route>
      </Switch>
    </Router>
  );
}

export default connect(null, { getCart })(App);
