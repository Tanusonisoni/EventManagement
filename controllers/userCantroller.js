import userModel from "../models/user.js";
import { ApiResponse } from "../utils/resPattern.js";
// import {genreateHash,verifyHash} from "../config/brcypt.js";

export async function registerUser(req, res) {
    try {
        const { email, name, password } = req.body;
        // let hash=await genreateHash(password);
        let user = await userModel.create({ email, name, password });
        res.status(201).json
            (new ApiResponse(true, user, "success"));
    }
    catch (error) {
        res.status(500).json
            (new ApiResponse(false, null, error.message || "inertanl server error"));
    }
}

export async function getAllUsers(req,res,next){
    try{
        let page=req.query.page > 0 ? req.query.page:1;
        let limit = req.query.limit<=100? req.query.limit:25;
        let skip=page===1 ? 0 : (page-1)*limit;

        let users=await userModel.find({role:"user"})
            .skip(skip)
            .limit(limit);

        res.status(200).json(new ApiResponse(true,users,"success"))
    }
    catch(error)
    {
        res.status(500).json(new ApiResponse(false,null,error.message || "internal server error"));
    }
}
export async function updateUser(req,res,next){
    try{
        const{name,email,phone,gender,address}=req.body;
        if(!name || !email || !phone || !gender || !address){
            return res.status(400).json(new ApiResponse(false , null ,"all fiels are required !"))
        }
        let userstatus=await userModel.findByIdAndUpdate(req.user._id,(name,email,phone,gender,address),{returnDocument:"after"});
        if(!user) return res.status(404).json(new ApiResponse(false,null,"user not found"))

        res.status(200).json(new ApiResponse(true , null,"Update successfull"))
    }catch(error)
    {
        res.status(500).json(new ApiResponse(false , null,"internal server error"))
    }
}

export async function deleteUser(req,res,next){
    try{
        let user = await userModel.findByIdAndUpdate(req.user._id,{isDeleted:true},{returnDocument:"after"});

        if(!user) return res.status(404).json(new ApiResponse(false,null,"user not found !"));

        res.status(200).json(new ApiResponse(true ,user,"deleted Successfull"));
    }catch(error)
    {
        res.status(500).json(new ApiResponse(false , error.message || "internal server error"));
    }
}

export async function changePassword(req,res,next){
  try
  {
    const{oldPassword,newPassword}=req.body;

    if(!oldPassword || !newPassword){
        return res.status(400).json(new ApiResponse(false,null,"All fields are required!"));

    }
    let user = await userModel.findOne({id:req.user._id,isDeleted:false});
    if(!user){
        return res.status(404).json(new ApiResponse(false,null,"user not found"));
    }
    let match=await verifyHash(oldPassword,user.password);
    if(!match){
        return res.status(401).json(new ApiResponse(false,null,"Incorrect Passowrd"));
    }

   let hash=await generateHash(newPassword);
   let updateUser =await userModel.findByIdAndUpdate(req.user._id,{password:hash},{returnDocument:"after"});
    res.status(200).json(new ApiResponse(true,user,"Password Updated Successfull"));

  }catch(error)
  {
    res.status(500).json(new ApiResponse(false,null,error.message || "Imternal Server error"));
  }

}