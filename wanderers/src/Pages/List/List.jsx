import { format } from "date-fns";
import React from "react";
import { useState } from "react";
import { DateRange } from "react-date-range";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import SearchItem from "../../components/SearchItem/SearchItem";
import "./List.css";
import useFetch from "../../hooks/useFetch";
import HotelHeaders from "../../components/HotelHeaders";
function List() {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);
  const [min,setMin] = useState('')
  const [max,setMax] = useState('')
  const { loading, error, data, refetch } = useFetch(
    `/hotels?city=${destination}&min=${min !== '' ? parseInt(min) : 1}&max=${max !== '' ? parseInt(max) : 999}`,
  );

const handleSearch = ()=>{
  refetch()
}


  console.log(data, "Search Filter City Results");
  return (
    <div>
      {/* <HotelHeaders/> */}
      <Navbar/> 

      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <div className="listItem">
              <label>Destination</label>
              <input type="text" onChange={(e) => setDestination(e.target.value)} placeholder={destination} />
            </div>
            <div className="listItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy",
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  ranges={dates}
                  minDate={new Date()}
                />
              )}
            </div>
            <div className="listItem">
              <label>Options</label>
              <div className="Options">
                <div className="optionsItem">
                  <span className="listOptItemText">
                    Min Price <small>per night</small>
                  </span>
                  <input min={0}  type="number" onChange={(e)=>setMin(e.target.value)} className="listOptInput" />
                </div>
                <div className="optionsItem">
                  <span className="listOptItemText">
                    Max Price <small>per night</small>
                  </span>
                  <input min={0} type="number" onChange={(e)=>setMax(e.target.value)} className="listOptInput" />
                </div>
                <div className="optionsItem">
                  <span className="listOptItemText">Adults</span>
                  <input
                    min={1}
                    type="number"
                    className="listOptInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="optionsItem">
                  <span className="listOptItemText">Children</span>
                  <input
                    min={0}
                    type="number"
                    className="listOptInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="optionsItem">
                  <span className="listOptItemText">Room</span>
                  <input
                    min={1}
                    type="number"
                    className="listOptInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>

            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              <>Loading...</>
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
