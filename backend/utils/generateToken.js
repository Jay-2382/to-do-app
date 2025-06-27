import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const generateToken = (userId) => {
  console.log("userId:", userId);
  return jwt.sign({ id: userId.toString() }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export default generateToken;
