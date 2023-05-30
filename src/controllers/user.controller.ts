import { Request, Response } from "express";
import { datasource } from "../config/ormconfig";
import { User } from "../entities/user.entity";
import bcrypt from "bcrypt";

const userRepository = datasource.getRepository(User);

export const sign_up = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOne({
      where: { email: req.body.email },
    });
    console.log({ user });
    if (user) {
      return res.status(400).json({
        message: "Email already exist!please login in to use this services",
      });
    }
    const hassedPassword = bcrypt.hashSync(req.body.password, 12);
    console.log({ hassedPassword });
    const register = await userRepository.save({
      userName: req.body.userName,
      email: req.body.email,
      password: hassedPassword,
      phoneNo: req.body.phoneNo,
      role: req.body.role,
    });
    console.log({ register });
    return res
      .status(200)
      .json({ message: "User registered successfully", register });
  } catch (err) {
    return res.status(500).json("Unable to register user");
  }
};
export const login = async(req:Request,res:Response)=>{
  try{
    const {email,password}= req.body;
    const user = await userRepository.findOneBy({email:email});
    if(!user){
      return res.status(401).json({message:'Email address not found'});
    }
   
    const confirm = bcrypt.compareSync(password,user.password)
    if(!confirm){
      return res.status(400).json({message:'Invalid email or password' })
    }
    return res .status(200).json({message:'Logged in successfullly',user})




  }catch(err){
    return res.status(500).json({message:"Couldn't login please try again"})

  }
}

