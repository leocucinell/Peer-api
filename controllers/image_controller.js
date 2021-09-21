/* SECTION: Modules */
const { Image } = require("../models");
const s3 = require("../config/s3");


/* SECTION: Middleware */

/* SECTION: Routes */
//upload an image
const uploadImage = async (req, res, next) => {
    //req.file contains the infomation about the image: Use this to get the file name & store in mongoDB
    //req.body contains the rest of the information about the post req
    console.log("inside upload Image function")
    try{
        const fileToUpload = await s3.uploadToS3(req.file);
        console.log("~~~~~~~~~~~~~~~~");
        console.log(req.file);
        console.log(fileToUpload);
        console.log("~~~~~~~~~~~~~~~~");

        return res.status(200).json({
            msg: "successfully uploaded file to s3",
            file: req.file
        });

    } catch(err) {
        console.log(err);
        return res.status(400).json({
            msg: "unable to upoad image",
            error: err
        });
    }

}
//get an image
//update an image
//delete an image

/* SECTION: Export */
module.exports = {
    uploadImage
}