import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js'; // ✅ Make sure this is the correct path

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const admin = await Admin.findById(decoded.id); // ✅ Load the full admin
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    req.admin = admin; // ✅ Set it for use in controller
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token", error: err.message });
  }
};

export default verifyAdmin;
