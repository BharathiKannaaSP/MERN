import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  login,
  logout,
  refreshTokens,
  register,
  updateUser,
} from "../controllers/AuthController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import passport from "passport";

const routes = express.Router();

//CREATE USER
routes.post("/register", register);

//LOGIN
routes.post("/login", login);
//checkAuth
// routes.get("/checkAuth", verifyToken, (req, res, next) => {
//   res.send("Hi, You are logged in!");
// });

// routes.get("/checkAuth/:id", verifyUser, (req, res, next) => {
//   res.send("Hi, You are logged in and del or update!");
// });

// routes.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Hi Admin, You are logged in, You can del or update all Account!");
//   });

//UPDATE

routes.put("/:id", verifyUser, updateUser);

//DELETE

routes.delete("/:id", verifyUser, deleteUser);

//GET

routes.get("/:id", verifyUser, getUser);

//GET ALL
routes.get("/", verifyAdmin, getAllUser);

//refershToken
routes.post("/refresh", refreshTokens);

//logout
routes.post("/logout", logout);

routes.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

routes.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

routes.get("/google", passport.authenticate("google", { scope: ["profile"] }));

routes.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    // Redirect to the desired page after successful authentication
    res.redirect("http://localhost:3000");
  },
);

// routes.get("/googleLogout/:id", (req, res) => {
// 	req.logout();
// 	res.redirect(process.env.CLIENT_URL);
// });
routes.get("/googleLogout/:id", (req, res, next) => {
	req.logout((err) => {
	  if (err) {
		// Handle error if necessary
		console.error(err);
		return next(err);
	  }
	  res.redirect("http://localhost:3000");
	});
  });
export default routes;
