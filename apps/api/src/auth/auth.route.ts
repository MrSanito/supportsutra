import express from "express";
import { 
  register, 
  login, 
  verifyRegister, 
  verifyLogin, 
  myProfile, 
  refreshToken, 
  logOutUser, 
  refreshCSRF, 
  adminController 
} from "./auth.controller";
import { isAuth, authorizedAdmin } from "../middlewares/auth";
import { verifyCSRFToken } from "../config/csrfMiddleware";

const router = express.Router();

router.post("/register", register);
router.get("/verify/:id", verifyRegister);
router.post("/login", login);
router.post("/verify-login", verifyLogin);

router.get("/me", isAuth, myProfile);
router.post("/refresh", refreshToken);
router.post("/logout", isAuth, verifyCSRFToken, logOutUser);
router.post("/refresh-csrf", isAuth, refreshCSRF);
router.get("/admin", isAuth, authorizedAdmin, adminController);

export default router;
