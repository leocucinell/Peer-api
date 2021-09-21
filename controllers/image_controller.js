/* SECTION: Modules */
const { Image } = require("../models");
const fs = require("fs");
const AWS = require("aws-sdk");

/* SECTION: Middleware */

/* SECTION: Routes */
//upload an image
const uploadImage = async (req, res, next) => {
    //req.file contains the infomation about the image: Use this to get the file name & store in mongoDB
    //req.body contains the rest of the information about the post req
    console.log("~~~~~~~~~~~~~~~~");
    console.log(req.file);
    console.log(req.body);
    console.log("~~~~~~~~~~~~~~~~");
    // try{
        

    // } catch(err){
    //     return res.status(400).json({
    //         msg: "unable to upoad image"
    //     })
    // }

}
//get an image
//update an image
//delete an image

/* SECTION: Export */
module.exports = {
    uploadImage
}