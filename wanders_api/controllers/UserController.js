// import User from '../models/User.js'



// // export const updateUser = async (req, res, next) => {
// //   try {
// //     const updateUser = await User.findByIdAndUpdate(
// //       req.params.id,
// //       { $set: req.body },
// //       { new: true },
// //     );
// //     res.status(200).json(updateUser);
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // export const deleteUser = async (req, res, next) => {
// //   try {
// //     await User.findByIdAndDelete(req.params.id);
// //     res.status(200).json("User has been Deleted!");
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // export const getUser = async (req, res, next) => {
// //   try {
// //     const User = await User.findById(req.params.id);
// //     res.status(200).json(User);
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // export const getAllUser = async (req, res, next) => {
// //   // const failed = true
// //   // if(failed) return next(createError(401,"You are not Authenticated!"))
// //   try {
// //     const allUser = await User.find();
// //     res.status(200).json(allUser);
// //   } catch (err) {
// //     next(err);
// //   }
// // };
