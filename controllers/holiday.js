import Holiday from "../models/Holiday.js"

export const createHoliday = async (req,res,next)=>{
	const newHoliday = new Holiday(req.body)

	try{
		const savedHoliday = await newHoliday.save()
		res.status(200).json(savedHoliday)
	}
	catch(err){
		next(err);
	}
}

export const updateHoliday = async (req,res,next)=>{
	try{
		const updatedHoliday = await Holiday.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body},
			{ new: true }
		);
		res.status(200).json(updatedHoliday)
	}
	catch(err){
		next(err);
	}
}

export const deleteHoliday = async (req,res,next)=>{
	try{
		await Holiday.findByIdAndDelete(
			req.params.id
		);
		res.status(200).json("Holiday has been Deleted")
	}
	catch(err){
		next(err);
	}
}

export const getHoliday = async (req,res,next)=>{
	try{
		const holiday = await Holiday.findById(
			req.params.id
		);
		res.status(200).json(holiday)
	}
	catch(err){
		next(err);
	}
}

export const getHolidays = async (req, res, next) => {
  const {min,max,tocity,...others } = req.query;

  try {
  	//const hotels = await Hotel.find(req.query).limit(req.query.limit  | 1 );
  	const holidays = await Holiday.find({
      ...others,
      $or: [
      	{ tocity: { $regex: new RegExp(tocity, 'i') } },
      	{ title: { $regex: new RegExp(tocity, 'i') } },
      ],
      price: { $gt: min | 1, $lt: max || 99999 },
    });
    res.status(200).json(holidays);
  } catch (err) {
    next(err);
  }
};

export const getHolidaysByCity = async (req, res, next) => {
  const { title } = req.query;
  console.log(title)
  try {
    const holidays = await Holiday.find({title:title}).limit(req.query.limit  | 1 );
    res.status(200).json(holidays);
  } catch (err) {
    next(err);
  }
};

export const countByfromCity = async (req, res, next) => {
  
  try {
  	const cities = req.query.cities.split(",");
  	console.log(cities)
    const list = await Promise.all(
      cities.map((city) => {
        return Holiday.countDocuments({ title: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByHolidayType = async (req, res, next) => {
  try {
    const romanticCount = await Holiday.countDocuments({ type: "romantic" });
    const religiousCount = await Holiday.countDocuments({ type: "religious" });
    const familyCount = await Holiday.countDocuments({ type: "family" });
    const soloCount = await Holiday.countDocuments({ type: "solo" });
    
    res.status(200).json([
      { type: "romantic", count: romanticCount },
      { type: "religious", count: religiousCount },
      { type: "family", count: familyCount },
      { type: "solo", count: soloCount },
    ]);
  } catch (err) {
    next(err);
  }
};