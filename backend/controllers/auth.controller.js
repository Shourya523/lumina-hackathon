import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/errors.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        console.log(req.body);
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);

    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User Not Found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Invalid Credentials"));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = validUser._doc;
        res.cookie('access_token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000 // 1 hour
        }).status(200).json(rest);

    } catch (error) {
        next(error);
    }
}
export const googleSignIn = async (req, res, next) => {
    const { name, email, photoURL } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET);
            const { password: hashedPassword, ...rest } = user._doc;
            const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
            res.cookie('access_token', token, {
                httpOnly: true,
                expires: expiryDate
            }).status(200).json(rest);
        }
        else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 100000).toString(), email: req.body.email, password: hashedPassword, profilePicture: req.body.photoURL });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: hashedPassword2, ...rest } = newUser._doc;
            const expiryDate = new Date(Date.now() + 60 * 60 * 1000);
            res.cookie('access_token', token, {
                httpOnly: true,
                expires: expiryDate
            }).status(200).json(rest, { message: "User created successfully" });
        }
    } catch (error) {
        next(error);
    }
}
export const signout = (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json({ message: "Signed out successfully" });
    } catch (error) {
        next(error);
    }
}