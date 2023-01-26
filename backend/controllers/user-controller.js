import User from "../model/User.js"
import bcrypt from 'bcryptjs'
export const getAllUser = async(req,res,next)=>{
    let users;
    try {
        users = await User.find();

        
    } catch (error) {
        console.log(error)
    }
    if(!users){
        return res.status(404).json({msg:"no user found"})
    }
    return res.status(200).json({users})
}

export const signup = async(req,res,next)=>{
    const {name,email,password}=req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return console.log(error)
    }
    if(existingUser){
        return res.status(400).json({message:"user already exists"})
    }
    const hashedPassword = bcrypt.hashSync(password)
    const user = new User({
        name,email,password:hashedPassword,blogs:[]
    })
    
    try {
        await user.save()
    } catch (error) {
        return console.log(error)
        
    }
    return res.status(201).json({user})
}

export const login =async(req,res,next)=>{
    const {email,password}=req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return console.log(error)
    }
    if(!existingUser){
        return res.status(404).json({message:"no user exists"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
    if(!isPasswordCorrect){
        return res.status(400).json({msg:'unauthoriz user'})
    }
    return res.status(200).json({msg:"user sign in",user:existingUser})
}
