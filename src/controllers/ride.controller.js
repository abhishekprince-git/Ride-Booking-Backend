const {createRideService,
       acceptRideServices 
    } = require("../services/ride.services");

const createRide = async(req,res) =>{
    try{
        const {pickup_lat,pickup_lng,destination_lat,destination_lng} =req.body;
        const userId = req.user.id;
        const ride = await createRideService(
            userId,
            pickup_lat,
            pickup_lng,
            destination_lat,
            destination_lng
        );
        return res.status(201).json({
            message:"Ride Created Successfully",
            ride:ride
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Something Went Wrong"
        });
    }
};

const acceptRides = async (req,res)=>{
    try{
        const{rideId} = req.params.rideId;
        const{driverId} = req.user.id;
        const ride = await acceptRideServices(
            rideId,
            driverId
        );
        if(!ride){
            return res.status(404).json({
                message:"Cannot find ride"
            });
        }
        
    }catch(error){

    }
}
module.exports={
    createRide
};