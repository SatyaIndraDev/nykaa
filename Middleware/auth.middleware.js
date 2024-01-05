const jwt = require("jsonwebtoken");
const { blackList } = require("../blacklist");

const auth = (req,res,next) => {
    const token = req.headers.authorization.split(" ")[1];
    if(token){
        if(blackList.includes(token)){
            res.status(400).json({msg: "Token expired"});
        }else{
            const decoded = jwt.decode(token, "masai");
            if(decoded){
                next();
            }else{
                res.status(400).json({msg:"Not Authorized"});
            }
        }
    }else{
        res.status(400).json({msg: "Please Login"});
    }
}



module.exports = {
    auth
}