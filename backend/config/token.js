import jwt from "jsonwebtoken"

const generateToken = async (userId) => {
  try {
    const token = jwt.sign(
      { id: userId },          // Payload
      process.env.JWT_SECRET,  // Secret Key
      { expiresIn: "7d" }      // Token Expiry
    );

    return token;
  } catch (error) {
  return res.status(500).json(`gen token error ${error}`)
  }
};

export default generateToken;