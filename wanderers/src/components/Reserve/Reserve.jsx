import React, { useContext, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
import './reserve.css'
import axios from 'axios'
function Reserve({ setOpenBookModal, hotelID }) {
  const [selectedRooms, setSelectedRooms] = useState([])
  const { data, loading, error } = useFetch(`/hotels/room/${hotelID}`)
  console.log(data, "ROOMS BY HOTEL ID")

  const { dates } = useContext(SearchContext)
  console.log(dates)
  const getDateRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const date = new Date(start.getTime())
    const dates = []
    while (date <= end) {
      dates.push(new Date(date).getTime())
      date.setDate(date.getDate() + 1)
    }
    return dates
  }
  let allDates = [];
  if (dates && dates[0] && dates[0].startDate && dates[0].endDate) {
    allDates = getDateRange(dates[0].startDate, dates[0].endDate);
  }
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some(date =>
      allDates.includes(new Date(date).getTime())
    )
    return !isFound
  }

  const handleSelect = (e) => {
    const checked = e.target.checked
    const values = e.target.value
    setSelectedRooms(checked ? [...selectedRooms, values] : selectedRooms.filter((item) => item !== values))
  }
  console.log(selectedRooms, "SELECTEDROOMS")


  const handleReserve = async () => {
    try {
      await Promise.all(selectedRooms.map(roomId => {
        const res = axios.put(`/rooms/availability/${roomId}`, { dates: allDates })
        return res.data
      }))
      setOpenBookModal(false)
    }
    catch (err){

    }
  }
  return (
    <div className='reserve'>
      <div className="reverseContainer">
        <AiFillCloseCircle className='reserveClose' onClick={() => setOpenBookModal(false)} />
        <span>Select your rooms:</span>
        {data.map(item => (
          <div className="reserveItems">
            <div className="reserveItemInfo" key={item._id}>
              <div className="reserveTitle">{item.title}</div>
              <div className="reserveDesc">{item.desc}</div>
              <div className="reserveMaxPeople">Max People: {item.maxPeople}</div>
              <div className="reservePrice">Price: {item.price}</div>

            </div>
            <div className="reserveSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)} />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button className='reserve_btn' onClick={handleReserve}>Reserve Now</button>
      </div>
    </div>
  )
}

export default Reserve