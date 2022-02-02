import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cartIcon from "../../media/cart.ico";
import { connect } from "react-redux";
import { updateCart, resetCart } from "../../actions/carAction";
import { useHistory } from "react-router-dom";

const HeaderBar = (props) => {
  const history = useHistory();
  const [login, setLogin] = useState("");

  useEffect(() => {
    hydrateStateWithLocalStorage();
  }, [props.logoutUser]);

  const logout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("userData");
    props.resetCart();
    props.setLogoutUser(true);
    setLogin("");
    history.push("/");
    window.location.reload(true);
  };
  const hydrateStateWithLocalStorage = () => {
    if (localStorage.hasOwnProperty("login")) {
      let value = localStorage.getItem("login");
      try {
        value = JSON.parse(value);
        setLogin(value);
      } catch (e) {
        setLogin("");
      }
    }
  };

  const cartQuery = () => {
    if (login.role) {
      if (login.role === "owner") {
        return;
      } else {
        return (
          <span className="navbar-text">
            <Link to="/Cart">
              <img src={cartIcon} alt="..." />
              <p className="cartIcon">{props.cartItems.carBrand ? "1" : "0"}</p>
            </Link>
          </span>
        );
      }
    }
  };

  return (
    <header className="">
      <nav className="navbar navbar-expand-lg sticky-top">
        <div className="container">
          <Link className="navbar-brand" to="index.html">
            <h2>
              Car Rental <em>Website</em>
            </h2>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                {!props.logoutUser && login && login.userLogin ? (
                  <Link className="nav-link" to="" onClick={logout}>
                    Logout
                  </Link>
                ) : (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                )}
              </li>

              {!props.logoutUser && login && login.userLogin ? (
                <li style={{ display: "none" }} className="nav-item">
                  <div ></div>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <Link className="nav-link" to="/aboutus">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">{cartQuery()}</li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.data.cart,
  };
};

export default connect(mapStateToProps, { updateCart, resetCart })(HeaderBar);
