import express from "express";
import { mainSearch } from "../controllers/search.js"

const search = express.Router();

search.get('/', mainSearch)

export default search;