import jwt from "jsonwebtoken";

const SECRET_KEY = '89743229';

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        const decode = await jwt.verify(token, SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };

        req.email = await decode.email;
        console.log("Emmm", req.email);
        next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;