import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'

const createToken = (_id) => {
    return jwt.sign({ _id },process.env.JWT_SECRET,{expiresIn: '3d'})
}

const signup = async (req,res) => {
    
    const { email, password } = req.body;
    try {

        const user = await User.signup(email,password);
        const token = await createToken(user._id)
        res.status(200).json({email,token})

    } catch (error) {
        res.status(500).json({error: error.message})
    }

}

const login = async (req,res) => {
    
    const { email, password } = req.body;

    try {
        
        const user = await User.login(email,password);
        const token = await createToken(user._id)
        res.status(200).json({email,token})

    } catch (error) {
        res.status(500).json({error: error.message})
    }

}

export { signup, login}