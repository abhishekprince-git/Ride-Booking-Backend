const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const registerUserService = async(name, email , phone , password,role) =>{
    const existingUser = await pool.query(
        `SELECT id FROM users
        WHERE email = $1 OR phone = $2`,
        [email, phone]
    );
    if(existingUser.rows.length>0){
        return "User exists";
    }
    const hashedPassword = await bcrypt.hash(password,10);
    
    const result = await pool.query(
        `INSERT INTO users (name , email , phone , password,role)
        VALUES($1, $2 , $3, $4, $5)
        RETURNING id, name , email, phone , role`,
        [name , email , phone , hashedPassword, role]
    );
    return result.rows[0];
};

const loginService = async(email,password) =>{
    const findUser = await pool.query(
        `SELECT id,name,email,phone,password,role
        FROM users
        WHERE email = $1`,
        [email]
    );
    if(findUser.rows.length === 0){
        return "User not found";
    }
    const user = findUser.rows[0];
    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );
    if(!isPasswordCorrect){
        return "Invalid Password";
    }
    const token = jwt.sign(
        {
            id:user.id,
            role:user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1h"
        }
    );
    return {
        user:user,
        token:token
    };
};
module.exports = {
    registerUserService,
    loginService
};