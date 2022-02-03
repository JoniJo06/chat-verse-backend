import User from "../models/User.js";

export const mainSearch = async (req,res) => {
  try{

  const {search, type} = req.query
  const regexAll = new RegExp(String.raw`(.*${search}.*\w)+`)
    if(type === 'user'){
    const regexSingle = new RegExp(String.raw`${search}\b`)

      const users = await User.find({username: {$regex: regexAll, $options: 'gim'}, public: true, active:true}, 'username profile_pic')
      try{
        const user = await User.findOne({username: {$regex: regexSingle, $options: 'gi'}, public: true, active: true}, 'username profile_pic')
        res.status(200).send({user:user,users: users})
      }catch{
      res.status(200).send()
      }
    }
  } catch (err){
    res.status(500).json(err.message)
  }
}
