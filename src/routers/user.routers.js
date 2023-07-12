const {Router} = require ("express");
const router = Router();
const userCtrl = require("../controller/user.controller");

router.post("/registro", userCtrl.postRegister);
router.post("/login",userCtrl.postLogin);
router.put("/edit-profile-tatuador", userCtrl.editProfile);
router.get("/descubrir-artista", userCtrl.getTatuadoresExplora)
router.get('/profile-tatuador-propia/:id_user', userCtrl.getUserTatuadorInfo)
router.get('/profile-tatuador-externa/:id_user', userCtrl.getUserTatuadorInfo)
router.get("/explorar", userCtrl.getTatuador);
router.get("/home/:id_user", userCtrl.getArtistaInfo)
router.get('/user/:email', userCtrl.obtenerIdUsuario);


module.exports = router;