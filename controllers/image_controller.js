/* SECTION: Modules */
const { Image } = require("../models");
const s3 = require("../config/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

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

        //delete image file from server:
        await unlinkFile(req.file.path);

        //return json
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
const updateImage = async (req, res, next) => {

}

//delete an image
const deleteImage = async (req, res, next) => {
    try{
        //retrieve the imageObj from the database
        const imageObj = await Image.findByIdAndDelete(req.body.imageObj);

        const returned = await s3.deleteFileFromS3(imageObj.filename);

        //return the image object
        return res.status(200).json({
            msg: "successfully deleted image",
            imageObj,
            s3Info: returned
        });

    } catch(err) {
        return res.status(400).json({
            msg: "unable to delete image",
            error: err
        });
    }
}

/* SECTION: Export */
module.exports = {
    uploadImage,
    getImage,
    updateImage,
    deleteImage
}