import { Request , Response } from 'express';

import bcrypt from 'bcrypt' ;

import jwt from 'jsonwebtoken';

import { User } from '../models/user.model';

const JWT_SECRET=process.env.JWT_SECRET;

if (!JWT_SECRET){

  throw new Error('JWT_SECRET is not defined in environment variables') ;
}

export const register = async (req: Request , res: Response) =>{

  try {

   
    const { name,email,password } = req.body;

    if (!name || !email || !password){

      return res.status(400).json({ message : 'All fields (name , email , password) are required'}) ;
    }

    const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;

    if (!emailRegex.test(email)){

      return res.status(400).json({ message : 'Invalid email format' }) ;
    }

    const strongPasswordRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/ ;

    if (!strongPasswordRegex.test(password)) {

      return res.status(400).json({

        message : 'Password must be at least 8 characters long , include uppercase , lowercase , and a number'
      });
    }

    const existingUser=await User.findOne({email});

    if (existingUser){

      return res.status(400).json({ message: 'Email already registered' });
    }

    const saltRounds=10;

    const passwordHash= await bcrypt.hash(password,saltRounds);

    
    const newUser=await User.create({
      name,
      email,
      passwordHash ,
      role : 'Customer'
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id:newUser._id,
        name:newUser.name,
        email: newUser.email,
        role: newUser.role
      }


    });

  } catch (error) {

    return res.status(500).json({ message:'Server error',error });

  }
};


export const login=async (req: Request , res: Response) => {
  try {
    const { email , password }= req.body ;

    if (!email || !password) {

      return res.status(400).json({ message: 'Email and password are required' });

    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch=await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(


      { userId: user._id , role: user.role },
      JWT_SECRET,
      {expiresIn: '1d'}

    );

    return res.status(200).json({

      message: 'Login successful',
      token,
      user: {
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role

      }



    });
  } catch (error) {

    return res.status(500).json({ message:'Server error',error });
  }

};


export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;

    const user = await User.findById(userId).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });

  } catch (error) {
    return res.status(500).json({ message:'Server error',error }) ;

  }





};