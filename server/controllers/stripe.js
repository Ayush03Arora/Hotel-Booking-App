import User from "../models/user";

export const createConnectAccount = async(req,res) =>{

const user = await User.findById(req.auth._id).exec();
console.log("user ==>",user);
}