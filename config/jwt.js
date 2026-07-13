import jwt from "Jsonwebtoken"
import {config} from  "dotenv"

config();

export function genreatetoken(data){
    try{
        let token=jwt.sign(data,process.env.TOKEN_SECRET,{expiresIn:"id"});
        return token;
    }catch(error){
        console.log(error);
    }
}

export function verifyToken(token){
    try{
        let tokenData=jwt.verify(token,process.env.TOKEN_SECRET);
        return tokenData;
    }
    catch(error){
        console.log(error);
        return false;
    }
}