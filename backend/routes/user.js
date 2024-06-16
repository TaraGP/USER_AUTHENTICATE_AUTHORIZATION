//backend/routes/user.js
import express from "express";
import verifyToken from "../middlewares/authJWT.js";
import { signup, signin } from '../controllers/auth.controller.js';

  const router = express.Router();
     
router.post("/register", signup);

router.post("/login", signin);

router.get("/hiddencontent", verifyToken, (req, res)=> {
  if (!req.user) {
    res.status(403)
      .send({
        message: "Invalid JWT token"
      });
  }
  else if (req.user.role === "admin") {
    res.status(200)
      .send({
        message: "Congratulations! but there is no hidden content"
      });
  } else {
    res.status(403)
      .send({
        message: "Unauthorised access"
      });
  }
});

export default router;