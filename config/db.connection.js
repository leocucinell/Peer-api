const mongoose = require("mongoose");

const connectionString = 'mongodb://127.0.0.1/peer_local_api'
mongoose.connect(connectionString, {
    useNewUrlParser: true,
     useUnifiedTopology: true
});

mongoose.connection.on("error", (err) => {
    console.log(`Error connecting to mongoDB: ${err}`);
});

mongoose.connection.on("connected", () => {
    console.log("connected to mongodb...");
});

mongoose.connection.on("disconnected", () => {
    console.log("disconnected from mongodb...");
});