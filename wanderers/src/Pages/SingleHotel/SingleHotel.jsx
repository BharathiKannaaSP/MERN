import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SingleHotel.css";
import React, { useContext, useState } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Subscribe from "../../components/Subscribe/Subscribe";
import Footer from "../../components/Footer/Footer";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/Reserve/Reserve";
import HotelHeaders from "../../components/HotelHeaders";
import { useSelector } from "react-redux";
function SingleHotel({googleUser}) {
  // const { user, dispatch } = useContext(AuthContext);
  const user = useSelector(state=>state.auth.user)
const navigate = useNavigate()
  const location = useLocation();
  console.log(location,"LOCA");
  const id = location.pathname.split("/")[2];
  console.log(id,"HOTEL ID")
  const [slider, setSlider] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);
  const [openBookModal, setOpenBookModal] = useState(false);

  const { data, error, loading } = useFetch(`/hotels/find/${id}`);
  console.log(data, "SingleHotel");

  const { dates, options } = useContext(SearchContext);
  console.log(dates, "DESTINATION DATES");

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  let today = new Date()
  const days = dayDifference(
    dates[0]?.endDate || new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    dates[0]?.startDate || new Date(),
  );

  console.log(days, "DIFF DAYS");

  // const photos = [
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
  //   },
  // ];

  const handleSlider = (i) => {
    setSlider(i);
    setOpenSlider(!openSlider);
  };

  const handleSliderDirection = (direction) => {
    let newSlider;
    if (direction === "l") {
      newSlider = slider === 0 ? 5 : slider - 1;
    } else {
      newSlider = slider === 5 ? 0 : slider + 1;
    }
    setSlider(newSlider);
  };

  const handleReserve =()=>{
    if(user || googleUser ){
      setOpenBookModal(true)
    }
    else{
      navigate('/login')
    }
  }
  return (
    <div>
      {/* <HotelHeaders /> */}
      <Navbar/> 
      <Header type="list" />
      {loading ? (
        <>Loading</>
      ) : (
        <div className="hotelContainer">
          {openSlider && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpenSlider(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleSliderDirection("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slider]}
                  alt="viewerImg"
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleSliderDirection("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">{data.address}</span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi.
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper">
                  <img
                    onClick={() => handleSlider(i)}
                    src={photo}
                    alt="hotelImg"
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days} day-night stay!</h1>
                <span>
                 Location in the {data?.distance}with score of {data?.rating}!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options?.room || 100}</b> ({days}day & nights)
                </h2>
               <button onClick={handleReserve}>Reserve or Book Now!</button> 
             
              </div>
            </div>
          </div>
          <Subscribe />
          <Footer />
        </div>
      )}
      {openBookModal && <Reserve setOpenBookModal={setOpenBookModal} hotelID={id} />}
    </div>
  );
}

export default SingleHotel;
