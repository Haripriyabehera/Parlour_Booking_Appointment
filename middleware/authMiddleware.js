import jwt from 'jsonwebtoken'

const authenticateUser = (req, res, next) => {
    let token = req.header("Authorization");
    // console.log("Authorization Header:", token);

    if(!token) {
        return res.status(401).json({message: "Access denied. No token provided"})
    }

    token = token.split(" ")[1]
    // console.log("Extracted Token:", token)

    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        req.currentUser = { userId: tokenData.userId, role: tokenData.role}
        next()
    }
    catch(error) {
        console.error("JWT Verification Error:", error.message)
        res.status(401).json({message: "Invalid token. "})
    }
}

export default authenticateUser