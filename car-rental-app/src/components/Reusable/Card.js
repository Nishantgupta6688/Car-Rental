import { React } from "react";
import { Link } from "react-router-dom";
import { deleteCar, deleteFromCart, updateCart } from "../../actions/carAction";
import {connect} from 'react-redux';
import  axios  from 'axios';



const Card = (props) => {

  const decideLocation = (id,user) => {
    if(props.onCartPage){
      const removeFromCart = (id,user) => {
        if(window.confirm("Are you sure you want to delete the item")){
        axios.post("http://localhost:5000/api/auth/deletecartitem",{id,user});
        props.onDeleteClick();
        }else{
          window.alert("delete cancelled");
        }
      }
      return <button className="btn btn-warning" onClick={() => removeFromCart(id, props.user.userName) }>Delete</button>
    }
    else{
      return <button className="btn btn-primary" onClick={() => props.onAddToCartClick(id)}>Add To Cart</button>
    }
  }

    const url = "https://drive.google.com/uc?export=view&id=" + props.car.imageID;
  return (
    <div  className="card" style={{width: "18rem"}}>
      <img src={url} className="card-img-top" alt="..." />
      <div className="card-body">
        <h4 className="card-title">{props.car.carBrand}</h4>
        <h6>{props.car.modelNo}</h6> 
        <p className="card-text">
        <span><strong>Price:</strong>&nbsp;&nbsp;{props.car.price}&nbsp;&#8377;&nbsp;Per Day</span><br />
          <span><strong>Mileage:</strong>&nbsp;&nbsp;{props.car.features.mileage}</span><br />
          <span><strong>Engine Type:</strong>&nbsp;&nbsp;{props.car.features.engineType}</span><br/>
          <span><strong>Car Type:</strong>&nbsp;&nbsp;{props.car.features.carType}</span>
        </p>
        {props.customer ? <div>
        {decideLocation(props.car.id,props.user)}&nbsp;
        <Link className="btn btn-primary" to={`/CarDetail/${props.car.id}`}>Check Car detail</Link>
        </div> : <div>
          <Link to={`/UpdateCar/${props.car.id}`} className="btn btn-primary">
          Edit Car
        </Link>&nbsp;&nbsp;&nbsp;
        <button onClick={deleteCar(props.car.id)} className="btn btn-danger">
          Delete Car
        </button>
        </div>
        }
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return{
    onAddToCartClick: (id) => {
      dispatch(updateCart(id))
    },
    onDeleteClick: (id,user) => {
      dispatch(deleteFromCart())
    }
  }
} 
export default connect(null,mapDispatchToProps)(Card);

