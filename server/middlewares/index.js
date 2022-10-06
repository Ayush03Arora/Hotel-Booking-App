var { expressjwt: jwt } = require("express-jwt");

export const RequireSignIn =  jwt({ 
    secret: process.env.JWT_SECRET, 
    algorithms: ["HS256"] 
})   
