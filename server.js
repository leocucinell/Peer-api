/* SECTION: External modules */
const express = require("express");
const cors = require("cors");

/* SECTION: Internal modules */
const routes = require("./routes");

/* SECTION: Instanced Modules */
const app = express();

/* SECTION: Server configuration */
require('dotenv').config();

/* SECTION: Middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

/* SECTION: Routes */
app.use("/auth", routes.auth);
app.use("/event", routes.event);
app.use("/image", routes.image);

/* SECTION: Server bind */
app.listen(4000, () => {
    console.log(`App listening on port 4k`);
});