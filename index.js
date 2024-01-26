import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import holidaysRoute from "./routes/holidays.js"
import cookieParser from "cookie-parser"

const app = express()
dotenv.config()

const connect = async() => {
	try {
	  await mongoose.connect(process.env.MONGO);
	  console.log("Connected to mongoDB.")
	} catch (error) {
	  throw error
	}
}

mongoose.connection.on("connected",() => {
	console.log("Mongodb Connected !")
})

mongoose.connection.on("disconnected",() => {
	console.log("Mongodb disConnected !")
})

//middlewares
app.use(cookieParser());
app.use(express.json())

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);
app.use("/holidays", holidaysRoute);

app.use((err,req,res, next)=>{
	const errorStatus = err.status || 500
	const errorMessage = err.message || "Something went wrong!"
	return res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack,
	});
});

app.listen(3000, () => {
	connect()
	console.log("Connected to backend!")
})