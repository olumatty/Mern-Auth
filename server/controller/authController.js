const bcrypt = require('bcrypt');
import userModel from '../model/usermodel';

export const register = async (req,res) => {

    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.json({success:false, message:'Missing Details'})
    }

    try{
        const existingUser = await userModel.findOne({email})

        if (existingUser){
            return res.json({success: false, mesage: "user already exist"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

    }
    catch (error) {
        res.json({success:false, message:error.message})
    }
}