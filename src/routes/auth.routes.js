const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/auth.controller");
const { authenticationToken } = require("../middlewares/auth.middleware");

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",authenticationToken,(req,res)=>{
    res.status(200).json({
        message:"You are authenticated",
        user:req.user
    });
});
module.exports = router;