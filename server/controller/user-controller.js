import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Token from '../models/token.js'
import dotenv from 'dotenv';
dotenv.config();
export const signupUser = async (request, response) => {
    try {
        // const salt = await bcrypt.genSalt();
        // const hashedPassword = await bcrypt.hash(request.body.password, salt);
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        const user = { username: request.body.username, name: request.body.name, password: hashedPassword }

        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({ msg: 'Signup successfull' });
    } catch (error) {
        return response.status(500).json({ msg: 'Error while signing up user' });
    }
}
export const loginUser=async(request,response)=>{
    //user is object from the database
   let user= await User.findOne({username: request.body.username})
   if(!user){
    return response.status(400).json({msg:"user does not match"})

   }
   try{
    //compare password from the frontend and the data stored in the database
    let match= await bcrypt.compare(request.body.password,user.password);
    if(match){
        const accessToken= jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:'15m'});
        const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);
       const newToken= new Token({token:refreshToken})
       await newToken.save();
       return response.status(200).json({accessToken: accessToken,refreshToken:refreshToken,name:user.name,username:user.username})



    }
    else{
       return response.status(400).json({msg:'password does not match'});
    }

   }
   catch(error){
     
    return response.status(500).json({msg:'Error while login in the user'})

   }
}   