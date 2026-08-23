const {
    registerUserService,
    loginService} =  require("../services/auth.service");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;
const registerUser = async (req,res) => {
    try{
        const {name , email , phone , password , role} = req.body;
        if(!name||!email||!phone||!password||!role){
            return res.status(400).json({
                message:"All fields are required"
            });
        }
        if(!emailRegex.test(email)){
            return res.status(400).json({
                message:"Invalid email format"
            });
        }
        if(!phoneRegex.test(phone)){
            return res.status(400).json({
                message:"Invalid phone number"
            });
        }
        if(password.length<8){
            return res.status(400).json({
                message:"Password must be at least 8 characters"
            });
        }
        if(role !== "rider" && role !== "driver"){
            return res.status(400).json({
                message:"Invalid role"
            });
        }
    
        const user = await registerUserService(
            name,
            email,
            phone,
            password,
            role
        );
        if(user == "User exists"){
            return res.status(409).json({
                message:"User already registered"
            })
        }
        res.status(201).json({
            message:"Registration successful",
            user:user
        });
    }catch(error){
        return res.status(500).json({
            message:"Something went wrong"
        })
    }
};
const loginUser = async (req,res) =>{
    try{
        const {email , password} = req.body;
        const login = await loginService(
            email,
            password
        );
        const {user,token} = login;
        if(login == "User not found"){
            return res.status(404).json({
                message:"User not found"
            });
        }
        if(login == "Invalid Password"){
            return res.status(401).json({
                message:"Invalid Password"
            });
        }
        const {password:_, ...userWithoutPassword} = user;
        res.status(200).json({
            message:"Logged-In successful",
            user:userWithoutPassword,
            token:token
        });
    }catch(error){
        return res.status(500).json({
            message:"Something Went Wrong"
        });
    }
        
};

module.exports = {
    registerUser,
    loginUser
};