const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Users must have a username"]
    },
    password: {
        type: String,
        required: [true, "Users must have a password"]
    },
    email: {
        type: String,
        required: [true, "Users must have an email"]
    },
    address: {
        type: String,
        required: [true, "Users must register an address"]
    },
    friends: [{
        username: String,
        // userId: mongoose.Types.ObjectId
        userId: String,
        required: [false]
    }],
    avatar: {
        type: mongoose.Types.ObjectId,
        ref: "Image",
        required: [false]
    },
    // latitude: {
    //     type: Number,
    //     required: [true, "please add the latitude for the event"]
    // },
    // longitude: {
    //     type: Number,
    //     required: [true, "please add the longitude for the event"]
    // },
});

const User = mongoose.model("User", userSchema);

module.exports = User;