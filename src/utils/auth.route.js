// password ->  email ->  token (exp 5min) -> verify  ->  newpassword token

import { Router } from "express";
import { signin, signup, forgotEmail, newEmail, socialAuth } from "./auth";

const AuthRouter = Router();

AuthRouter.route("/recovery")
  .post(forgotEmail)
  .put(newEmail);
AuthRouter.route('/signup')
  .post(signup)
AuthRouter.route("/signin")
  .post(signin)
AuthRouter.route("/social")
  .post(socialAuth)


export default AuthRouter