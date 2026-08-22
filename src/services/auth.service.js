const pool = require("../config/db");
const registerUserService = async(name, email , phone , password) =>{
    const result = await pool.query(
        `INSERT INTO users (name , email , phone , password)
        VALUES($1, $2 , $3, $4)
        RETURNING id, name , email, phone , role`,
        [name , email , phone , password]
    );
};
module.exports = {
    registerUserService
};