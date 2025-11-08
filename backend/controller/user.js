
import {usermodel} from '../model/user.js'
import { generateToken } from '../utils/generate_token.js'
import bcrypt from "bcryptjs"

//RESISTER OR SIGNUP PAGE

 export const register = async (req, res) => {
    try {

        const { fullName, email, password } = req.body //destructuring data coming from frontend

        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: 'all fields are required',
                error: true,
                success: false
            })
        }

        const findUser = await usermodel.findOne({ email }) // check if user already exists or not

        if (findUser) {
            return res.status(401).json({
                message: 'user already exists with this email',
                error: true,
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createNewUser = new usermodel({
            email,
            fullName,
            password: hashedPassword
        })

        const newUserData = createNewUser.save()

        return res.status(201).json({
            message: 'user created successfully',
            data: newUserData,
            error: false,
            success: true
        })
    } catch (error) {
        console.log(error);
    }

}

//LOGIN PAGE

export const login = async (req, res) => {
    try {
        const { email, password } = req.body //dstructure

         if (!email || !password) {
            return res.status(400).json({
                message: 'all fields are required',
                error: true,
                success: false
            })
        }
         const findUser = await usermodel.findOne({ email }) // check if user already exists or not
        console.log(findUser);
        
         if(!findUser){
             return res.status(404).json({
                message: 'user does not exists',
                error: true,
                success: false
            })
         }

         const comparePass = await bcrypt.compare(password , findUser.password )

         if(!comparePass){
             return res.status(401).json({
                message: 'wrong password',
                error: true,
                success: false
            })
         }

         const jwtToken=await generateToken(findUser)
        
         return res.status(200)
         .cookie('accessToken' , jwtToken.accessToken , jwtToken.Options )
         .json({
                message: 'Login Successfull',
                error: false,
                success: true
            })


    } catch (error) {
        console.log(error);
    }

}







