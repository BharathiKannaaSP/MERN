import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getAllHotel,
  getHotel,
  getHotelRooms,
  updateHotel,
} from "../controllers/HotelController.js";
import {verifyAdmin} from '../utils/verifyToken.js'
const routes = express.Router();

//CREATE

routes.post("/",verifyAdmin, createHotel);

//UPDATE

routes.put("/:id",verifyAdmin, updateHotel);

//DELETE

routes.delete("/:id",verifyAdmin, deleteHotel);

//GET

routes.get("/find/:id", getHotel);

//GET ALL
routes.get("/",  getAllHotel);

//COUNT BY CITY
routes.get("/countByCity",countByCity)

//COUNT BY TYPE
routes.get("/countByType",countByType)

//Getting rooms by hotel id 
routes.get("/room/:id",getHotelRooms)


export default routes;
