const jwt = require("jsonwebtoken");
require("dotenv").config();

// const authenticateToken = (req, res, next) => {
//     try {
//         const token = req.headers['authorization'].split(' ')[1];
//         console.log(token);
//         if (!token) return res.status(401).json({ message: 'Access Denied' });
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     }catch(err){
//         res.status(400).json({ message: 'Invalid Token' });
//     }

// }
const authenticateToken = (req, res, next) => {
  try {
    //jwt token
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access Denied: No or Invalid Token" });
    }
    const token = authHeader.split(" ")[1];
    console.log("Token received:", token);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach decoded payload to the request
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authenticateToken;

/* Multer Middleware

const multer = require('multer')

// multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    }

})

// file type filtering
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        return cb (new Error('only image files are allowed'))
    }
}

const multerConfig = multer({
    storage: storage,
    fileFilter: fileFilter
})

module.exports = multerConfig*/
