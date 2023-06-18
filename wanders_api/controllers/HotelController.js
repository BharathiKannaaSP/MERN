import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updateHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been Deleted!");
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
// IMPORTANT LIMIT WILL WORK WITHIN THE parseInt()
export const getAllHotel = async (req, res, next) => {
  // const failed = true
  // if(failed) return next(createError(401,"You are not Authenticated!"))
  try {
    const { featured, limit, min, max, ...others } = req.query;
    // const query = featured ? { featured: true } : {};
    const allhotel = await Hotel.find({
      ...others,
      cheapestPrice: {
        $gt: min || 1,
        $lt: max || 999,
      },
    }).limit(parseInt(limit));

    res.status(200).json(allhotel);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const cityList = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      }),
    );
    res.status(200).json(cityList);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
    const independentHouseCount = await Hotel.countDocuments({
      type: "independentHouse",
    });
    const cabinsCount = await Hotel.countDocuments({ type: "cabins" });
    const resortsCount = await Hotel.countDocuments({ type: "resorts" });
    const apartmentsCount = await Hotel.countDocuments({ type: "apartments" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "independentHouse", count: independentHouseCount },
      { type: "cabins", count: cabinsCount },
      { type: "resorts", count: resortsCount },
      { type: "apartments", count: apartmentsCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      }),
    );
    res.status(200).json(list)
  } catch(err) {
    next(err)
  }
};
