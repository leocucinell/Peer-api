const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: [true, "Need a confirmed ARN for storage"]
    },
    purpose: {
        type: String,
        required: [true, "each image needs a purpose in the app"]
    },
    location: {
        type: String,
        required: [true, "you must provide an image loaction"]
    }
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;