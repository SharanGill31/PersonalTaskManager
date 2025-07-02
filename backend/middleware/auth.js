import jwt from 'jsonwebtoken';
import userModel from "../model/userModel.js";
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

export default async function authMiddleware(req, res, next) {
    // GRAB THE BEARER TOKEN FROM AUTHORIZATION HEADER
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ success: false, message: "Not authorized, token missing" });
    }
    const token = authHeader.split(' ')[1];

    // verify & attach user object
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await userModel.findById(payload.id).select('-password');

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log("JWT verification failed", error); // Corrected to 'error'
        return res.status(401).json({ success: false, message: "Token invalid or expired" });
    }
}