const userModel = require("../model/usermodel")

const getUserData = async(req, res) => {
    try{
        const {userId} = req.body;

        const user = await userModel.findById(userId);

        if(!user){
            return res.json({success:false, message:"User not found"});
        }

        res.json({success: true, userData:{
            name : user.name,
            isAccountVerified: user.isAccountVerified 
        }
    })
    } 
    catch(error){
        return res.json({success:false, message: error.message})
    }
} 

module.exports = getUserData;