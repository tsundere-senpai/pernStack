import {Router,Request,Response} from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import  jwt from "jsonwebtoken";
const router=Router();
const prisma=new PrismaClient();


router.post('/register',async(req:Request,res:Response)=>{
  try {
    const {email,password,name}=req.body;
    if(!email||!password){
      res.status(400).json({error:'Invalid email or password'});
      return;
    }
    const userExist=await prisma.user.findUnique({
      where:{email}
    });
    if(userExist){
      res.status(400).json({error:"user exists"});
      return;
    }
    const hashPass=await bcrypt.hash(password,10);
    const createUser=await prisma.user.create({
      data:{email,name,password:hashPass}
    });
    const returnData={
      name:createUser.name,
      email:createUser.email,
      id:createUser.id
    }
    res.status(201).json({message:'Succesfully created new user',data:returnData});
    return;

  } catch (error) {
    console.error('Internal server error',error);
    res.status(500).json({error:"Server error"});
    return;
  }
});

router.post('/login',async (req:Request,res:Response)=>{
  try {
    const {email,password}=req.body;
    if(!email||!password){
      res.status(400).json({error:'Invalid email or password'});
      return;
    }
    const userData=await prisma.user.findUnique({
      where:{email}
    });
    if(!userData){
      res.status(401).json({error:"Invalid Credentials"});
      return;
    }
    const isPasswordValid=await bcrypt.compare(password,userData.password);

    if(!isPasswordValid){
      res.status(401).json({error:"Invalid Credentials"});
      return;
    }
    const token=jwt.sign(
      {userId:userData.id,email:userData.email},
      process.env.JWT_SECRET!,
      {expiresIn:'5h'}
    );
    res.status(200).json({token});
    return;

  } catch (error) {
    console.error(error);
    res.status(500).json({error:"Internal Server Error"});
  }
});

export default router;
