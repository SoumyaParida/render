import mongoose from "mongoose";
const {Schema} = mongoose;

const HolidaySchema = new mongoose.Schema({
	name:{
		type: String,
		required: true,
	},
	desc:{
		type: String,
		required: true,
	},
	type:{
		type: String,
		required: true,
	},
	duration:{
		type: String,
		required: true,
	},
	fromcity:{
		type: String,
		required: true,
	},
	tocity:{
		type: [String],
		required: true,
	},
	price:{
		type: String,
		required: true,
	},
	link:{
		type: String,
		required: true,
	},
	photos:{
		type: [String],
	},
	featured:{
		type: Boolean,
	},
	title:{
		type: String,
		required: true,
	},
	subtitle:{
		type: String,
		required: true,
	},
	packageProvidedBy:{
		type: String,
		required: true,
	}
})

export default mongoose.model("Holiday", HolidaySchema)