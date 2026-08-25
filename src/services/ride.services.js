const pool = require("../config/db");

const createRideService = async (
    passengerId,
    pickupLat,
    pickupLng,
    destinationLat,
    destinationLng
) => {
    const rideDetails = await pool.query(
        `INSERT INTO rides(
            passenger_id,
            pickup_lat,
            pickup_lng,
            destination_lat,
            destination_lng,
            status
        )
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING id, passenger_id, pickup_lat, pickup_lng,
                  destination_lat, destination_lng, status`,
        [
            passengerId,
            pickupLat,
            pickupLng,
            destinationLat,
            destinationLng,
            "REQUESTED"
        ]
    );

    return rideDetails.rows[0];
};

const acceptRideServices = async (
    rideId,
    driverId)=>{
    const findRide = await pool.query(
        `SELECT id, passenger_id, driver_id, status
        FROM rides
        WHERE id = $1`,
        [rideId]
    );
    if(findRide.rows.length === 0){
        return "Ride not found"
    };
    if(findRide.rows[0].status !== "REQUESTED"){
        return "Ride cannot be accepted"
    };
    const updateRide = await pool.query(
    `UPDATE rides
     SET driver_id = $1,
         status = 'ACCEPTED',
         accepted_at = NOW()
     WHERE id = $2
     RETURNING id, passenger_id, driver_id, status, accepted_at`,
    [driverId, rideId]
);
}
module.exports={
    createRideService,
    acceptRideServices
};