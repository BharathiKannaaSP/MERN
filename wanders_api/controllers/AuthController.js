import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(200).json(newUser);
    res.status(200).send("User has been created!");
  } catch (err) {
    next(err);
  }
};
let refreshTokenArr=[]
export const refreshTokens =(req,res)=>{
  const refreshToken= req.body.token
  if(!refreshToken) return res.status(401).json("You are not authenticated!")
  if(!refreshTokenArr.includes(refreshToken)){
    return res.status(403).json("Refresh token is not valid!")
  } 
  jwt.verify(refreshToken,process.env.JWT_REFERSH_TOKEN,(err,user)=>{
    err && console.log(err)

    refreshTokenArr=refreshTokenArr.filter(token=>token !==refreshToken)
    const newAccessToken = generateAccessToken(user)
    const newRefreshAccessToken = generateRefreshToken(user)

    refreshTokenArr.push(newRefreshAccessToken)
    res.status(200).json({
      accessToken:newAccessToken,
      refreshToken:newRefreshAccessToken
    })
  })
}
const generateAccessToken = (user)=>{
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT,
    { expiresIn: "60m" } // Set expiration time for 5 seconds
  );
}
const generateRefreshToken = (user)=>{
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_REFERSH_TOKEN,
  );
}
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not Found"));
    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword)
      return next(createError(400, "Wrong username or password"));
    // Generate access token
    if(user){
     const accessToken= generateAccessToken(user)
     const refreshToken= generateRefreshToken(user)
     refreshTokenArr.push(refreshToken)
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
    .cookie("access_token", accessToken, {
      httpOnly: true,
    })
    .cookie("refresh_token", refreshToken, {
      httpOnly: true,
    })
    .status(200)
      .json({details:{ ...otherDetails },isAdmin,accessToken,refreshToken});
    }else{
      res.status(400).json("Wrong Credentials!")
    }
    // // Generate refresh token
    // const refreshToken = jwt.sign(
    //   { id: user._id, isAdmin: user.isAdmin },
    //   process.env.JWT_REFERSH_TOKEN
    // );
   
  } catch (err) {
    next(err);
  }
};




export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updateUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been Deleted!");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const User = await User.findById(req.params.id);
    res.status(200).json(User);
  } catch (err) {
    next(err);
  }
};

export const getAllUser = async (req, res, next) => {
  // const failed = true
  // if(failed) return next(createError(401,"You are not Authenticated!"))
  try {
    const allUser = await User.find();
    res.status(200).json(allUser);
  } catch (err) {
    next(err);
  }
};
export const logout = async (req, res, next) => {
  // const failed = true
  // if(failed) return next(createError(401,"You are not Authenticated!"))
  try {
    const refershToken=req.body.token
    refreshTokenArr=refreshTokenArr.filter(token=>token!==refershToken)
    res.status(200).json("Logged Out Successfully!")
  } catch (err) {
    next(err);
  }
};