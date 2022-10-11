import User from "../models/user";
import Stripe from 'stripe';
import queryString from 'query-string';

const stripe = Stripe(process.env.STRIPE_SECRET);


 
    

export const createConnectAccount = async(req,res) =>{

// find user from db
const user = await User.findById(req.auth._id).exec();
console.log("user ==>",user);





// if user don't have stripe id create now
if(!user.stripe_account_id)
{
const account = await stripe.accounts.create({
    type: "standard",
});

console.log("Account--",account);
user.stripe_account_id = account.id;
user.save();
}


// // create login link

let accountLink = await stripe.accountLinks.create({
account: user.stripe_account_id,
refresh_url: process.env.STRIPE_REDIRECT_URL,
return_url: process.env.STRIPE_REDIRECT_URL,
type : "account_onboarding",
})

// prefill info such as email
accountLink = Object.assign(accountLink,{
    "stripe_user[email]": user.email || undefined,
});

// console.log("Account Link",accountLink);

let link = `${accountLink.url}? ${queryString.stringify(accountLink)}`
console.log("login link==>",link);
res.send(link);
 };


 export const getAccountStatus = async(req,res)=>{
    
    const user = await User.findById(req.auth._id).exec();
    const account = await stripe.accounts.retrieve(user.stripe_account_id);
    // console.log("user account retrieve =>",account);
   
    // updatedelaydays
    

    const updateUser = await User.findByIdAndUpdate(user._id,
        {
           stripe_seller :account,       
        },
        {new:true}
        ).select('-password').exec();
        //console.log(updateUser);

        res.json(updateUser);
 };

 export const getAccountBalance = async(req,res) =>{
    const user = await User.findById(req.auth._id).exec();

    try{
     const balance = await stripe.balance.retrieve(
        {
          stripeAccount : user.stripe_account_id,  
        });
        // console.log("Balance ==>",balance);
        res.json(balance); 
    }
    catch(err)
    {
     console.log(err);
    }
 }

 export const payoutSetting = async(req,res) =>{
try
{
    const user = await User.findById(req.auth._id).exec();

    const loginLink = await stripe.accountLinks.create({
        account: user.stripe_account_id,
        refresh_url: process.env.STRIPE_SETTING_REDIRECT_URL,
        return_url: process.env.STRIPE_SETTING_REDIRECT_URL,
        type: 'account_onboarding',
      });
    //console.log("LOGIN LINK ==>",loginLink);
    res.json(loginLink);
}
catch(err)
{
console.log('Stripe Payout Settings Error',err);
}
}



//