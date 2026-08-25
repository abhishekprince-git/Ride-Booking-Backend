const jwt = require("jsonwebtoken");

const authenticationToken = (req , res, next) =>{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({
            message:"Token not found"
        });
    }
    try{
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user = decoded;

        next();
    }catch(error){
        return res.status(401).json({
            message:"Invalid or expired token"
        });
    }
}
function authorizeRole(requiredRole){
    return function(req,res,next){
        const role = req.user.role;
        if(role !== requiredRole){
            return res.status(403).json({
                message:"Insufficient Permission",
            });
        }
        next();

    }
    
}
module.exports={
    authenticationToken,
    authorizeRole
};