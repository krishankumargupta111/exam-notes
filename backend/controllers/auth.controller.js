import UserModel from "../models/user.model.js";
import { getToken } from "../utils/token.js";

export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;
    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await UserModel.create({
        name,
        email,
      });
    }
     let token = await getToken(user._id);
  return res.status(200).json({
    token,
    user})
   
  } catch (error) {
    return res.status(500).json({ message: `googleSignup:error ${error}` });
  }
};

export const logOut = async (req, res) => {
  try {
    localStorage.removeItem("token");

    return res.status(200).json({ messsage: "Logout successfully" });
  } catch (error) {
    return res.status(500).json({ message: `logout error ${error}` });
  }
};
