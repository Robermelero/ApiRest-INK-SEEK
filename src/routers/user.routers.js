const {Router} = require ("express");
const router = Router();
const userCtrl = require("../controller/user.controller");

router.post("/registro", userCtrl.postRegister);
router.post("/login",userCtrl.postLogin);


module.exports = router;