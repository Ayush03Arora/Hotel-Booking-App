import User from "../models/user";
import jwt from 'jsonwebtoken';




export const register = async(req,res)=>{
const {name,email,password} = req.body;

 //validations
 let userExist = await User.findOne({email}).exec();
 if(userExist){
     return res.send({message:"Email already Registered"});
  } 
  
      const user = new User({
          name, // shorthand for name: name(as both lhs and rhs are same)
          email,
          password
       })  
         user.save( err => {
          if(err)
          {
          console.log("create user failed",err)
          return res.send({message:"try again"});
        }
          else
          {
          return res.send({message: "Successfully Registered,Please Login now"})
          
        }
        })
};

export const login = async(req,res) =>{
 const {email,password} = req.body; 
 try{
   User.findOne({email:email},(err,user)=>{
    if(user){
    user.comparePassword(password,(err,match)=>{
      if(!match || err) 
      return res.send( {message:"Wrong Password"}); 
      // generate token and then send as response to client
      
      let token = jwt.sign({_id: user._id},process.env.JWT_SECRET,{
        expiresIn: '7d'
      });
      res.json({
        token,
        user:
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        stripe_account_id:user.stripe_account_id,
        stripe_seller:user.stripe_seller,
        stripeSession:user.stripeSession ,
      }
    });
    });
       
    } 
    else{
     res.send({message:"User not registered"})
    }
})
}
 catch(err)
 {
  console.log('Login Error',err);
  res.send("Sign in failed");
 }
}
