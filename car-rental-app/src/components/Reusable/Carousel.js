import React from "react";
import prevBtn from "../../media/arrow-back-outline.svg";
import nextBtn from "../../media/arrow-forward-outline.svg";

function Carousel(props) {
  return (
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://drive.google.com/uc?export=view&id=1or6QHRDkeWv5dJSOVxcPaDABxYFB9fSq"
            className="d-block w-100"
            alt="..."
          />
        </div>
        {props.links &&
          props.links.map((link) => {
            const url =
              "https://drive.google.com/uc?export=view&id=" + link.imageID;
            return (
              <div key={link.id} className="carousel-item">
                <img src={url} className="d-block w-100" alt="..." />
              </div>
            );
          })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <img className="carouselControlIcon" src={prevBtn} alt="..."></img>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <img className="carouselControlIcon" src={nextBtn} alt=".."></img>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
