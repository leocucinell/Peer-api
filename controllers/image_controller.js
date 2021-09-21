/* SECTION: Modules */
const { Image } = require("../models");
const s3 = require("../config/s3");


/* SECTION: Middleware */

/* SECTION: Routes */
//upload an image
const uploadImage = async (req, res, next) => {
    //req.file contains the infomation about the image: Use this to get the file name & store in mongoDB
    //req.body contains the rest of the information about the post req
    try{
        const fileToUpload = await s3.uploadToS3(req.file);

        //upload the file path information to mongodb
        const imageObj = {
            filename: fileToUpload.Key,
            purpose: req.body.purpose,
            location: fileToUpload.Location
        }
        const createdImage = await Image.create(imageObj);

        return res.status(200).json({
            msg: "successfully uploaded file to s3",
            file: createdImage
        });

    } catch(err) {
        return res.status(400).json({
            msg: "unable to upoad image",
            error: err
        });
    }
}

//get an image
const getImage = async (req, res, next) => {
    try{
        //retrieve the imageObj from the database
        const imageObj = await Image.findById(req.body.imageObj);

        //return the image object
        return res.status(200).json({
            msg: "successfully retrieved image",
            imageObj
        });

    } catch(err) {
        return res.status(400).json({
            msg: "unable to retrieve image",
            error: err
        });
    }
}
//update an image
//delete an image

/* SECTION: Export */
module.exports = {
    uploadImage,
    getImage,
}