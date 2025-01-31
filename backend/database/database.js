const mongoose = require("mongoose");

// External File
// Functions (connection)
// Make a unique function name
// Export

const connectDatabase = () => {
  try {
    console.log("Connecting to database...");
    console.log(process.env.MONGODB_CLOUD);
    mongoose.connect(process.env.MONGODB_CLOUD).then(() => {
      console.log("Database connected!");
    });
  } catch {
    console.log("Database not connected");
  }
};

module.exports = connectDatabase;
