const userCtrl = require("../controllers/userCtrl");
const auth = require("../middlewares/Auth");
const router = require("express").Router();

router.post("/register", userCtrl.signup);
router.post("/account-verify", userCtrl.accountActivation);
router.post("/login", userCtrl.login);
router.post("/forgot-password", userCtrl.forgotPassword);
router.post("/reset-password", auth, userCtrl.resetPassword);

module.exports = router;
