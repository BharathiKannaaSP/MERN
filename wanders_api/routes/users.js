// import express from "express";
// import {
//   deleteUser,
//   getAllUser,
//   getUser,
//   updateUser,
// } from "../controllers/UserController.js";
// import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

// const routes = express.Router();

// //checkAuth
// // routes.get("/checkAuth", verifyToken, (req, res, next) => {
// //   res.send("Hi, You are logged in!");
// // });

// // routes.get("/checkAuth/:id", verifyUser, (req, res, next) => {
// //   res.send("Hi, You are logged in and del or update!");
// // });

// // routes.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
// //     res.send("Hi Admin, You are logged in, You can del or update all Account!");
// //   });
// //UPDATE

// routes.put("/:id", verifyUser, updateUser);

// //DELETE

// routes.delete("/:id", verifyUser, deleteUser);

// //GET

// routes.get("/:id", verifyUser, getUser);

// //GET ALL
// routes.get("/", verifyAdmin, getAllUser);

// export default routes;
