const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Correct usage of mongoose.connect with await
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000, // Increase the timeout to 30 seconds
    });

    // Log connection success
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log connection error
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process if there's an error
  }
};

module.exports = connectDB;

