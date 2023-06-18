import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from 'axios'
import {toast} from 'react-toastify'
const NewRoom = () => {
  const [info, setInfo] = useState({})
  const [hotelId, setHotelId] = useState(null)
  const [rooms, setRooms] = useState([])

  const { data, loading, error } = useFetch('/hotels')
  const handleChangeRoom = (e) => {
    setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleNewRoom = async (e) => {
    e.preventDefault()
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }))
    console.log(roomNumbers)
    try {
      await axios.post(`/rooms/${hotelId}`, {...info, roomNumbers})
    } catch (err) {
      toast.error(error.message)
      console.log(err)
    }
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">

          <div className="right">
            <form>


              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} onChange={handleChangeRoom} placeholder={input.placeholder} />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea placeholder="Give Room Number with comma" onChange={(e) => setRooms(e.target.value)} />
              </div>
              <div className="formInput">
                <label>Choose a Hotel</label>
                <select id="hotelId" onChange={(e) => setHotelId(e.target.value)}>
                  {loading ? "Loading..." : data && data.map(hotel => (
                    <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                  ))}
                </select>
              </div>
              <button onClick={handleNewRoom}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
