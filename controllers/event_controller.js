/* SECTION: Modules */
const { Events } = require("../models");

/* SECTION: Middleware */

/* SECTION: Route Functions */
//create an event
const createEvent = async (req, res, next) => {
    try {
        const createdEvent = await Events.create(req.body);
        return res.status(200).json({
            msg: "successfully created event",
            createdEvent
        });
    } catch(err) {
        res.status(400).json({
            msg: "Unable to create event"
        })
    }
}

//get an event
const getEvent = async (req, res, next) => {
    try{
        const foundEvent = await Events.findById(req.params.id);
        if(!foundEvent){
            return res.status(400).json({
                msg: "Unable to find event in db"
            });
        }
        return res.status(200).json({
            msg: "found event",
            foundEvent
        });
    } catch(err) {
        return res.status(400).json({
            msg: "Unable to find event"
        });
    }
}

//update an event
const updateEvent = async (req, res, next) => {
    try{
        const updatedEvent = await Events.findByIdAndUpdate(
            req.params.id, 
            {
                title: req.body.title,
                descriptions: req.body.descriptions,
                date: req.body.date,
                time: req.body.time,
                address: req.body.address
            },
            {
                new: true
            }
        );
        if(!updatedEvent){
            return res.status(400).json({
                msg: "Unable to update event"
            });
        }

        return res.status(200).json({
            msg: "successfully updated event",
            updatedEvent
        });

    } catch(err) {
        return res.status(400).json({
            msg: "Unable to update event"
        });
    }
}

//delete an event
const deleteEvent = async (req, res, next) => {
    try {
        const deletedEvent = await Events.findByIdAndDelete(req.params.id);
        res.status(200).json({
            msg: "successfully deleted event",
            deletedEvent
        })
    } catch(err) {
        return res.status(400).json({
            msg: "Unable to delete event"
        });
    }
}

//TODO: get events within a certain diameter

//Push a user into a guest list of an event
const addGuest = async (req, res, next) => {
    //get the event and push a new item into the guest list.
    try{
        //check if the event exists first
        const eventExists = await Events.exists(req.params.id);
        if(eventExists){
            const eventUserWillGoTo = await Events.findByIdAndUpdate(req.params.id, {
                $push:{
                    "guests": {
                        username: req.body.username,
                        userId: req.body.userId
                    }
                }
            });
    
            return res.status(200).json({
                msg: "successfully added user to event",
                eventUserWillGoTo
            });
        }
        return res.status(400).json({
            msg: "Event does not exist, user cannot attend non existant event"
        });

    } catch(err) {
        return res.status(400).json({
            msg: "Unable to push user to event guest list"
        });
    }
}

module.exports = {
    createEvent,
    getEvent,
    updateEvent,
    deleteEvent,
    addGuest,
}