import express from "express";
import {
	createHoliday,
	updateHoliday,
	deleteHoliday,
	getHoliday,
	getHolidays,
	countByfromCity,
	countByHolidayType,
	getHolidaysByCity
} from "../controllers/holiday.js";

import Holiday from "../models/Holiday.js"; 
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHoliday);

//UPDATE
router.put("/:id",verifyAdmin, updateHoliday);

//DELETE
router.delete("/:id", verifyAdmin, deleteHoliday);

//GET
router.get("/find/:id", getHoliday);

//GET ALL
router.get("/",getHolidays);

router.get("/countByfromCity", countByfromCity);
router.get("/countByHolidayType", countByHolidayType);
router.get("/holidaysByCity", getHolidaysByCity);

export default router