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
    type: "express",
});

console.log("Account--",account);
user.stripe_account_id = account.id;
user.save();
}

// create login link

let accountLink = await stripe.accountLinks.create()


};