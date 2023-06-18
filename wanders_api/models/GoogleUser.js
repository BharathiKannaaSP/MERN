import mongoose from "mongoose";

// Define the User schema
const GoogleuserSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  email: { type: String },
  name: { type: String },
  accessToken: { type: String },
  refreshToken: { type: String },
});

// Create the User model
export default mongoose.model("GoogleUser", GoogleuserSchema);
