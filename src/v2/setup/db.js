const mongoose = require("mongoose");
const { server } = require("../config/system");

module.exports = () => {
  mongoose.set("strictQuery", false);

  mongoose
    .connect(server.DATABASE_URI)
    .then((value) => {
      console.log(`Connected to MongoDB Server: ${server.DATABASE_URI}`);
    })
    .catch((err) => {
      console.log(`Failed to connect to MongoDB: ${err.message}`);
    });
};
