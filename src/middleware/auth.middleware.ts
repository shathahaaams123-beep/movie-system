import { Request , Response , NextFunction } from 'express';



import jwt from 'jsonwebtoken';

const JWT_SECRET=process.env.JWT_SECRET;
if (!JWT_SECRET) {



  throw new Error('JWT_SECRET is not defined in environment variables') ;




}

export const authenticate=(req: Request , res: Response, next: NextFunction) => {
  const authHeader= req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message:'Unauthorized: No token provided'}) ;

  }

  const token = authHeader.split(' ')[1];

  try {

    const decoded=jwt.verify(token,JWT_SECRET);

    (req as any).user = decoded;

    next() ;

  } catch (error) {
    return res.status(401).json({ message:'Unauthorized: Invalid or expired token'}) ;

  }


};

export const authorizeRoles= (...roles: string[]) => {
  return (req:Request , res: Response, next: NextFunction) => {



    const userRole = (req as any).user?.role;

    if (!userRole || !roles.includes(userRole)) {


      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }

    next();

  };



  
};