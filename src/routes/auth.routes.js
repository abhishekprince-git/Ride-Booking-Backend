const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/auth.controller");
const { authenticationToken,authorizeRole } = require("../middlewares/auth.middleware");

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",authenticationToken,(req,res)=>{
    res.status(200).json({
        message:"You are authenticated",
        user:req.user
    });
});
router.get("/driver-test",
    authenticationToken,
    authorizeRole("driver"),
    (req,res)=>{
        res.status(200).json({
            message:"Driver access granted",
            user:req.user
        });
});
router.get("/rider-test",
    authenticationToken,
    authorizeRole("rider"),
    (req,res)=>{
        res.status(200).json({
            message:"Rider access granted",
            user:req.user
        });
});
router.post(
    "/accept-ride",
    authenticationToken,
    authorizeRole("driver"),
    (req,res)=>{
        res.status(200).json({
            message:"Driver can accept ride",
            user:req.user
        });
    }
);
module.exports = router;