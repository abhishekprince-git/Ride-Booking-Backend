const express = require("express");
const router = express.Router();

const { createRide } = require("../controllers/ride.controller");

const{
    authenticationToken,
    authorizeRole
}= require("../middlewares/auth.middleware");

router.post(
    "/",
    authenticationToken,
    authorizeRole("rider"),
    createRide
);
module.exports = router;