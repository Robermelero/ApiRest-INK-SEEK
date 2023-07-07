const {Router} = require ("express");
const router = Router();
const userCtrl = require("../controller/user.controller");

router.post("/registro", userCtrl.postRegister);
router.post("/login",userCtrl.postLogin);
router.get('/profile-tatuador-propia/:id_user', userCtrl.getUserTatuadorInfo)


module.exports = router;