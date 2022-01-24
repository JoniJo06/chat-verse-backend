import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5001;
app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
    res.send("hi");
})
app.listen(port => console.log("listen on port " + port));