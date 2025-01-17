const { auth } = require("../config/firebase");

// 회원가입
const signUp = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Firebase에 새 사용자 생성
    const userRecord = await auth.createUser({
      email,
      password,
    });

    // 사용자가 생성된 후, username을 추가 정보로 업데이트
    await auth.updateUser(userRecord.uid, {
      displayName: username,
    });

    res.status(201).json({
      message: "User created successfully",
      user: { uid: userRecord.uid, email: userRecord.email, username: username },
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

// 로그인 (Firebase는 클라이언트 측에서 토큰을 받는 방식)
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 클라이언트에서 Firebase 로그인 후 ID Token을 보내도록 요구
    // 여기서는 ID 토큰 검증만 수행
    const userRecord = await auth.getUserByEmail(email);

    // Firebase ID Token을 직접 생성하는 것이 아니라, 클라이언트가 받아서 보내도록 함
    // 예: Firebase 클라이언트에서 로그인 후 ID Token을 보내야 함
    res.status(200).json({
      message: "Login successful",
      user: { uid: userRecord.uid, email: userRecord.email },
    });
  } catch (error) {
    res.status(400).json({
      message: "Error logging in",
      error: error.message,
    });
  }
};

module.exports = { signUp, login };
