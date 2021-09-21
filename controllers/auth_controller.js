/* SECTION: Modules */
const bcrypt = require("bcrypt");
const { Users } = require("../models");

/* SECTION: Middleware */

/* SECTION: Route Functions */

//Create a new User: POST
const createUser = async (req, res, next) => {
    try {
        //user exists ? notify user to try again : continue with creating the user
        const userExists = await Users.exists({$or:[{email: req.body.email}, {username: req.body.username}]});
        if(userExists){
            return res.json({
                msg: "User already exists",
            });
        }

        //User does not exist yet: 
        //salt and hash their password & replace it in the req.body
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;

        const createdUser = await Users.create(req.body, (err, savedUser) => {
            if(err){
                return res.status(400).json({
                    msg: "Error saving user, check all form fields"
                })
            }
        });

        res.status(200).json({
            msg: "successfully created user",
            savedUser: createdUser
        })

    } catch(err) {
        res.status(400).json({
            msg: "error creating user"
        });
    }
}

//Get an existing user: GET
const getUser = async (req, res, next) => {
    try{
        //try to get the user from mongodb
        const foundUser = await Users.findById(req.params.id);
        if(!foundUser){
            res.status(400).json({
                msg: "User does not exist"
            });
        }

        res.status(200).json({
            msg: "found user",
            user: foundUser
        });

    } catch(err) {
        res.status(400).json({
            msg: "Error getting specified user"
        })
    }
}

//Update a specific user: PUT
const updateUser = async (req, res, next) => {
    try{
        const updatedUser = await Users.findByIdAndUpdate(
            req.params.id,
            {
                username: req.body.username,
                email: req.body.email,
                address: req.body.address
            },
            {
                new: true
            }
        );
        return res.status(200).json({
            msg: "successfully updated user",
            updatedUser
        });
    } catch(err) {
        res.status(400).json({
            msg: "error updating user"
        })
    }
}

//add a friend to users friends list
const addFriend = async (req, res, next) => {
    try{
        const updatedUser = await Users.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    "friends": {
                        username: req.body.username,
                        userId: req.body.userId
                    }
                }
            }
        );
        return res.status(200).json({
            msg: "added user to friends list",
        });
    } catch(err) {
        res.status(400).json({
            msg: "error adding friend to user"
        })
    }
}

//Delete a specific user: DELETE
const deleteUser = async (req, res, next) => {
    try{
        const deletedUser = await Users.findByIdAndDelete(req.params.id);
        res.status(200).json({
            msg: "successfully deleted user",
            deletedUser
        })
    } catch(err) {
        res.status(400).json({
            msg: "error deleting user"
        })
    }
}

/* SECTION: Exports */
module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    addFriend
}