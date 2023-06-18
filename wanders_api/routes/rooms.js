import express from "express";
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailabilty } from "../controllers/RoomController.js";

import {verifyAdmin} from '../utils/verifyToken.js'
const routes = express.Router();

//CREATE

routes.post("/:hotelid",verifyAdmin, createRoom);

//UPDATE

routes.put("/:id",verifyAdmin, updateRoom);
//SELECT ROOM
routes.put("/availability/:id",  updateRoomAvailabilty);
//DELETE

routes.delete("/:id/:hotelid",verifyAdmin, deleteRoom);

//GET

routes.get("/:id", getRoom);

//GET ALL
routes.get("/",  getAllRooms);


export default routes;
