import UserModel from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  static userRegistration = async (req, res) => {
    const { name, email, password, password_confirmation, tc } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.send({ static: "failed", message: "Email already exists" });
    } else {
      if (name && email && password && password_confirmation && tc) {
        if (password === password_confirmation) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const doc = new UserModel({
              name: name,
              email: email,
              password: hashPassword,
              tc: tc,
            });
            await doc.save();
          } catch (error) {
            console.log(error);
            res.send({ static: "failed", message: "unable to register" });
          }
        } else {
          res.send({
            static: "failed",
            message: "confirm password does not match",
          });
        }
      } else {
        res.send({ static: "failed", message: "All fields are required" });
      }
    }
  };
}
