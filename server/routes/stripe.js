import express from 'express';
const { expressjwt } = require("express-jwt");
// controllers
import { createConnectAccount,getAccountBalance,getAccountStatus,payoutSetting } from '../controllers/stripe';



const router = express.Router();

router.post("/create",expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),createConnectAccount);
router.post("/get-account-status",expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),getAccountStatus);
router.post("/get-account-balance",expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),getAccountBalance);
router.post('/payout-setting',expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),payoutSetting);
module.exports=router;

