import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Datenbank erfolgreich verbunden");
} catch (err) {
  console.log(err);
}

