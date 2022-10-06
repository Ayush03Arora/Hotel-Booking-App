import express from 'express';
const { expressjwt } = require("express-jwt");
// controllers
import { createConnectAccount } from '../controllers/stripe';
// middlewares


const router = express.Router();

router.post("/create",expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),createConnectAccount);

module.exports=router;

