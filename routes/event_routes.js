/* SECTION: Imports */
const express = require("express");
const ctrl = require("../controllers");
const router = express.Router();

/* SECTION: Routes: BaseURL = /event */
router.post("/new", ctrl.event.createEvent);
router.get("/:id", ctrl.event.getEvent);
router.put("/update/:id", ctrl.event.updateEvent);
router.delete("/delete/:id", ctrl.event.deleteEvent);
router.put("/update/:id/guest", ctrl.event.addGuest);

/* SECTION: Exports */
module.exports = router