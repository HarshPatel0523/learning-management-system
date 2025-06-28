import jwt from "jsonwebtoken";
import AppError from "../utils/error.utils.js";

const isLoggedIn = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return next(new AppError("You are not logged in, Please login to access this resource", 401));
        }

        const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = userDetails;
        next();
    }
    catch (err) {
        return next(new AppError("Invalid token, Please login again", 401));
    }
}

export { isLoggedIn };