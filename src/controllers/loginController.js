

const User = require('../models/UserModel');
const { generateToken } = require('../utils/jwt');
const { verifyToken } = require('../utils/jwt');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { messages } = require('../constants/messages');
const { OK, BAD_REQUEST,NOT_FOUND,CONFLICT,UNAUTHORIZED,INTERNAL_SERVER_ERROR } = require('../constants/errorCode');



exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });

      if(!user){
        return res.status(OK).json({ status:NOT_FOUND, message:messages.USER_NOT_FOUND })
      }
    

      if (!user || !(await user.comparePassword(password))) {
        return res.status(OK).json({ status: UNAUTHORIZED, message: messages.INVALID_CREDENTIALS });
      }
      const token = generateToken(user);
      res.status(OK).json({ status: OK, data: user,token: token });
    } catch (error) {
      res.status(OK).json({ status: INTERNAL_SERVER_ERROR, message: messages.INTERNAL_SERVER_ERROR, error });
    }
  };

exports.userSignup = async (req, res) => {

    try{
        var userBody = req.body;
        const existingUser = await User.findOne({ where: { email: userBody.email } });
        if(existingUser){
            return res.status(OK).json({ status:BAD_REQUEST, message:"User already exist" });
        }
        const userId = await User.create(userBody)
        return res.status(OK).json({ status:OK, message:"User signed up" });
    }catch (error){
        console.log(error)
        res.status(OK).json({ status: INTERNAL_SERVER_ERROR, message: messages.INTERNAL_SERVER_ERROR, error });
    }

}