const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "please add an event title"]
    },
    description: {
        type: String,
        required: [true, "please add an event description"]
    },
    admin: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: "User"
    },
    guests: [{
        username: String,
        // userId: mongoose.Types.ObjectId
        userId: String,
        required: [false]
    }],
    date: {
        type: String,
        required: [true, "Please enter a date for the event"]
    },
    time: {
        type: String,
        required: [true, "Please enter a time for the event"]
    },
    // latitude: {
    //     type: Number,
    //     required: [true, "please add the latitude for the event"]
    // },
    // longitude: {
    //     type: Number,
    //     required: [true, "please add the longitude for the event"]
    // },
    address: {
        type: String,
        required: [true, "please add an address for the event"]
    },
    photo: {
        // type: mongoose.Types.ObjectId,
        type: String,
        ref: "Image",
        required: [false]
    },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;