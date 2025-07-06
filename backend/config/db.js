const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      ssl: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Error connecting to Mongoose", err);
    process.exit(1);
  }
};

module.exports = connectDB;
