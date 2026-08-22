const registerUser = (req,res) => {
    res.status(200).json({
        message:"Registration successful"
    });
};

module.exports = {registerUser};