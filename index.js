import "dotenv/config.js";
import express from "express";
import "./db/mongoose.js";
import users from "./routes/users.js";
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5005;

app.use(cors())
app.use(express.json());
app.use("/user", users);

app.get("/", (req, res) => {
    res.send("<h1>Chatverse Backend</h1>");
});

app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);
