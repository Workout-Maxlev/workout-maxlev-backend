const express = require("express");
const router = express.Router();
const { signUp, login } = require("../controllers/authController");

router.post("/signup", signUp); // POST /auth/signup 경로로 회원가입 처리
router.post("/login", login);
module.exports = router;
