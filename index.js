import "dotenv/config.js";
import express from "express";
import "./db/mongoose.js";
import users from "./routes/users.js";
import chats from "./routes/chats.js";
import singleMessages from "./routes/singleMessages.js";
import cors from 'cors';

// import * as http from 'http';

const app = express();
const port = process.env.PORT || 5005;
// const socketport = process.env.PORT || 5006;
// const server = http.createServer(app);


app.use(cors())
app.use(express.json());
app.use("/users", users);
app.use('/chats', chats);
app.use('/singlemessages', singleMessages);


ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function message(data) {
  console.log('received: %s', data);
});


//API
app.get("/", (req, res) => {
    res.send("<h1>Chatverse Backend</h1>");
});

app.listen(port, () =>
  console.log(`Server1 listening on port ${port}`)
);
