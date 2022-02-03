import User from "../models/User.js";

export const mainSearch = async (req,res) => {
  try{

  const {search, type} = req.query
  const regex = new RegExp(String.raw`(.*${search}.*\w)+`)
    if(type === 'user'){
    const users = await User.find({username: {$regex: regex, $options: 'gim'}})
    res.send(users)
    }
      console.log(search)
// console.log(users)
  } catch (err){
    res.status(500).json(err.message)
  }
}
