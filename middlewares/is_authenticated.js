import jwt from "jsonwebtoken";

const SECRET_KEY = '89743229';

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).render('login', {
                message: "Please log in to access your profile",
                success: false,
            })
        }
        const decode = await jwt.verify(token, SECRET_KEY);
        if(!decode){
            return res.status(401).render('login', {
                message:"Session expired. Please log in again.",
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