const {Router} = require ("express");
const router = Router();
const userCtrl = require("../controller/user.controller");
const explorarCtrl = require("../controller/explorar.controller")

router.post("/registro", userCtrl.postRegister);
router.post("/login",userCtrl.postLogin);
router.get("/explorar", explorarCtrl.getTatuador);


module.exports = router;