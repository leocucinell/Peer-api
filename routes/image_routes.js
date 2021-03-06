/* SECTION: Imports */
const express = require("express");
const ctrl = require("../controllers");
const router = express.Router();

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' }) //uploads is the destination of the image

/* SECTION: Routes: BaseURL = /image */
//make sure to require the multer middleware to find an image with name image
router.post("/new", upload.single('image'), ctrl.image.uploadImage);
router.get("/get", ctrl.image.getImage);
router.put("/update", upload.single('image'), ctrl.image.updateImage);
router.delete("/delete", ctrl.image.deleteImage);

/* SECTION: Exports */
module.exports = router