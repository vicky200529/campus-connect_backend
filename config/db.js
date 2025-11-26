const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rajdeep:rajdeep123@typo.p13gqn4.mongodb.net/CampusConnect",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
