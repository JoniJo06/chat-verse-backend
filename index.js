import "dotenv/config.js";
import express from "express";
import "./db/mongoose.js";
import users from "./routes/users.js";
import chats from "./routes/chats.js";
import singleMessages from "./routes/singleMessages.js";
import cors from 'cors';
import * as http from 'http';

const app = express();
const port = process.env.PORT || 5005;
const socketport = process.env.PORT || 5006;
const server = http.createServer(app);


app.use(cors())
app.use(express.json());
app.use("/users", users);
app.use('/chats', chats);
app.use('/singlemessages', singleMessages);


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (message) =>     {
      console.log(message);
      io.emit('message', `${socket.id.substr(0,2)} said ${message}` );   
  });
});


//API
app.get("/", (req, res) => {
    res.send("<h1>Chatverse Backend</h1>");
});

app.listen(port, () =>
  console.log(`Server1 listening on port ${port}`)
);



//Websocket
app.get("/socket", (req, res) => {
  res.send("<h1>Chatverse Backend Socket</h1>");
});

server.listen(socketport, () => {
  console.log(`Websocket listening on port ${socketport}`)
});
