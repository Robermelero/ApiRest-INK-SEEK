const {Router} = require ("express");
const router = Router();
const userCtrl = require("../controller/user.controller");
const explorarCtrl = require("../controller/user.controller")

router.post("/registro", userCtrl.postRegister);
router.post("/login",userCtrl.postLogin);
router.get("/descubrir-artista", userCtrl.getTatuadoresExplora)
router.get("/descubrir-artista", explorarCtrl.getTatuador);


module.exports = router;