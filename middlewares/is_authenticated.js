import jwt from "jsonwebtoken";

const SECRET_KEY = '89743229';

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect('/login');
        }
        const decode = await jwt.verify(token, SECRET_KEY);
        if(!decode){
            return res.redirect('/login');
        };

        req.email = await decode.email;
        console.log("Emmm", req.email);
        next();
    } catch (error) {
        console.log(error);
        return res.redirect('/login');
    }
}
export default isAuthenticated;