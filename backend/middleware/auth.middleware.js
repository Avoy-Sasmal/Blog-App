import jwt from "jsonwebtoken";
const JWT_SECRET =
  process.env.JWT_SECRET_KEY || "d10b83579ddd8fed941db4d39b798252";

// export const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({
//       error: "No token, authorization denied",
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;
//     next(); // pass control to the route
//   } catch (err) {
//     return res.status(403).json({
//       error: "Invalid or expired token",
//     });
//   }
// };

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // console.log("AUTH HEADER:", authHeader); // TEMP: uncomment to debug
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
