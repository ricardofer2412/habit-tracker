import { Request, Response} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User, {IUser} from '../models/User'

export const register = async ( req: Request, res: Response ) => {
    try {
        const { email, password } = req.body;
        const hashedPassword =  await bcrypt.hash(password, 10);
        const user =  new User({ email, password: hashedPassword})
        await user.save();
        res.status(201).json({message: 'User registerd successfully'})
    }  catch (error) {
        res.status(500).json({ error: "Server error"})
    }
}


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password} = req.body;
        const user = await User.findOne({ email})
        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials"})
        }

        const token = jwt.sign({ id: user._id}, process.env.JWR_SECRET!, {expiresIn: '1h'});
        res.status(500).json({error: 'Server error'})
    }
}