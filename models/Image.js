const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    imageURL: {
        type: String,
        required: [true, "Need a confirmed ARN for storage"]
    },
    parentObject: {
        type: mongoose.Types.ObjectId,
        required: [true, "each image needs a purpose in the app"]
    }
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;