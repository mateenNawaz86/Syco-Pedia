import jwt from "jsonwebtoken";

// function for getting token from frontend and verify it
export const verifyToken = async (req, res, next) => {
  try {
    // get token from frontend requested header
    let token = req.header("Authorization");

    // If token doesn't exist
    if (!token) {
      return res.status(403).send("Access denied!");
    }

    //   IF token was exist
    // if (token.startsWith("Bearer ")) {
    //   // token grabe after Bearer keyword
    //   token = token.slice((7, token.length)).trimLeft();
    // }

    // Verify user token with requested token
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;

    // function for continue the process after verification
    next();
  } catch (error) {
    console.log(error);
  }
};
