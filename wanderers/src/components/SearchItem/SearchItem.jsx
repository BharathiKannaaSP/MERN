import React from "react";
import "./SearchItem.css";
import { Link } from "react-router-dom";
function SearchItem({item}) {
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  return (
    <>
    <div className="searchItem">
      <img
        className="searchImg"
        src={item.photos[0]}
        alt="searchItemImg"
      />
      <div className="searchDesc">
        <h1 className="searchTitle">{item.name}</h1>
        <span className="searchDistance">{item.distance}</span>
        <span className="searchTaxiOpt">Free Airport Taxi</span>
        <span className="searchSubtite">
          {truncate(item?.desc,200)}
        </span>
        <span className="searchFeature">
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
   
    </>
  );
}

export default SearchItem;
