/* SECTION: Imports */
const express = require("express");
const ctrl = require("../controllers");
const router = express.Router();

/* SECTION: Routes: BaseURL = /auth */
router.post("/new", ctrl.auth.createUser);
router.get("/:id", ctrl.auth.getUser);
router.put("/edit/:id", ctrl.auth.updateUser);
router.put("/edit/:id/friend", ctrl.auth.addFriend);
router.delete("/delete/:id", ctrl.auth.deleteUser);

/* SECTION: Exports */
module.exports = router;