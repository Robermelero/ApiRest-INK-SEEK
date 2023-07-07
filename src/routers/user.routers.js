const {Router} = require ("express");
const router = Router();
const userCtrl = require("../controller/user.controller");

router.post("/registro", userCtrl.postRegister);
router.post("/login",userCtrl.postLogin);
router.put("/edit-profile-tatuador", userCtrl.editProfile);
router.get("/descubrir-artista", userCtrl.getTatuadoresExplora)


module.exports = router;